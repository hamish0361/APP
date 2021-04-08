import DialogNotify from 'app/components/DialogNotify';
import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import ErrorPage from '../../Error/ErrorPage';
import MyProfilePage from './MyProfile';
import PermissionPage from './Permission';
import Roles from './Roles';
import UserPage from './Users';
import UserList from './Users/UserList/index';
import UserDetailPage from './Users/UserList/Detail';
import DetailUser from './Users/UserList/Detail/DetailUser';
import { useSelector } from 'react-redux';
import { ROLES } from 'constant/Role';

export default function AuthServicePage() {
    const match = useRouteMatch();
    const user = useSelector(state => state.auth.user);
    const { role } = user;

    const allRole = role?.includes(ROLES.ADMIN) || role?.includes(ROLES.ROOT);

    if (!allRole) return <Redirect to="/dashboard" />;

    return (
        <>
            <DialogNotify />
            <Switch>
                {
                    <Redirect
                        exact={true}
                        from={match.url}
                        to={`${match.url}/users`}
                    />
                }
                <Route
                    path={`${match.url}/users/:id/user-detail`}
                    component={DetailUser}
                />
                <Route
                    exact
                    path={`${match.url}/users/:id/detail`}
                    component={UserDetailPage}
                />
                <Route
                    path={`${match.url}/users/list-users}`}
                    component={UserList}
                />
                <Route path={`${match.url}/users`} component={UserPage} />
                <Route path={`${match.url}/roles`} component={Roles} />
                <Route
                    path={`${match.url}/permissions`}
                    component={PermissionPage}
                />
                <Route
                    path={`${match.url}/profile`}
                    component={MyProfilePage}
                />
                <Route component={ErrorPage} />
            </Switch>
        </>
    );
}
