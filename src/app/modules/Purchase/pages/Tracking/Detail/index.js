import { dialog } from 'app/components/DialogNotify';
import Loading from 'app/components/Loading';
import TopHeader from 'app/modules/Order/components/TopHeader';
import {
    fetchTrackingById,
    updateTracking
} from 'app/modules/Purchase/redux/trackingSlice';
import React, { useEffect } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect, useDispatch, useSelector } from 'react-redux';
import InfoCard from './InfoCard';
import PurchaseItemCard from './PurchaseItemCard';
import OrderCard from './OrderCard';
import 'assets/css/order.scss';

function TrackingDetailPage({
    history,
    intl,
    match: {
        params: { id }
    }
}) {
    const dispatch = useDispatch();
    const tracking = useSelector(state => state.purchase.tracking);

    const { trackingDetail, isActionLoading, isLoading } = tracking;

    const bodyFetchById = {
        id: id,
        params: {
            with: 'orders;purchaseItems'
        }
    };

    useEffect(() => {
        dispatch(fetchTrackingById(bodyFetchById));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleUpdateTracking = ({ code, checked }) => {
        const body = {
            id: id,
            params: {
                checked,
                code
            }
        };
        if (!code) {
            dialog.warning('Vui lòng nhập mã tracking');
        } else {
            dispatch(updateTracking(body)).then(res => {
                if (res.type.includes('fulfilled')) {
                    dialog.success(
                        intl.formatMessage({ id: 'TRACKING.UPDATE.SUCCESS' })
                    );
                } else {
                    dialog.error(
                        intl.formatMessage({ id: 'TRACKING.UPDATE.FAIL' })
                    );
                }
            });
        }
    };

    return (
        <>
            {(isLoading || isActionLoading) && <Loading />}
            <TopHeader
                title={intl.formatMessage({ id: 'TRACKING.DETAIL.TITLE' })}
            >
                <button
                    type="button"
                    onClick={() => {
                        history.push('/mua-hang/tracking');
                    }}
                    className="btn btn-light"
                >
                    <i className="fa fa-arrow-left"></i>
                    <FormattedMessage id="GLOBAL.BUTTON.BACK" />
                </button>
            </TopHeader>
            <div className="px-8 pb-8">
                <InfoCard
                    intl={intl}
                    tracking={trackingDetail || {}}
                    onUpdate={handleUpdateTracking}
                />
                <OrderCard intl={intl} orders={trackingDetail?.orders || []} />
                <PurchaseItemCard
                    items={trackingDetail?.purchase_items}
                    intl={intl}
                />
            </div>
        </>
    );
}

export default injectIntl(connect(null, null)(TrackingDetailPage));
