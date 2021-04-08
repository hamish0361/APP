import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import ErrorPage from "../../../Error/ErrorPage";
import LadingBillList from './LadingBillList';
import LadingBillDetail from './LadingBillDetail';

const LadingBillPage = props => {
    const match = useRouteMatch();

    return (
        <Switch>
            {<Redirect exact={true} from={match.url} to={`${match.url}/list`} />}
            <Route path={`${match.url}/list`} component={LadingBillList} />
            <Route path={`${match.url}/:id`} component={LadingBillDetail} />

            <Route component={ErrorPage} />
        </Switch>
    );
};

LadingBillPage.propTypes = {

};

export default LadingBillPage;