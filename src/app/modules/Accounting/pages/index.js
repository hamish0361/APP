import DialogNotify from 'app/components/DialogNotify';
import ErrorPage from 'app/modules/Error/ErrorPage';
import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import CustomerPage from './Customer';
import CustomerDetailPage from './Customer/Detail';
import OrderPage from './Order';
import PurchasePage from './Purchase';
import CardPage from './Card';
import CardDetailPage from './Card/Detail';
import { useSelector } from 'react-redux';
import { ROLES } from 'constant/Role';

function AccountingPage() {
    const match = useRouteMatch();
    const user = useSelector(state => state.auth.user);
    const { role } = user;

    const accountingRole = role?.includes(ROLES.ACCOUNTANT);
    const allRole = role?.includes(ROLES.ADMIN) || role?.includes(ROLES.ROOT);

    const checkRedirect = accountingRole || allRole;

    if (!checkRedirect) return <Redirect to="/dashboard" />;

    return (
        <>
            <DialogNotify />
            <Switch>
                <Route
                    path={`${match.url}/kt-ban-hang`}
                    component={OrderPage}
                />
                <Route
                    path={`${match.url}/kt-mua-hang`}
                    component={PurchasePage}
                />
                {/* begin kho */}
                <Route
                    path={`${match.url}/the/:id/chi-tiet`}
                    component={CardDetailPage}
                />
                <Route path={`${match.url}/the`} component={CardPage} />
                {/* end kho */}
                {/* begin customer */}
                <Route
                    path={`${match.url}/khach-hang/:id/chi-tiet`}
                    component={CustomerDetailPage}
                />
                <Route
                    path={`${match.url}/khach-hang`}
                    component={CustomerPage}
                />
                {/* end customer */}
                <Route component={ErrorPage} />
            </Switch>
        </>
    );
}

export default AccountingPage;
