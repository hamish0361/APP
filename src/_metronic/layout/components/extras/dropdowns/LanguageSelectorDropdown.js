/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from 'react';
import clsx from 'clsx';
import { Dropdown } from 'react-bootstrap';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { toAbsoluteUrl } from '../../../../_helpers';
import { useLang, setLanguage } from '../../../../i18n';
import { DropdownTopbarItemToggler } from '../../../../_partials/dropdowns';
import { useDispatch } from 'react-redux';
import { fetchStatus } from 'app/modules/Home/redux/homeSlice';

const languages = [
    {
        lang: 'vi',
        name: 'Vietnam',
        flag: toAbsoluteUrl('/media/svg/flags/220-vietnam.svg')
    },
    {
        lang: 'ja',
        name: 'Japan',
        flag: toAbsoluteUrl('/media/svg/flags/063-japan.svg')
    },
    {
        lang: 'en',
        name: 'England',
        flag: toAbsoluteUrl('/media/svg/flags/216-england.svg')
    }
];

export function LanguageSelectorDropdown() {
    const dispatch = useDispatch();
    const lang = useLang();
    const currentLanguage = languages.find(x => x.lang === lang);

    const handleLanguageChange = language => {
        setLanguage(language.lang);
        dispatch(fetchStatus()).then(() => {
            window.location.reload();
        });
    };

    return (
        <Dropdown drop="down" alignRight>
            <Dropdown.Toggle
                as={DropdownTopbarItemToggler}
                id="dropdown-toggle-my-cart"
            >
                <OverlayTrigger
                    placement="bottom"
                    overlay={
                        <Tooltip id="language-panel-tooltip">
                            Select Language
                        </Tooltip>
                    }
                >
                    <div className="btn btn-icon btn-clean btn-dropdown btn-lg mr-1">
                        <img
                            className="h-25px w-25px rounded"
                            src={currentLanguage.flag}
                            alt={currentLanguage.name}
                        />
                    </div>
                </OverlayTrigger>
            </Dropdown.Toggle>
            <Dropdown.Menu className="p-0 m-0 dropdown-menu-right dropdown-menu-anim dropdown-menu-top-unround">
                <ul className="navi navi-hover py-4">
                    {languages.map(language => (
                        <li
                            key={language.lang}
                            className={clsx('navi-item', {
                                active: language.lang === currentLanguage.lang
                            })}
                        >
                            <a
                                href="#"
                                onClick={() => handleLanguageChange(language)}
                                className="navi-link"
                            >
                                <span className="symbol symbol-20 mr-3">
                                    <img
                                        src={language.flag}
                                        alt={language.name}
                                    />
                                </span>
                                <span className="navi-text">
                                    {language.name}
                                </span>
                            </a>
                        </li>
                    ))}
                </ul>
            </Dropdown.Menu>
        </Dropdown>
    );
}
