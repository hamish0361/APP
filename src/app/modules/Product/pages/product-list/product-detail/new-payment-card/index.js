import { dialog } from 'app/components/DialogNotify';
import Loading from 'app/components/Loading';
import TopHeader from 'app/modules/Order/components/TopHeader';
import { createOrder } from 'app/modules/Order/order-redux/orderSlice';
import { fetchProduct } from 'app/modules/Product/product-redux/productSlice';
import { fetchSupplier } from 'app/modules/Product/product-redux/supplierSlice';
import { fetchTax } from 'app/modules/Product/product-redux/taxSlice';
import { fetchShipmentMethods } from 'app/modules/Warehouse/warehouse-redux/shipmentMethodSlice';
import { fecthProductId } from 'app/modules/Product/product-redux/productSlice';
import React, { useEffect, useRef } from 'react';
import { Button } from 'react-bootstrap';
import { connect, shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import NewForm from './NewForm';
import { fetchUsers } from 'app/modules/AuthService/auth-service-redux/userSlice';
import { FormattedMessage, injectIntl } from 'react-intl';

function PaymentPartnerNewPage({
    match: {
        params: { id }
    },
    intl
}) {
    const history = useHistory();
    const dispatch = useDispatch();
    const btnRef = useRef(null);

    const bodyFetchById = {
        id: id,
        params: {
            with: 'origin;suppliers;unit;tax;package'
        }
    };
    const products = useSelector(state => state.product.list);
    const { productDetail } = products;

    useEffect(() => {
        dispatch(fecthProductId(bodyFetchById));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const { isActionLoadingOrder } = useSelector(
        ({ order }) => ({ isActionLoadingOrder: order.list.isActionLoading }),
        shallowEqual
    );

    const { isLoadingProduct } = useSelector(
        ({ product }) => ({
            isLoadingProduct: product.list.loading
        }),
        shallowEqual
    );

    const { isLoadingUser } = useSelector(
        ({ auth }) => ({
            isLoadingUser: auth.isLoading
        }),
        shallowEqual
    );

    const { isLoadingShipment } = useSelector(
        ({ order }) => ({
            isLoadingShipment: order.shipmentInfo.isLoading
        }),
        shallowEqual
    );

    const { isLoadingSupplier } = useSelector(
        ({ product }) => ({
            isLoadingSupplier: product.supplier.loading
        }),
        shallowEqual
    );

    useEffect(() => {
        dispatch(fetchShipmentMethods());
        dispatch(fetchTax());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // product
    const handleSearchProduct = ({ value, type }) => {
        const params = {
            search: value,
            searchFields: `${type}:like`
        };
        dispatch(fetchProduct(params));
    };

    // customer
    const handleSearchCustomer = ({ value, type }) => {
        const params = {
            search: value,
            searchFields: `${type}:like`
        };
        dispatch(fetchUsers(params));
    };

    // supplier
    const handleSearchSupplier = value => {
        const params = {
            search: value
        };
        dispatch(fetchSupplier(params));
    };

    // submit
    const handleSubmitNew = values => {
        const item = {
            product_id: values.productId,
            price: values.price,
            quantity: values.quantity,
            link: '',
            supplier_id: values.supplierId,
            box: values.box,
            tax: values.tax,
            note: values.noteProduct
        };

        const body = {
            shipment_method_id: values.shipmentMethodId,
            shipment_infor_id: values.shipmentInfoId,
            type: 'payment',
            note: values.noteOrder,
            item: JSON.stringify(item)
        };
        if (!values.shipmentMethodId) {
            dialog.warning(
                intl.formatMessage({ id: 'ORDER.CREATE.WHOLESALE.WARNING1' })
            );
        } else if (!values.shipmentInfoId) {
            dialog.warning(
                intl.formatMessage({ id: 'ORDER.CREATE.WHOLESALE.WARNING2' })
            );
        } else if (!values.supplierId) {
            dialog.warning(
                intl.formatMessage({ id: 'ORDER.CREATE.WHOLESALE.WARNING4' })
            );
        } else if (values.price <= 0) {
            dialog.warning(
                intl.formatMessage({ id: 'ORDER.CREATE.WHOLESALE.WARNING3' })
            );
        } else {
            dispatch(createOrder(body)).then(res => {
                if (res.type.includes('fulfilled')) {
                    history.push(
                        `/product/don-thanh-toan-ho/${res.payload.id}/chi-tiet`
                    );
                    dialog.success(
                        intl.formatMessage({
                            id: 'ORDER.CREATE.PAYMENT.SUCCESS'
                        })
                    );
                } else {
                    dialog.error(
                        intl.formatMessage({ id: 'ORDER.CREATE.PAYMENT.FAIL' })
                    );
                }
            });
        }
    };

    const handleClickNew = () => {
        if (btnRef.current) btnRef.current.handleSubmit();
    };

    const loading =
        isActionLoadingOrder ||
        isLoadingProduct ||
        isLoadingUser ||
        isLoadingShipment ||
        isLoadingSupplier;

    return (
        <>
            {loading && <Loading />}
            <TopHeader
                title={intl.formatMessage({ id: 'ORDER.PAYMENT.NEW.TITLE' })}
            >
                <Button
                    type="button"
                    onClick={() => history.push(`/product/${id}/detail`)}
                    className="btn btn-light"
                >
                    <i className="fa fa-arrow-left"></i>
                    <FormattedMessage id="GLOBAL.BUTTON.BACK" />
                </Button>
                {`  `}
                <Button
                    style={{ width: '100px' }}
                    type="submit"
                    className="btn btn-primary ml-2"
                    onClick={handleClickNew}
                >
                    <FormattedMessage id="GLOBAL.BUTTON.CREATE_ORDER" />
                </Button>
            </TopHeader>
            <div className="px-8 pb-8">
                <NewForm
                    productDetail={productDetail}
                    onSearchProduct={handleSearchProduct}
                    onSearchCustomer={handleSearchCustomer}
                    onSubmitNew={handleSubmitNew}
                    btnRef={btnRef}
                    onSearchSupplier={handleSearchSupplier}
                />
            </div>
        </>
    );
}

export default injectIntl(connect(null, null)(PaymentPartnerNewPage));
