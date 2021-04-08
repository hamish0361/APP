import React from 'react';
import { Route, Redirect, Switch, useRouteMatch } from 'react-router-dom';

import GoodsDeliveryDetail from './GoodsDeliveryDetail';
import GDTabContent from './GDTabContent';
import NeedPermission from 'app/components/NeedPermission';

const GoodsDelivery = props => {

    const match = useRouteMatch();

    return (
        <Switch>
            <Redirect exact={true} from="/warehouse/goods-delivery" to="/warehouse/goods-delivery/list" />

            <Route path={`${match.path}/list`}>
                <GDTabContent />
            </Route>

            <NeedPermission need="goods-deliveries.update">
                <Route path={`${match.path}/detail/:id`}>
                    <GoodsDeliveryDetail />
                </Route>
            </NeedPermission>
        </Switch>
    );
};

GoodsDelivery.propTypes = {

};

export default GoodsDelivery;