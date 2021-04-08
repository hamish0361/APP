import DialogNotify, { dialog } from 'app/components/DialogNotify';
import Loading from 'app/components/Loading';
import TopHeader from 'app/components/TopHeader';
import { fetchTransactions } from 'app/modules/Accounting/redux/transactionSlice';
import { fetchLogs } from 'app/modules/Notification/redux/logSlice';
import {
    fetchOrder,
    resetOrder
} from 'app/modules/Order/order-redux/orderSlice';
import {
    fetchPurchase,
    resetPurchase
} from 'app/modules/Purchase/redux/purchaseSlice';
import { fetchTracking } from 'app/modules/Purchase/redux/trackingSlice';
import 'assets/css/dashboard.scss';
import React from 'react';
import { injectIntl } from 'react-intl';
import { connect, shallowEqual, useDispatch, useSelector } from 'react-redux';
import InfoCard from '../components/InfoCard';
import LogCard from '../components/LogCard';
import OrderCard from '../components/OrderCard';
import PurchaseCard from '../components/PurchaseCard';
import TrackingCard from '../components/TrackingCard';
import TransactionCard from '../components/TransactionCard';

function DashboardPage({ intl }) {
    const dispatch = useDispatch();

    // store
    const {
        user,
        transactions,
        orders,
        purchases,
        logs,
        trackings,
        isLoadingTransaction,
        isLoadingOrders,
        isLoadingPurchases,
        isLoadingLogs,
        isLoadingTrackings
    } = useSelector(
        ({ auth, accounting, order, purchase, notification }) => ({
            user: auth.user,
            transactions: accounting.transaction.list,
            isLoadingTransaction: accounting.transaction.isLoading,
            orders: order.list.orderList,
            isLoadingOrders: order.list.isLoading,
            purchases: purchase.list.purchaseList,
            isLoadingPurchases: purchase.list.isLoading,
            logs: notification.log.list,
            isLoadingLogs: notification.log.isLoading,
            trackings: purchase.tracking.trackingList,
            isLoadingTrackings: purchase.tracking.isLoading
        }),
        shallowEqual
    );

    const paramsTransaction = {
        orderBy: 'created_at',
        sortedBy: 'desc'
    };

    const paramsOrder = {
        orderBy: 'created_at',
        sortedBy: 'desc'
    };

    const paramsPurchase = {
        // search: `buyer_id:${user.id}`,
        appends: 'supplier',
        with: 'items',
        orderBy: 'created_at',
        sortedBy: 'desc'
    };

    const paramsLog = {
        orderBy: 'created_at',
        sortedBy: 'desc'
    };

    const paramsTracking = {
        // orderBy: 'expected_delivery',
        // sortedBy: 'desc'
    };

    React.useEffect(() => {
        dispatch(resetPurchase());
        dispatch(resetOrder());
        dispatch(fetchTransactions(paramsTransaction));
        dispatch(fetchOrder(paramsOrder));
        dispatch(fetchPurchase(paramsPurchase));
        dispatch(fetchLogs(paramsLog));
        dispatch(fetchTracking(paramsTracking));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // check env development
    React.useEffect(() => {
        if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
            dialog.warning(
                intl.formatMessage({ id: 'GLOBAL.CHECK.ENV.DEVELOPMENT' })
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const loading =
        isLoadingTransaction ||
        isLoadingOrders ||
        isLoadingPurchases ||
        isLoadingLogs ||
        isLoadingTrackings;

    return (
        <>
            <DialogNotify />
            {loading && <Loading />}
            <TopHeader title={intl.formatMessage({ id: 'DASHBOARD.TITLE' })} />
            <div className="px-8 pb-8">
                {/* begin row */}
                <div className="row mb-8">
                    <div className="col-3">
                        <InfoCard user={user} />
                    </div>
                    <div className="col-9">
                        <TransactionCard
                            transactions={transactions}
                            intl={intl}
                        />
                    </div>
                </div>
                {/* end row */}
                {/* begin row */}
                <div className="row">
                    <div className="col-3">
                        <TrackingCard trackings={trackings} intl={intl} />
                    </div>
                    <div className="col-9">
                        <OrderCard orders={orders} intl={intl} />
                    </div>
                </div>
                {/* end row */}
                {/* begin row */}
                <div className="row mt-8">
                    <div className="col-3">
                        <LogCard logs={logs} intl={intl} />
                    </div>
                    <div className="col-9">
                        <PurchaseCard purchases={purchases} intl={intl} />
                    </div>
                </div>
                {/* end row */}
            </div>
        </>
    );
}

export default injectIntl(connect(null, null)(DashboardPage));
