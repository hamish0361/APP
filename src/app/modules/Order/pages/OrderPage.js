import DialogNotify from 'app/components/DialogNotify';
import { ROLES } from 'constant/Role';
import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import ErrorPage from '../../Error/ErrorPage';
import AuctionPage from './Auction';
import AuctionDetailPage from './Auction/Detail';
import PaymentPartnerPage from './PaymentPartner';
import PaymentDetailPage from './PaymentPartner/DetailPage';
import PaymentPartnerNewPage from './PaymentPartner/NewPage';
import RetailPage from './Retail';
import RetailDetailPage from './Retail/Detail';
import ShipmentPartnerPage from './ShipmentPartner';
import ShipmentPartnerDetailPage from './ShipmentPartner/DetailPage';
import ShipmentPartnerNewPage from './ShipmentPartner/NewPage';
import WholesalePage from './Wholesale';
import WholesaleDetailPage from './Wholesale/DetailPage';
import WholesaleNewPage from './Wholesale/NewPage';

export default function OrderPage() {
    const match = useRouteMatch();
    const user = useSelector(state => state.auth.user);
    const { role } = user;

    const saleRole = role?.includes(ROLES.SALE);
    const allRole = role?.includes(ROLES.ADMIN) || role?.includes(ROLES.ROOT);

    if (!saleRole && !allRole) return <Redirect to="/dashboard" />;

    return (
        <>
            <DialogNotify />
            <Switch>
                {
                    <Redirect
                        exact={true}
                        from={match.url}
                        to={`${match.url}/don-le`}
                    />
                }
                <Route
                    path={`${match.url}/:id/chi-tiet`}
                    component={WholesaleDetailPage}
                />
                <Route
                    path={`${match.url}/don-si/:id/chi-tiet`}
                    component={WholesaleDetailPage}
                />
                <Route
                    path={`${match.url}/don-si/tao-moi`}
                    component={WholesaleNewPage}
                />
                <Route path={`${match.url}/don-si`} component={WholesalePage} />
                {/* Đơn lẻ */}
                <Route
                    path={`${match.url}/don-le/:id/chi-tiet`}
                    component={RetailDetailPage}
                />
                <Route path={`${match.url}/don-le`} component={RetailPage} />
                {/* Don dau gia */}
                <Route
                    path={`${match.url}/don-dau-gia/:id/chi-tiet`}
                    component={AuctionDetailPage}
                />
                <Route
                    path={`${match.url}/don-dau-gia`}
                    component={AuctionPage}
                />
                {/* Đơn thanh toán hộ */}
                <Route
                    path={`${match.url}/don-thanh-toan-ho/:id/chi-tiet`}
                    component={PaymentDetailPage}
                />
                <Route
                    path={`${match.url}/don-thanh-toan-ho/tao-moi`}
                    component={PaymentPartnerNewPage}
                />
                <Route
                    path={`${match.url}/don-thanh-toan-ho`}
                    component={PaymentPartnerPage}
                />
                {/* Don van chuyen ho */}
                <Route
                    path={`${match.url}/don-van-chuyen-ho/:id/chi-tiet`}
                    component={ShipmentPartnerDetailPage}
                />
                <Route
                    path={`${match.url}/don-van-chuyen-ho/tao-moi`}
                    component={ShipmentPartnerNewPage}
                />
                <Route
                    path={`${match.url}/don-van-chuyen-ho`}
                    component={ShipmentPartnerPage}
                />
                <Route component={ErrorPage} />
            </Switch>
        </>
    );
}
