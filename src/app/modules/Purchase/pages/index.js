import DialogNotify from 'app/components/DialogNotify';
import { ROLES } from 'constant/Role';
import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import ErrorPage from '../../Error/ErrorPage';
import DivisionGoods from './DivisionGoods';
import DivisionGoodsDetailPage from './DivisionGoods/DivisionGoodsDetailPage';
import OrderPurchasePage from './Purchase';
import CreatePurchasePage from './Purchase/Create';
import PurchaseDetailPage from './Purchase/Detail';
import PurchaseItemDetail from './Purchase/PurchaseItemDetail';
import TrackingPage from './Tracking';
import TrackingDetailPage from './Tracking/Detail';

export default function PurchasePage() {
    const match = useRouteMatch();
    const user = useSelector(state => state.auth.user);
    const { role } = user;

    const buyerRole = role?.includes(ROLES.BUYER);
    const allRole = role?.includes(ROLES.ADMIN) || role?.includes(ROLES.ROOT);

    if (!buyerRole && !allRole) return <Redirect to="/dashboard" />;

    return (
        <>
            <DialogNotify
                variant="default"
                size="large"
                position={{ vertical: 'top', horizontal: 'right' }}
            />
            <Switch>
                <Route
                    path={`${match.url}/phan-hang/:id`}
                    component={DivisionGoodsDetailPage}
                />
                <Route
                    path={`${match.url}/phan-hang`}
                    component={DivisionGoods}
                />
                <Route
                    path={`${match.url}/don-mua-hang/:id/chi-tiet/:itemId`}
                    component={PurchaseItemDetail}
                />
                <Route
                    path={`${match.url}/don-mua-hang/:id/chi-tiet`}
                    component={PurchaseDetailPage}
                />
                <Route
                    path={`${match.url}/don-mua-hang/tao-don`}
                    component={CreatePurchasePage}
                />
                <Route
                    path={`${match.url}/don-mua-hang`}
                    component={OrderPurchasePage}
                />
                <Route
                    path={`${match.url}/tracking/:id/chi-tiet`}
                    component={TrackingDetailPage}
                />
                <Route
                    path={`${match.url}/tracking`}
                    component={TrackingPage}
                />
                <Route component={ErrorPage} />
            </Switch>
        </>
    );
}
