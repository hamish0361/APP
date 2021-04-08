import { dialog } from 'app/components/DialogNotify';
import Loading from 'app/components/Loading';
import { fetchUsers } from 'app/modules/AuthService/auth-service-redux/userSlice';
import TopHeader from 'app/modules/Order/components/TopHeader';
import { createOrder } from 'app/modules/Order/order-redux/orderSlice';
import React, { useRef, useState } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect, shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import NewForm from './NewForm';

function ShipmentPartnerNewPage({ intl }) {
    const history = useHistory();
    const dispatch = useDispatch();
    const btnRef = useRef(null);

    const {
        isActionLoadingOrder,
        isLoadingUser,
        isLoadingProduct
    } = useSelector(
        ({ order, auth, product }) => ({
            isActionLoadingOrder: order.list.isActionLoading,
            isLoadingUser: auth.isLoading,
            isLoadingProduct: product.list.loading
        }),
        shallowEqual
    );

    // customer
    const handleSearchCustomer = ({ text, type }) => {
        const params = {
            search: text,
            searchFields: `${type}:like`
        };
        dispatch(fetchUsers(params));
    };

    // submit
    const [isSuccessNew, setSuccessNew] = useState(false);
    const handleSubmitNew = values => {
        const body = {
            shipment_method_id: values.methodId,
            shipment_infor_id: values.shipmentId,
            type: 'shipment',
            note: values.note,
            trackings: JSON.stringify(values.trackings),
            customer_id: values.customer_id
        };

        if (!values.methodId) {
            intl.formatMessage({ id: 'ORDER.CREATE.WHOLESALE.WARNING1' });
        } else if (!values.shipmentId) {
            intl.formatMessage({ id: 'ORDER.CREATE.WHOLESALE.WARNING2' });
        } else {
            dispatch(createOrder(body)).then(res => {
                if (res.type.includes('fulfilled')) {
                    dialog.success(
                        intl.formatMessage({
                            id: 'ORDER.CREATE.SHIPMENT.SUCCESS'
                        })
                    );
                    setSuccessNew(true);
                    history.push(
                        `/ban-hang/don-van-chuyen-ho/${res.payload.id}/chi-tiet`
                    );
                } else {
                    setSuccessNew(false);
                    dialog.error(
                        intl.formatMessage({ id: 'ORDER.CREATE.SHIPMENT.FAIL' })
                    );
                }
            });
        }
    };

    const handleClickNew = () => {
        if (btnRef.current) btnRef.current.handleSubmit();
    };

    const loading = isActionLoadingOrder || isLoadingProduct || isLoadingUser;

    return (
        <>
            {loading && <Loading />}
            <TopHeader
                title={intl.formatMessage({ id: 'ORDER.SHIPMENT.NEW.TITLE' })}
            >
                <button
                    type="button"
                    onClick={() => history.goBack()}
                    className="btn btn-light"
                >
                    <i className="fa fa-arrow-left"></i>
                    <FormattedMessage id="GLOBAL.BUTTON.BACK" />
                </button>
                {`  `}
                <button
                    type="submit"
                    style={{ width: '100px' }}
                    className="btn btn-primary ml-2"
                    onClick={handleClickNew}
                >
                    <FormattedMessage id="GLOBAL.BUTTON.CREATE_ORDER" />
                </button>
            </TopHeader>
            <div className="px-8">
                <NewForm
                    intl={intl}
                    onSearchCustomer={handleSearchCustomer}
                    onSubmit={handleSubmitNew}
                    btnRef={btnRef}
                    onNew={handleSubmitNew}
                    isSuccessNew={isSuccessNew}
                />
            </div>
        </>
    );
}

export default injectIntl(connect(null, null)(ShipmentPartnerNewPage));
