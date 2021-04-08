import CustomTable from './CustomTable';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, useHistory, useRouteMatch } from 'react-router-dom';
import {
    Card,
    CardBody,
    CardHeader,
    CardHeaderToolbar
} from '_metronic/_partials/controls';
import { fetchSupplier } from 'app/modules/Product/product-redux/supplierSlice';
import DialogDeleteSupplier from './DialogDeleteSupplier';
import DialogUpatePriceSupplier from './DialogUpatePriceSupplier';
import DialogDetachSupplier from './DialogDetachSupplier';
import '../index.scss';
import Select from 'react-select';
import { dialog } from 'app/components/DialogNotify';
import { Button } from 'reactstrap';
import './index.scss';

ProductSupplierForm.propTypes = {
    supplierProduct: PropTypes.array,
    idProduct: PropTypes.string
};

function ProductSupplierForm({ supplierProduct = [], intl }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { params } = useRouteMatch();
    const [isShow, setShow] = useState(false);
    const { id } = params;
    const supplier = useSelector(state => state.product.supplier);
    const { supplierList } = supplier;

    const rows = supplierProduct.map(item => {
        return {
            id: (item.id && item.id) || '-',
            name: (item.name && item.name) || '-',
            address: (item.address && item.address) || '-',
            email: (item.email && item.email) || '-',
            link: (item.link && item.link) || '-',
            price: (item.pivot.price && item.pivot.price) || '-',
            note: (item.note && item.note) || '-'
        };
    });

    useEffect(() => {
        dispatch(fetchSupplier());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const supplierSelect = supplierList.map(supplier => ({
        value: supplier?.id,
        label: supplier?.name
    }));

    const handleDeleteRow = idSupplier => {
        history.push(`/product/${id}/detail/supplier/${idSupplier}/delete`);
    };

    const handleUpdatePrice = idSupplier => {
        history.push(`/product/${id}/detail/supplier/${idSupplier}/update`);
    };

    const handleSelectSupplier = value => {
        if (value != null) {
            const idSupplier = value?.value;
            history.push(`/product/${id}/detail/supplier/${idSupplier}/detach`);
        } else {
            dialog.error(
                `${intl.formatMessage({
                    id: 'PRODUCT.SUPPLIER.DIALOG.ERROR'
                })}`
            );
        }
    };
    const columns = [
        { id: 'id', title: 'Mã' },
        {
            id: 'name',
            title: ` ${intl.formatMessage({
                id: 'PRODUCT.DETAIL.SUPPLIER.NAME'
            })}`
        },
        {
            id: 'address',
            title: ` ${intl.formatMessage({
                id: 'PRODUCT.DETAIL.SUPPLIER.ADDRESS'
            })}`
        },
        {
            id: 'email',
            title: ` ${intl.formatMessage({
                id: 'PRODUCT.DETAIL.SUPPLIER.EMAIL'
            })}`
        },
        {
            id: 'link',
            title: ` ${intl.formatMessage({
                id: 'PRODUCT.DETAIL.SUPPLIER.LINK'
            })}`
        },
        {
            id: 'price',
            title: ` ${intl.formatMessage({
                id: 'PRODUCT.DETAIL.SUPPLIER.PRICE'
            })}`
        },
        {
            id: 'note',
            title: ` ${intl.formatMessage({
                id: 'PRODUCT.DETAIL.SUPPLIER.NOTE'
            })}`
        }
    ];

    return (
        <>
            <Route path="/product/:id/detail/supplier/:idSupplier/delete">
                {({ history, match }) => (
                    <DialogDeleteSupplier
                        id={match && match.params.id}
                        idSupplier={match && match.params.idSupplier}
                        show={match != null}
                        onHide={() => history.push(`/product/${id}/detail`)}
                    />
                )}
            </Route>
            <Route path="/product/:id/detail/supplier/:idSupplier/update">
                {({ history, match }) => (
                    <DialogUpatePriceSupplier
                        id={match && match.params.id}
                        idSupplier={match && match.params.idSupplier}
                        show={match != null}
                        onHide={() => history.push(`/product/${id}/detail`)}
                    />
                )}
            </Route>
            <Route path="/product/:id/detail/supplier/:idSupplier/detach">
                {({ history, match }) => (
                    <DialogDetachSupplier
                        id={match && match.params.id}
                        idSupplier={match && match.params.idSupplier}
                        show={match != null}
                        isShow={isShow}
                        onHide={() => history.push(`/product/${id}/detail`)}
                    />
                )}
            </Route>
            <Card>
                <CardHeader
                    title={intl.formatMessage({
                        id: 'PRODUCT.DETAIL.SUPPLIER.TITLE'
                    })}
                >
                    <CardHeaderToolbar>
                        {isShow && (
                            <Select
                                className="supplier-search"
                                defaultValue={''}
                                options={isShow ? supplierSelect : []}
                                onChange={handleSelectSupplier}
                                placeholder={intl.formatMessage({
                                    id: 'GLOBAL.PLACEHOLER.SELECT'
                                })}
                            />
                        )}
                        <Button
                            className="ml-2"
                            color="secondary"
                            onClick={() => {
                                setShow(!isShow);
                            }}
                        >
                            <i
                                className={
                                    isShow
                                        ? 'flaticon-cancel'
                                        : 'flaticon-search'
                                }
                            />
                        </Button>
                    </CardHeaderToolbar>
                </CardHeader>
                <CardBody>
                    <CustomTable
                        columns={columns}
                        rows={rows}
                        onDelete={handleDeleteRow}
                        onViewEdit={handleUpdatePrice}
                        page={params.page}
                        intl={intl}
                    />
                </CardBody>
            </Card>
        </>
    );
}

export default ProductSupplierForm;
