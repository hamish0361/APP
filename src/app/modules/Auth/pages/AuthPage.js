/* eslint-disable jsx-a11y/anchor-is-valid */
import DialogNotify from 'app/components/DialogNotify';
import React from 'react';
import { Redirect, Switch } from 'react-router-dom';
import { ContentRoute } from '_metronic/layout';
import Header from '../components/Header';
import '_metronic/_assets/sass/pages/login/classic/login-1.scss';
import Login from './Login';
// import Register from './Register';
// import ResendVerify from './ResendVerify';
import ResetPassword from './ResetPassword';
import SendLinkEmail from './SendLinkEmail';
// import VerifyEmail from './VerifyEmail';

export function AuthPage() {
    return (
        <>
            <div className="d-flex flex-column flex-root">
                {/*begin::Login*/}
                <Header />
                <div
                    className="login login-1 login-signin-on d-flex flex-column flex-lg-row flex-row-fluid bg-white"
                    id="kt_login"
                >
                    {/*begin::Content*/}
                    <div className="flex-row-fluid d-flex flex-column position-relative p-7 overflow-hidden">
                        {/* begin::Content body */}
                        <div className="d-flex flex-column-fluid flex-center mt-30 mt-lg-0">
                            <Switch>
                                <ContentRoute
                                    path="/auth/login"
                                    component={Login}
                                />

                                {/* <ContentRoute
                                    path="/auth/register"
                                    component={Register}
                                /> */}

                                {/* <ContentRoute
                                    path="/auth/verify-email"
                                    component={VerifyEmail}
                                /> */}

                                <ContentRoute
                                    path="/api/login/send-link-email"
                                    component={SendLinkEmail}
                                />

                                <ContentRoute
                                    path="/api/password/reset/:id"
                                    component={ResetPassword}
                                />

                                {/* <ContentRoute
                                    path="/api/email/resend"
                                    component={ResendVerify}
                                /> */}

                                <Redirect
                                    from="/auth"
                                    exact={true}
                                    to="/auth/login"
                                />
                                <Redirect to="/auth/login" />
                            </Switch>
                        </div>
                        {/*end::Content body*/}

                        {/* begin::Mobile footer */}
                        <div className="d-flex d-lg-none flex-column-auto flex-column flex-sm-row justify-content-between align-items-center mt-5 p-5">
                            <div className="text-dark-50 font-weight-bold order-2 order-sm-1 my-2">
                                &copy; 2020 Tomoni
                            </div>
                        </div>
                        {/* end::Mobile footer */}
                    </div>
                    {/*end::Content*/}
                </div>
                <DialogNotify />
                {/*end::Login*/}
            </div>
        </>
    );
}
