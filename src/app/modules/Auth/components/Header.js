import { IMAGES } from 'constant/Images';
import objectPath from 'object-path';
import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useHtmlClassService } from '_metronic/layout';
import { setLoginStatus } from '../auth-redux/authSlice';
import './index.scss';

export default function Header() {
    const dispatch = useDispatch();
    const uiService = useHtmlClassService();

    const layoutProps = useMemo(() => {
        return {
            headerClasses: uiService.getClasses('header', true),
            headerAttributes: uiService.getAttributes('header'),
            headerContainerClasses: uiService.getClasses(
                'header_container',
                true
            ),
            menuHeaderDisplay: objectPath.get(
                uiService.config,
                'header.menu.self.display'
            )
        };
    }, [uiService]);

    return (
        <>
            {/*begin::Header*/}
            <div
                className="header-login"
                id="kt_header"
                {...layoutProps.headerAttributes}
                style={{ backgroundColor: '#407c94' }}
            >
                {/*begin::Container*/}
                <div className="container header-login-container container d-flex align-items-stretch justify-content-between">
                    {/* begin::Left */}
                    <div className="d-flex align-items-stretch mr-3">
                        {/* begin::Header Logo */}
                        <div className="header-login-logo">
                            <Link
                                to="/shopping/list"
                                onClick={() => dispatch(setLoginStatus(false))}
                            >
                                <img
                                    className="logo-default max-h-40px"
                                    alt="Logo"
                                    src={IMAGES.LOGO_TOMONI}
                                />
                            </Link>
                        </div>
                        {/* end::Header Logo */}
                    </div>
                    {/* end::Left */}
                </div>
                {/*end::Container*/}
            </div>
            {/*end::Header*/}
        </>
    );
}
