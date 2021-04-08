import React, { useCallback } from 'react';

import { toAbsoluteUrl } from '_metronic/_helpers';
import _ from 'lodash';
import clsx from 'clsx';
import useTrans from 'helper/useTrans';
import { useFormikContext } from 'formik';

import SVG from 'react-inlinesvg';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';
import { Pagination } from '@material-ui/lab';
import Loading from 'app/components/Loading';

import './ListBox.scss';
import EmptyData from 'app/components/EmptyData';

const ListBox = ({ boxes = [], pagination, onChangePage, loading }) => {

    const { values, setFieldValue } = useFormikContext();
    const [trans] = useTrans();

    const handlePageChange = (e, page) => {
        onChangePage && onChangePage(page);
    }

    const boxIdxInListChecked = useCallback((v) => {
        return _.findIndex(values.boxes, ({ id }) => id == v.id); // eslint-disable-line
    }, [values.boxes]); // eslint-disable-line

    const handleToggle = (value) => () => {
        const currentIndex = boxIdxInListChecked(value);
        const newChecked = [...values.boxes];

        if (currentIndex === -1) {
            newChecked.push({ ...value, quantity: value?.quantity_available_in_goods_delivery || 1 });
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setFieldValue("boxes", newChecked);
    };

    const handleQuantityChange = (e) => {
        const boxIdx = boxIdxInListChecked({ id: e.target.name });

        let newChecked = [...values.boxes];
        newChecked[boxIdx] = { ...newChecked[boxIdx], quantity: e.target.value };

        setFieldValue("boxes", newChecked);
    };

    if(!boxes.length) return <EmptyData />;

    return (
        <div className="list-box-for-form-add-goods-delivery-boxes">
            <div className="position-relative boxes-list">
                {loading && <Loading local />}
                <List className="row list-items">
                    {boxes.map((item) => {
                        const labelId = `checkbox-list-label-${item.id}`;

                        if(!item?.quantity_available_in_goods_delivery) return <React.Fragment key={item.id}></React.Fragment>;

                        return (
                            <div className="col-lg-6 col-sm-12" key={item.id}>
                                <ListItem role={undefined} dense button onClick={handleToggle(item)}>
                                    <ListItemIcon>
                                        <Checkbox
                                            edge="start"
                                            checked={boxIdxInListChecked(item) !== -1}
                                            tabIndex={-1}
                                            disableRipple
                                            inputProps={{ 'aria-labelledby': labelId }}
                                        />
                                    </ListItemIcon>
                                    <div className="item-box">
                                        <SVG
                                            src={toAbsoluteUrl(
                                                '/media/svg/icons/Shopping/Box4.svg'
                                            )}
                                        ></SVG> <span className="item-box-id">{item?.owning_box?.box_id}</span>
                                    </div>
                                </ListItem>
                                <div className={clsx("item-quantity", boxIdxInListChecked(item) !== -1 ? '' : 'd-none')}>
                                    {trans("common.quantity")}: <input name={item.id} className="ml-3 form-control" defaultValue={item?.quantity_available_in_goods_delivery || 1} min={1} type="number" max={item?.quantity_available_in_goods_delivery} onChange={handleQuantityChange} />
                                </div>
                            </div>
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

};

export default ListBox;