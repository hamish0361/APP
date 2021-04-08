/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/app/modules/Auth/pages/AuthPage`, `src/app/BasePage`).
 */

import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { getStorage } from '_metronic/_helpers';
import BasePage from './BasePage';
import { Logout } from './modules/Auth';
import { AuthPage } from './modules/Auth/pages/AuthPage';
import ErrorPage from './modules/Error/ErrorPage';

export function Routes() {
    const { isAuthorized } = useSelector(
        ({ auth }) => ({
            isAuthorized: auth.user != null
        }),
        shallowEqual
    );

    return (
        <Switch>
            {!isAuthorized || getStorage('token') == null ? (
                <Route>
                    <AuthPage />
                </Route>
            ) : (
                <Redirect from="/auth" to="/" />
            )}

            <Route path="/logout" component={Logout} />
            <Route path="/error" component={ErrorPage} />

            {!isAuthorized || getStorage('token') == null ? (
                <Redirect to="/auth/login" />
            ) : (
                <BasePage />
            )}
        </Switch>
    );
}