/* eslint-disable jsx-a11y/role-supports-aria-props */
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, { useCallback } from 'react';
import { useLocation } from 'react-router';
import { NavLink } from 'react-router-dom';
import SVG from 'react-inlinesvg';
import { toAbsoluteUrl, checkIsActive } from '../../../../_helpers';
import { useSelector, connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import NeedPermission from 'app/components/NeedPermission';
import { ROLES } from 'constant/Role';
import { uniq } from 'lodash';

function AsideMenuList({ layoutProps, intl }) {
    const location = useLocation();
    const user = useSelector(state => state.auth.user);
    const { role } = user;
    const getMenuItemActive = (url, hasSubmenu = false) => {
        return checkIsActive(location, url)
            ? ` ${!hasSubmenu && 'menu-item-active'} menu-item-open `
            : '';
    };

    const buyerRole = role?.includes(ROLES.BUYER);
    const accountantRole = role?.includes(ROLES.ACCOUNTANT);
    const saleRole = role?.includes(ROLES.SALE);
    const warehouseRole = role?.includes(ROLES.WAREHOUSE);
    const allRole = role?.includes(ROLES.ADMIN) || role?.includes(ROLES.ROOT);

    const menu = {
        order: [
            {
                title: intl.formatMessage({ id: 'MENU.ORDER.RETAIL' }),
                href: '/ban-hang/don-le'
            },
            {
                title: intl.formatMessage({ id: 'MENU.ORDER.WHOLESALE' }),
                href: '/ban-hang/don-si'
            },
            {
                title: intl.formatMessage({ id: 'MENU.ORDER.PAYMENT' }),
                href: '/ban-hang/don-thanh-toan-ho'
            },
            {
                title: intl.formatMessage({ id: 'MENU.ORDER.SHIPMENT' }),
                href: '/ban-hang/don-van-chuyen-ho'
            },
            {
                title: intl.formatMessage({ id: 'MENU.ORDER.AUCTION' }),
                href: '/ban-hang/don-dau-gia'
            }
        ],
        payment: [
            {
                title: intl.formatMessage({ id: 'MENU.PURCHASE.ORDER' }),
                href: '/mua-hang/don-mua-hang'
            },
            {
                title: intl.formatMessage({ id: 'MENU.PURCHASE.DIVISION' }),
                href: '/mua-hang/phan-hang'
            },
            {
                title: intl.formatMessage({ id: 'MENU.PURCHASE.TRACKING' }),
                href: '/mua-hang/tracking'
            }
        ],
        warehouse: [
            {
                title: intl.formatMessage({ id: 'DASHBOARD.TITLE' }),
                href: '/warehouse/dashboard',
                need: 'sfas'
            },
            {
                title: intl.formatMessage({ id: 'warehouse.inventory.title' }),
                href: '/warehouse/inventory',
                need: 'sfas'
            },
            {
                title: intl.formatMessage({ id: 'MENU.WAREHOUSE.SCHEDULE' }),
                href: '/warehouse/wh-plan',
                need: ['sfas']
            },
            {
                title: intl.formatMessage({ id: 'MENU.WAREHOUSE.INBOUND' }),
                href: '/warehouse/inbound',
                need: ['sfas', 'sfas.create', 'sfas.update']
            },
            {
                title: intl.formatMessage({
                    id: 'MENU.WAREHOUSE.CHECKING_GOODS'
                }),
                href: '/warehouse/check-sfas',
                need: ['sfas', 'sfas.create', 'sfas.update']
            },
            {
                title: intl.formatMessage({
                    id: 'MENU.WAREHOUSE.STORAGE_GOODS'
                }),
                href: '/warehouse/storage-sfas',
                need: ['sfas', 'sfas.create', 'sfas.update']
            },
            {
                title: intl.formatMessage({
                    id: 'MENU.WAREHOUSE.ASSIGN_BOXES'
                }),
                href: '/warehouse/classify-box',
                need: ['owning-boxes.index']
            },
            {
                title: intl.formatMessage({ id: 'MENU.WAREHOUSE.PACK_BOX' }),
                href: '/warehouse/pack-box',
                need: ['sfas', 'sfas.create', 'sfas.update']
            },
            {
                title: intl.formatMessage({
                    id: 'MENU.WAREHOUSE.LADING_BILLS'
                }),
                href: '/warehouse/lading-bills',
                need: ['lading-bills.index']
            },
            {
                title: intl.formatMessage({ id: 'MENU.WAREHOUSE.INVOICE' }),
                href: '/warehouse/container',
                need: ['containers.index']
            },
            {
                title: intl.formatMessage({
                    id: 'MENU.WAREHOUSE.LOAD_UP_CONTAINER'
                }),
                href: '/warehouse/load-up-container',
                need: [
                    'in-container-pickers.create',
                    'in-container-pickers.update',
                    'in-container-pickers.delete',
                    'in-container-pickers.index'
                ],
                permisisonJoin: 'and'
            },
            {
                title: intl.formatMessage({
                    id: 'MENU.WAREHOUSE.DOWN_CONTAINER'
                }),
                href: '/warehouse/down-container',
                need: ['out-container-pickers.index']
            },
            {
                title: intl.formatMessage({
                    id: 'MENU.WAREHOUSE.GOODS_DELIVERY'
                }),
                href: '/warehouse/goods-delivery',
                need: ['goods-deliveries.index', 'delivery-partners.index']
            },
            {
                title: intl.formatMessage({
                    id: 'MENU.WAREHOUSE.OUTBOUND_PICKER'
                }),
                href: '/warehouse/outbound-picker',
                need: ['outbound-pickers.index']
            },
            {
                title: intl.formatMessage({ id: 'MENU.WAREHOUSE.MODEL' }),
                href: '/warehouse/model',
                need: ['sfas']
            },
            {
                title: intl.formatMessage({ id: 'MENU.WAREHOUSE.SETTINGS' }),
                href: '/warehouse/settings',
                need: ['sfas']
            }
        ],
        Accounting: [
            {
                title: intl.formatMessage({ id: 'MENU.ACCOUNTING.ORDER' }),
                href: '/ke-toan/kt-ban-hang'
            },
            {
                title: intl.formatMessage({ id: 'MENU.ACCOUNTING.PURCHASE' }),
                href: '/ke-toan/kt-mua-hang'
            },
            {
                title: intl.formatMessage({ id: 'MENU.ACCOUNTING.CARD' }),
                href: '/ke-toan/the'
            },
            {
                title: intl.formatMessage({ id: 'MENU.ACCOUNTING.CUSTOMER' }),
                href: '/ke-toan/khach-hang'
            }
        ],
        product: [
            {
                title: intl.formatMessage({ id: 'MENU.PRODUCT' }),
                href: '/product/list'
            },
            {
                title: intl.formatMessage({ id: 'MENU.PRODUCT.ORIGIN' }),
                href: '/product/origin'
            },
            {
                title: intl.formatMessage({ id: 'MENU.PRODUCT.SUPPLIER' }),
                href: '/product/supplier'
            },
            {
                title: intl.formatMessage({ id: 'MENU.PRODUCT.TAX' }),
                href: '/product/tax'
            },
            {
                title: intl.formatMessage({ id: 'MENU.PRODUCT.UNIT' }),
                href: '/product/unit'
            }
        ],
        authService: [
            {
                title: intl.formatMessage({ id: 'MENU.AUTHSERVICE.DETAIL' }),
                href: `/auth-service/users/${user?.id}/detail`
            },
            {
                title: intl.formatMessage({ id: 'MENU.AUTHSERVICE.LIST' }),
                href: '/auth-service/users/list-users'
            }
        ],
        warehouseClassifyBox: [
            {
                title: intl.formatMessage({
                    id: 'MENU.WAREHOUSE.ASSIGN_BOXES'
                }),
                href: '/warehouse/classify-box'
            }
        ]
    };

    const getParentMenuItemPermissionByKey = useCallback(key => {
        if (!menu[key]) return [];

        let listPermission = menu[key].reduce((prevV, curV) => {
            let localNeed =
                typeof curV.need === 'string' ? [curV.need] : curV.need;

            return [...prevV, ...localNeed];
        }, []);

        return uniq(listPermission);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {/* begin::Menu Nav */}
            <ul className={`menu-nav ${layoutProps.ulClasses}`}>
                <li
                    className={`menu-item menu-item-submenu ${getMenuItemActive(
                        '/dashboard'
                    )}`}
                    aria-haspopup="true"
                    data-menu-toggle="hover"
                >
                    <NavLink className="menu-link menu-toggle" to="/dashboard">
                        <span className="svg-icon menu-icon">
                            <SVG
                                src={toAbsoluteUrl(
                                    '/media/svg/icons/Design/Cap-2.svg'
                                )}
                            />
                        </span>
                        <span className="menu-text">
                            <FormattedMessage id="MENU.DASHBOARD" />
                        </span>
                    </NavLink>
                </li>

                {/* ban hang */}
                {/*begin::1 Level*/}
                {(saleRole || allRole) && (
                    <li
                        className={`menu-item menu-item-submenu ${getMenuItemActive(
                            '/ban-hang',
                            true
                        )}`}
                        aria-haspopup="true"
                        data-menu-toggle="hover"
                    >
                        <NavLink
                            className="menu-link menu-toggle"
                            to="/ban-hang"
                        >
                            <span className="svg-icon menu-icon">
                                <SVG
                                    src={toAbsoluteUrl(
                                        '/media/svg/icons/Home/Book.svg'
                                    )}
                                />
                            </span>
                            <span className="menu-text">
                                <FormattedMessage id="MENU.ORDER" />
                            </span>
                            <i className="menu-arrow" />
                        </NavLink>
                        <div className="menu-submenu ">
                            <i className="menu-arrow" />
                            <ul className="menu-subnav">
                                {/* Inputs */}
                                {/*begin::2 Level*/}
                                {menu.order.map(item => (
                                    <li
                                        key={item.title}
                                        className={`menu-item menu-item-submenu ${getMenuItemActive(
                                            `${item.href}`
                                        )}`}
                                        aria-haspopup="true"
                                        data-menu-toggle="hover"
                                    >
                                        <NavLink
                                            className="menu-link menu-toggle"
                                            to={item.href}
                                        >
                                            <i className="menu-bullet menu-bullet-dot">
                                                <span />
                                            </i>
                                            <span className="menu-text">
                                                {item.title}
                                            </span>
                                        </NavLink>
                                    </li>
                                ))}

                                {/*end::2 Level*/}
                            </ul>
                        </div>
                    </li>
                )}

                {/* Mua hang */}
                {/*begin::1 Level*/}
                {(buyerRole || allRole) && (
                    <li
                        className={`menu-item menu-item-submenu ${getMenuItemActive(
                            '/mua-hang',
                            true
                        )}`}
                        aria-haspopup="true"
                        data-menu-toggle="hover"
                    >
                        <NavLink
                            className="menu-link menu-toggle"
                            to="/mua-hang"
                        >
                            <span className="svg-icon menu-icon">
                                <SVG
                                    src={toAbsoluteUrl(
                                        '/media/svg/icons/Shopping/Cart2.svg'
                                    )}
                                />
                            </span>
                            <span className="menu-text">
                                <FormattedMessage id="MENU.PURCHASE" />
                            </span>
                            <i className="menu-arrow" />
                        </NavLink>
                        <div className="menu-submenu ">
                            <i className="menu-arrow" />
                            <ul className="menu-subnav">
                                {/* Inputs */}
                                {/*begin::2 Level*/}
                                {menu.payment.map(item => (
                                    <li
                                        key={item.title}
                                        className={`menu-item menu-item-submenu ${getMenuItemActive(
                                            `${item.href}`,
                                            true
                                        )}`}
                                        aria-haspopup="true"
                                        data-menu-toggle="hover"
                                    >
                                        <NavLink
                                            className="menu-link menu-toggle"
                                            to={item.href}
                                        >
                                            <i className="menu-bullet menu-bullet-dot">
                                                <span />
                                            </i>
                                            <span className="menu-text">
                                                {item.title}
                                            </span>
                                        </NavLink>
                                    </li>
                                ))}

                                {/*end::2 Level*/}
                            </ul>
                        </div>
                    </li>
                )}

                {/* Kho */}
                {/*begin::1 Level*/}
                {(warehouseRole || allRole || saleRole) && (
                    <NeedPermission
                        need={getParentMenuItemPermissionByKey('warehouse')}
                    >
                        <li
                            className={`menu-item menu-item-submenu ${getMenuItemActive(
                                '/warehouse',
                                true
                            )}`}
                            aria-haspopup="true"
                            data-menu-toggle="hover"
                        >
                            <NavLink
                                className="menu-link menu-toggle"
                                to="/warehouse"
                            >
                                <span className="svg-icon menu-icon">
                                    <SVG
                                        src={toAbsoluteUrl(
                                            '/media/svg/icons/Shopping/Box2.svg'
                                        )}
                                    />
                                </span>
                                <span className="menu-text">
                                    <FormattedMessage id="MENU.WAREHOUSE" />
                                </span>
                                <i className="menu-arrow" />
                            </NavLink>
                            <div className="menu-submenu ">
                                <i className="menu-arrow" />
                                {saleRole ? (
                                    <ul className="menu-subnav">
                                        {/* Inputs */}
                                        {/*begin::2 Level*/}
                                        {menu.warehouseClassifyBox.map(item => (
                                            <NeedPermission
                                                need={item?.need}
                                                key={item.title}
                                                permisisonJoin={
                                                    item.permisisonJoin || 'or'
                                                }
                                            >
                                                <li
                                                    className={`menu-item menu-item-submenu ${getMenuItemActive(
                                                        `${item.href}`
                                                    )}`}
                                                    aria-haspopup="true"
                                                    data-menu-toggle="hover"
                                                >
                                                    <NavLink
                                                        className="menu-link menu-toggle"
                                                        to={item.href}
                                                    >
                                                        <i className="menu-bullet menu-bullet-dot">
                                                            <span />
                                                        </i>
                                                        <span className="menu-text">
                                                            {item.title}
                                                        </span>
                                                    </NavLink>
                                                </li>
                                            </NeedPermission>
                                        ))}

                                        {/*end::2 Level*/}
                                    </ul>
                                ) : (
                                    <ul className="menu-subnav">
                                        {/* Inputs */}
                                        {/*begin::2 Level*/}
                                        {menu.warehouse.map(item => (
                                            <NeedPermission
                                                need={item?.need}
                                                key={item.title}
                                                permisisonJoin={
                                                    item.permisisonJoin || 'or'
                                                }
                                            >
                                                <li
                                                    className={`menu-item menu-item-submenu ${getMenuItemActive(
                                                        `${item.href}`
                                                    )}`}
                                                    aria-haspopup="true"
                                                    data-menu-toggle="hover"
                                                >
                                                    <NavLink
                                                        className="menu-link menu-toggle"
                                                        to={item.href}
                                                    >
                                                        <i className="menu-bullet menu-bullet-dot">
                                                            <span />
                                                        </i>
                                                        <span className="menu-text">
                                                            {item.title}
                                                        </span>
                                                    </NavLink>
                                                </li>
                                            </NeedPermission>
                                        ))}

                                        {/*end::2 Level*/}
                                    </ul>
                                )}
                            </div>
                        </li>
                    </NeedPermission>
                )}

                {/* Ke toan */}
                {/*begin::1 Level*/}
                {(accountantRole || allRole) && (
                    <li
                        className={`menu-item menu-item-submenu ${getMenuItemActive(
                            '/ke-toan',
                            true
                        )}`}
                        aria-haspopup="true"
                        data-menu-toggle="hover"
                    >
                        <NavLink
                            className="menu-link menu-toggle"
                            to="/ke-toan"
                        >
                            <span className="svg-icon menu-icon">
                                <SVG
                                    src={toAbsoluteUrl(
                                        '/media/svg/icons/Shopping/Calculator.svg'
                                    )}
                                />
                            </span>
                            <span className="menu-text">
                                {' '}
                                <FormattedMessage id="MENU.ACCOUNTING" />
                            </span>
                            <i className="menu-arrow" />
                        </NavLink>
                        <div className="menu-submenu ">
                            <i className="menu-arrow" />
                            <ul className="menu-subnav">
                                {/* Inputs */}
                                {/*begin::2 Level*/}
                                {menu.Accounting.map(item => (
                                    <li
                                        key={item.title}
                                        className={`menu-item menu-item-submenu ${getMenuItemActive(
                                            `${item.href}`,
                                            true
                                        )}`}
                                        aria-haspopup="true"
                                        data-menu-toggle="hover"
                                    >
                                        <NavLink
                                            className="menu-link menu-toggle"
                                            to={item.href}
                                        >
                                            <i className="menu-bullet menu-bullet-dot">
                                                <span />
                                            </i>
                                            <span className="menu-text">
                                                {item.title}
                                            </span>
                                        </NavLink>
                                    </li>
                                ))}

                                {/*end::2 Level*/}
                            </ul>
                        </div>
                    </li>
                )}

                {/* Hang hoa */}
                {(buyerRole || allRole) && (
                    <li
                        className={`menu-item menu-item-submenu ${getMenuItemActive(
                            '/product',
                            true
                        )}`}
                        aria-haspopup="true"
                        data-menu-toggle="hover"
                    >
                        <NavLink
                            className="menu-link menu-toggle"
                            to="/product"
                        >
                            <span className="svg-icon menu-icon">
                                <SVG
                                    src={toAbsoluteUrl(
                                        '/media/svg/icons/Shopping/Box1.svg'
                                    )}
                                />
                            </span>
                            <span className="menu-text">
                                <FormattedMessage id="MENU.PRODUCT" />
                            </span>
                            <i className="menu-arrow" />
                        </NavLink>
                        <div className="menu-submenu ">
                            <i className="menu-arrow" />
                            <ul className="menu-subnav">
                                {/* Inputs */}
                                {/*begin::2 Level*/}
                                {menu.product.map(item => (
                                    <li
                                        key={item.title}
                                        className={`menu-item menu-item-submenu ${getMenuItemActive(
                                            `${item.href}`,
                                            true
                                        )}`}
                                        aria-haspopup="true"
                                        data-menu-toggle="hover"
                                    >
                                        <NavLink
                                            className="menu-link menu-toggle"
                                            to={item.href}
                                        >
                                            <i className="menu-bullet menu-bullet-dot">
                                                <span />
                                            </i>
                                            <span className="menu-text">
                                                {item.title}
                                            </span>
                                        </NavLink>
                                    </li>
                                ))}

                                {/*end::2 Level*/}
                            </ul>
                        </div>
                    </li>
                )}

                {/* Nguoi dung */}
                {allRole && (
                    <li
                        className={`menu-item menu-item-submenu ${getMenuItemActive(
                            '/auth-service',
                            true
                        )}`}
                        aria-haspopup="true"
                        data-menu-toggle="hover"
                    >
                        <NavLink
                            className="menu-link menu-toggle"
                            to="/auth-service/users/admin/detail"
                        >
                            <span className="svg-icon menu-icon">
                                <SVG
                                    src={toAbsoluteUrl(
                                        '/media/svg/icons/General/User.svg'
                                    )}
                                />
                            </span>
                            <span className="menu-text">
                                <FormattedMessage id="MENU.AUTHSERVICE.USER" />
                            </span>
                            <i className="menu-arrow" />
                        </NavLink>
                        <div className="menu-submenu ">
                            <i className="menu-arrow" />
                            <ul className="menu-subnav">
                                {/* Inputs */}
                                {/*begin::2 Level*/}
                                {menu.authService.map(item => (
                                    <li
                                        key={item.title}
                                        className={`menu-item menu-item-submenu ${getMenuItemActive(
                                            `${item.href}`,
                                            true
                                        )}`}
                                        aria-haspopup="true"
                                        data-menu-toggle="hover"
                                    >
                                        <NavLink
                                            className="menu-link menu-toggle"
                                            to={item.href}
                                        >
                                            <i className="menu-bullet menu-bullet-dot">
                                                <span />
                                            </i>
                                            <span className="menu-text">
                                                {item.title}
                                            </span>
                                        </NavLink>
                                    </li>
                                ))}

                                {/*end::2 Level*/}
                            </ul>
                        </div>
                    </li>
                )}

                {/* Thiet lap */}
                {allRole && (
                    <li
                        className={`menu-item menu-item-submenu ${getMenuItemActive(
                            '/thiet-lap',
                            true
                        )}`}
                        aria-haspopup="true"
                        data-menu-toggle="hover"
                    >
                        <NavLink
                            className="menu-link menu-toggle"
                            to="/setting"
                        >
                            <span className="svg-icon menu-icon">
                                <SVG
                                    src={toAbsoluteUrl(
                                        '/media/svg/icons/Code/Settings4.svg'
                                    )}
                                />
                            </span>
                            <span className="menu-text">
                                <FormattedMessage id="MENU.SETTING" />
                            </span>
                            <i className="menu-arrow" />
                        </NavLink>
                    </li>
                )}
            </ul>
        </>
    );
}

export default injectIntl(connect(null, null)(AsideMenuList));
