import { dialog } from 'app/components/DialogNotify';
import Loading from 'app/components/Loading';
import { fetchUsers } from 'app/modules/AuthService/auth-service-redux/userSlice';
import TopHeader from 'app/modules/Order/components/TopHeader';
import { createOrder } from 'app/modules/Order/order-redux/orderSlice';
import { fetchProduct } from 'app/modules/Product/product-redux/productSlice';
import React, { useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect, shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import NewForm from './NewForm';

function WholesaleNewPage({ intl }) {
    const history = useHistory();
    const dispatch = useDispatch();
    const btnRef = useRef(null);

    const {
        isActionLoadingOrder,
        isLoadingProduct,
        isLoadingUser,
        isLoadingShipment
    } = useSelector(
        ({ order, product, auth }) => ({
            isActionLoadingOrder: order.list.isActionLoading,
            isLoadingProduct: product.list.loading,
            isLoadingUser: auth.isLoading,
            isLoadingShipment: order.shipmentInfo.isLoading
        }),
        shallowEqual
    );

    const [disabled, setDisabled] = useState(true);

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

    // submit
    const [isSuccessNew, setSuccessNew] = useState(false);
    const handleSubmitNew = values => {
        const item = {
            product_id: values.productId,
            price: values.price,
            quantity: values.quantity,
            link: '',
            tax_percent: values.tax,
            note: values.noteProduct,
            is_box: values.box
        };

        const body = {
            shipment_method_id: values.shipmentMethodId,
            shipment_infor_id: values.shipmentInfoId,
            customer_id: values.customer_id,
            type: 'wholesale',
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
        } else if (values.price <= 0) {
            dialog.warning(
                intl.formatMessage({ id: 'ORDER.CREATE.WHOLESALE.WARNING3' })
            );
        } else {
            dispatch(createOrder(body)).then(res => {
                if (res.type.includes('fulfilled')) {
                    dialog.success(
                        intl.formatMessage({
                            id: 'ORDER.CREATE.WHOLESALE.SUCCESS'
                        })
                    );
                    setSuccessNew(true);
                    history.push(`/ban-hang/don-si/${res.payload.id}/chi-tiet`);
                } else {
                    setSuccessNew(false);
                    dialog.error(
                        intl.formatMessage({
                            id: 'ORDER.CREATE.WHOLESALE.FAIL'
                        })
                    );
                }
            });
        }
    };

    const loading =
        isActionLoadingOrder ||
        isLoadingProduct ||
        isLoadingUser ||
        isLoadingShipment;

    return (
        <>
            {loading && <Loading />}
            <TopHeader
                title={intl.formatMessage({ id: 'ORDER.WHOLESALE.NEW.TITLE' })}
            >
                <Button
                    type="button"
                    onClick={() => history.goBack()}
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
                    onClick={() => {
                        if (btnRef.current) btnRef.current.handleSubmit();
                    }}
                    disabled={disabled}
                >
                    <FormattedMessage id="GLOBAL.BUTTON.CREATE_ORDER" />
                </Button>
            </TopHeader>
            <div className="px-8 pb-8">
                <NewForm
                    intl={intl}
                    onSearchProduct={handleSearchProduct}
                    onSearchCustomer={handleSearchCustomer}
                    onSubmitNew={handleSubmitNew}
                    btnRef={btnRef}
                    onSelectProduct={() => setDisabled(false)}
                    isSuccessNew={isSuccessNew}
                />
            </div>
        </>
    );
}

export default injectIntl(connect(null, null)(WholesaleNewPage));
