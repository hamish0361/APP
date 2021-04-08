import React from 'react';
import { Route, Redirect, Switch, useRouteMatch } from 'react-router-dom';

import TableSFAs from './TableSFAs';
import ClassifyDetail from './ClassifyDetail';

const StorageBoxPage = props => {

    const match = useRouteMatch();

    return (
        <Switch>
            <Redirect exact={true} from="/warehouse/classify-box" to="/warehouse/classify-box/list" />

            <Route path={`${match.path}/list`}>
                <TableSFAs />
            </Route>

            <Route path={`${match.path}/:sfa_id`}>
                <ClassifyDetail />
            </Route>
        </Switch>
    );
};

StorageBoxPage.propTypes = {

};

export default StorageBoxPage;