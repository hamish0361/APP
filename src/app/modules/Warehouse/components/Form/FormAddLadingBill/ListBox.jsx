import React, { useCallback, useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import _ from 'lodash';
import { fetchBoxOwners } from 'app/modules/Warehouse/warehouse-redux/boxOwnerSlice';
import { fetchOrder } from 'app/modules/Order/order-redux/orderSlice';
import useTrans from 'helper/useTrans';

import List from '@material-ui/core/List';
import { Pagination } from '@material-ui/lab';
import Select from 'react-select';
import { useFormikContext } from 'formik';
import Loading from 'app/components/Loading';
import BoxItem from './BoxItem';

import './ListBox.scss';

const ListBox = ({ boxes = [], onChange, pagination, onChangePage, loading, customer_id }) => {

    const { values } = useFormikContext();
    const orderList = useSelector(state => state.order.list.orderList)
    const isLoading = useSelector(state => state.order.list.isLoading)
    const [checked, setChecked] = useState([]);
    const [orderSelected, setOrderSelected] = useState('');
    const dispatch = useDispatch();
    const [trans] = useTrans();

    // Clear giá trị của cái select order khi close form
    useEffect(() => {
        return () => {
            setOrderSelected('');
        }
    }, []);

    // Call api lấy danh sách order khi customer_id thay đổi
    // Nếu lấy được giá trị thì dùng luôn giá trị đầu tiên làm value
    useEffect(() => {
        if (!customer_id) return;
        searchOrder({ search: `customer_id:${customer_id}` });
        setOrderSelected('user');

    }, [customer_id]); // eslint-disable-line

    const searchOrder = useCallback((params) => {
        dispatch(fetchOrder({ orderBy: 'created_at', sortedBy: 'desc', ...params }));
    }, [dispatch]);

    // Khi orderSelected thay đổi thì lấy danh sách box
    useEffect(() => {

        const defaultParams = {
            searchJoin: 'and',
            page: pagination.page,
            with: 'box.sfa'
        };

        if (orderSelected && orderSelected === 'user') {
            dispatch(fetchBoxOwners({
                search: `objectable_id:${customer_id};objectable_type:user`,
                ...defaultParams
            }))
        } else if (orderSelected && orderSelected !== 'user') {
            dispatch(fetchBoxOwners({
                search: `objectable_id:${orderSelected};objectable_type:order`,
                ...defaultParams
            }))
        }
    }, [orderSelected, pagination.page, customer_id]); // eslint-disable-line

    useEffect(() => {
        onChange && onChange(checked);
    }, [checked]); // eslint-disable-line

    const personalOption = { value: 'user', label: trans("warehouse.sku.of_customer") };

    const makeOption = (i) => ({
        value: i.id,
        label: trans("warehouse.order.option_title", { id: i.id, type_name: i.type.name, status_name: i.status.name })
    })

    const handleToggle = (value) => () => {
        const currentIndex = boxIdxInListChecked(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push({ ...value, quantity: value?.quantity || 1 });
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const boxIdxInListChecked = useCallback((v) => {
        return _.findIndex(checked, ({ id }) => id == v.id); // eslint-disable-line
    }, [checked]); // eslint-disable-line

    const handlePageChange = (e, page) => {
        onChangePage && onChangePage(page);
    }

    const handleSelectOrder = (option) => {
        setOrderSelected(option.value);
    }

    const getOptions = useMemo(() => {
        const orderOptions = orderList.map(order => makeOption(order));

        return [personalOption, ...orderOptions];
    }, [orderList]); // eslint-disable-line

    const getValue = useMemo(() => {
        if (!orderSelected) return '';

        if (orderSelected === 'user') return personalOption;

        let matchedOrder = _.find(orderList, ['id', orderSelected]);

        if (!matchedOrder) return '';

        return makeOption(matchedOrder);
    }, [orderSelected, orderList]); // eslint-disable-line

    const handleQuantityChange = (e) => {
        const boxIdx = boxIdxInListChecked({ id: e.target.name });

        let newChecked = [...checked];
        newChecked[boxIdx] = { ...newChecked[boxIdx], avalableQuantity: e.target.value };

        setChecked(newChecked);
    };

    const ladingBillBox = useMemo(() => {
        if (!boxes?.length) return [];

        return boxes.map((box) => {
            return {
                ...box,
                avalableQuantity: box.quantity - Number(box.quantity_in_lading_bills)
            }
        }).filter(box => box.avalableQuantity > 0);
    }, [boxes]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleSearch = useCallback(_.debounce(value => {
        if (value)
            searchOrder({
                search: `customer_id:${customer_id};id:${value}`,
                searchFields: `id:like;customer_id:like`,
                searchJoin: 'and'
            });
    }, 700), [customer_id]);

    return (
        <div className="list-box-for-form w-100">
            <div className="custom-header">
                <div className="title">
                    {trans("warehouse.sku.of_customer")}
                </div>
                <div className="toolbar">
                    <Select
                        isDisabled={!values.customer_id}
                        isLoading={isLoading}
                        placeholder={trans("warehouse.order.select_title")}
                        options={getOptions}
                        onChange={
                            handleSelectOrder
                        }
                        onInputChange={
                            handleSearch
                        }
                        value={getValue}
                    />
                </div>
            </div>
            <div className="position-relative">
                {orderSelected && loading && <Loading local />}
                <List className="row list-items">
                    {ladingBillBox.map((item) => {
                        const labelId = `checkbox-list-label-${item.id}`;

                        return (
                            <BoxItem
                                labelId={labelId}
                                item={item}
                                handleToggle={handleToggle}
                                boxIdxInListChecked={boxIdxInListChecked}
                                handleQuantityChange={handleQuantityChange}
                            />
                        );
                    })}
                </List>
            </div>

            {pagination && (
                <Pagination
                    className="mt-3"
                    count={pagination.lastPage}
                    page={pagination.page}
                    shape="rounded"
                    onChange={handlePageChange}
                />
            )}
        </div>
    );
};

ListBox.propTypes = {
    boxes: PropTypes.array,
    onChange: PropTypes.func,
    pagination: PropTypes.any,
    onChangePage: PropTypes.func,
    loading: PropTypes.bool,
    customer_id: PropTypes.any
};

export default ListBox;