import React from 'react';
import { useLang } from './Metronici18n';
import { IntlProvider } from 'react-intl';
import '@formatjs/intl-relativetimeformat/polyfill';
import '@formatjs/intl-relativetimeformat/dist/locale-data/en';
import '@formatjs/intl-relativetimeformat/dist/locale-data/ja';
import '@formatjs/intl-relativetimeformat/dist/locale-data/vi';

import enMessages from './messages/en';
import jaMessages from './messages/ja';
import viMessages from './messages/vi';

const allMessages = {
    en: enMessages,
    ja: jaMessages,
    vi: viMessages
};

function flattenMessages(nestedMessages, prefix = '') {
    return Object.keys(nestedMessages).reduce((messages, key) => {
        let value = nestedMessages[key];
        let prefixedKey = prefix ? `${prefix}.${key}` : key;

        if (typeof value === 'string') {
            messages[prefixedKey] = value;
        } else {
            Object.assign(messages, flattenMessages(value, prefixedKey));
        }

        return messages;
    }, {});
}

export function I18nProvider({ children }) {
    const locale = useLang();
    const messages = allMessages[locale];

    return (
        <IntlProvider locale={locale} messages={flattenMessages(messages)}>
            {children}
        </IntlProvider>
    );
}
