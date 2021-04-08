/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,no-undef */
import React from 'react';
import SVG from 'react-inlinesvg';
import { FormattedMessage } from 'react-intl';
import { shallowEqual, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { toAbsoluteUrl } from '../../../../_helpers';

export function QuickUser() {
    const history = useHistory();
    const { user } = useSelector(
        ({ auth }) => ({ user: auth.user }),
        shallowEqual
    );

    const logoutClick = () => {
        const toggle = document.getElementById('kt_quick_user_toggle');
        if (toggle) {
            toggle.click();
        }
        history.push('/logout');
    };

    return (
        <div
            id="kt_quick_user"
            className="offcanvas offcanvas-right offcanvas p-10"
        >
            <div className="offcanvas-header d-flex align-items-center justify-content-between pb-5">
                <h3 className="font-weight-bold m-0">
                    <FormattedMessage id="USER.PROFILE" />
                </h3>
                <a
                    href="#"
                    className="btn btn-xs btn-icon btn-light btn-hover-primary"
                    id="kt_quick_user_close"
                >
                    <i className="ki ki-close icon-xs text-muted" />
                </a>
            </div>

            <div className="offcanvas-content pr-5 mr-n5">
                <div className="d-flex align-items-center mt-5">
                    <div className="symbol symbol-100 mr-5">
                        <div
                            className="symbol-label"
                            style={{
                                backgroundImage: `url(${toAbsoluteUrl(
                                    '/media/users/default.jpg'
                                )})`
                            }}
                        />
                        <i className="symbol-badge bg-success" />
                    </div>
                    <div className="d-flex flex-column">
                        <Link
                            to={`/auth-service/users/${user?.id}/detail`}
                            className="font-weight-bold font-size-h5 text-dark-75 text-hover-primary"
                        >
                            {user && user.role}
                        </Link>
                        <div className="text-muted mt-1">
                            {user && user.status}
                        </div>
                        <div className="navi mt-2">
                            <a href="#" className="navi-item">
                                <span className="navi-link p-0 pb-2">
                                    <span className="navi-icon mr-1">
                                        <span className="svg-icon-lg svg-icon-primary">
                                            <SVG
                                                src={toAbsoluteUrl(
                                                    '/media/svg/icons/Communication/Mail-notification.svg'
                                                )}
                                            ></SVG>
                                        </span>
                                    </span>
                                    <span className="navi-text text-muted text-hover-primary">
                                        {user && user.email}
                                    </span>
                                </span>
                            </a>
                        </div>
                        <button
                            className="btn btn-light-primary btn-bold"
                            onClick={logoutClick}
                        >
                            Đăng xuất
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
