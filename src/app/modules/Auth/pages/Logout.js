import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { logout } from '../auth-redux/authSlice';
import { LayoutSplashScreen } from '_metronic/layout';

function Logout() {
    const dispatch = useDispatch();
    const { isToken } = useSelector(({ auth }) => ({
        isToken: auth.authToken != null
    }));

    useEffect(() => {
        dispatch(logout());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return isToken ? <LayoutSplashScreen /> : <Redirect to="/auth/login" />;
}

export default Logout;
