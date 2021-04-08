import React, { Suspense, lazy, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect, Switch, Route } from 'react-router-dom';
import { Layout, LayoutSplashScreen } from '../_metronic/layout';
import PrinterModal from './components/PrinterModal';
import AccountingPage from './modules/Accounting/pages';
import { fetchPermissions } from './modules/AuthService/auth-service-redux/permissionSlice';
import ErrorPage from './modules/Error/ErrorPage';

const DashboardPage = lazy(() => import('./modules/Dashboard/pages'));

const OrderPage = lazy(() => import('./modules/Order/pages/OrderPage'));

const PurchasePage = lazy(() => import('./modules/Purchase/pages'));

const ProductPage = lazy(() => import('./modules/Product/pages/ProductPage'));

const WarehousePage = lazy(() =>
    import('./modules/Warehouse/pages/WarehousePage')
);

const AuthServicePage = lazy(() =>
    import('./modules/AuthService/page/AuthServicePage')
);

export default function BasePage() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPermissions());
    }, []); // eslint-disable-line

    return (
        <Layout>
            <Suspense fallback={<LayoutSplashScreen />}>
                <PrinterModal />
                <Switch>
                    <Redirect exact from="/" to="/dashboard" />
                    <Route path="/dashboard" component={DashboardPage} />
                    <Route path="/ban-hang" component={OrderPage} />
                    <Route path="/mua-hang" component={PurchasePage} />
                    <Route path="/ke-toan" component={AccountingPage} />
                    <Route path="/warehouse" component={WarehousePage} />
                    <Route path="/product" component={ProductPage} />
                    <Route path="/auth-service" component={AuthServicePage} />
                    <Route component={ErrorPage} />
                </Switch>
            </Suspense>
        </Layout>
    );
}
