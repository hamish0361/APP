import React from 'react';
import { Redirect, Route, useRouteMatch, Switch } from 'react-router-dom';

import InvoiceList from './InvoiceList';
import InvoiceDetailPage from './InvoiceDetail';

const OutOfStockPage = props => {

    const match = useRouteMatch();

    return (
        <Switch>
            {<Redirect exact={true} from={match.url} to={`${match.url}/list`} />}
            <Route path={`${match.url}/list`} component={InvoiceList} />
            <Route path={`${match.url}/detail/:id`} component={InvoiceDetailPage} />
        </Switch>
    );
};

OutOfStockPage.propTypes = {

};

export default OutOfStockPage;