import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import ErrorPage from '../../Error/ErrorPage';
import ProductDetailPage from './product-list/product-detail/ProductDetailPage';
import ProductListPage from './product-list/ProductListPage';
import ProductSupplierDetailPage from './product-supplier/product-supplier-detail/ProductSupplierDetailPage';
import ProductSupplierPage from './product-supplier/ProductSupplierPage';
import ProductTaxDetailPage from './product-tax/product-tax-detail/ProductTaxDetailPage';
import ProductTaxPage from './product-tax/ProductTaxPage';
import ProductUnitDetailPage from './product-unit/product-unit-detail/ProductUnitDetailPage';
import ProductUnitPage from './product-unit/ProductUnitPage';
import DialogNotify from 'app/components/DialogNotify';
import WholesaleNewPage from './product-list/product-detail/new-wholesale-card';
import PaymentPartnerNewPage from './product-list/product-detail/new-payment-card';
import ProductOriginDetailPage from './product-origin/product-origin-detail/ProductOriginDetailPage';
import ProductOriginPage from './product-origin';
import DialogNewProduct from './product-list/DialogNewProduct';
import WholesaleDetailPage from 'app/modules/Order/pages/Wholesale/DetailPage';
import PaymentDetailPage from 'app/modules/Order/pages/PaymentPartner/DetailPage';
import { useSelector } from 'react-redux';
import { ROLES } from 'constant/Role';

export default function ProductPage() {
    const match = useRouteMatch();
    const user = useSelector(state => state.auth.user);
    const { role } = user;

    const buyerRole = role?.includes(ROLES.BUYER);
    const allRole = role?.includes(ROLES.ADMIN) || role?.includes(ROLES.ROOT);

    const checkRedirect = buyerRole || allRole;

    if (!checkRedirect) return <Redirect to="/dashboard" />;

    return (
        <>
            <DialogNotify />
            <Switch>
                {<Redirect exact={true} from="/product" to="/product/list" />}

                <Route
                    path={`${match.url}/tao-moi-san-pham`}
                    component={DialogNewProduct}
                />
                <Route
                    path={`${match.url}/:id/detail`}
                    component={ProductDetailPage}
                />
                <Route
                    path={`${match.url}/:id/create-wholesale`}
                    component={WholesaleNewPage}
                />
                <Route
                    path={`${match.url}/don-si/:id/chi-tiet`}
                    component={WholesaleDetailPage}
                />
                <Route
                    path={`${match.url}/:id/create-payment`}
                    component={PaymentPartnerNewPage}
                />
                <Route
                    path={`${match.url}/don-thanh-toan-ho/:id/chi-tiet`}
                    component={PaymentDetailPage}
                />
                <Route path={`${match.url}/list`} component={ProductListPage} />

                <Route
                    path={`${match.url}/origin/:id/detail`}
                    component={ProductOriginDetailPage}
                />
                <Route
                    path={`${match.url}/origin`}
                    component={ProductOriginPage}
                />

                <Route
                    path={`${match.url}/supplier/:id/detail`}
                    component={ProductSupplierDetailPage}
                />
                <Route
                    path={`${match.url}/supplier`}
                    component={ProductSupplierPage}
                />

                <Route
                    path={`${match.url}/tax/:id/detail`}
                    component={ProductTaxDetailPage}
                />
                <Route path={`${match.url}/tax`} component={ProductTaxPage} />

                <Route
                    path={`${match.url}/unit/:id/detail`}
                    component={ProductUnitDetailPage}
                />
                <Route path={`${match.url}/unit`} component={ProductUnitPage} />

                <Route component={ErrorPage} />
            </Switch>
        </>
    );
}
