import PropTypes from 'prop-types';
import React from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { CardHeader, CardHeaderToolbar } from '_metronic/_partials/controls';

TopBar.propTypes = {
    onBack: PropTypes.func,
    onSave: PropTypes.func,
    title: PropTypes.string
};

function TopBar({ onBack, onSave, title = '', intl }) {
    return (
        <CardHeader title={title}>
            <CardHeaderToolbar>
                <button
                    type="button"
                    onClick={onBack}
                    className="btn btn-light"
                >
                    <i className="fa fa-arrow-left"></i>
                    {intl.formatMessage({
                        id: 'GLOBAL.BUTTON.BACK'
                    })}
                </button>
                {`  `}
                <button
                    type="submit"
                    className="btn btn-primary ml-2"
                    onClick={onSave}
                >
                    {intl.formatMessage({
                        id: 'GLOBAL.BUTTON.SAVE'
                    })}
                </button>
            </CardHeaderToolbar>
        </CardHeader>
    );
}

export default injectIntl(connect(null, null)(TopBar));
