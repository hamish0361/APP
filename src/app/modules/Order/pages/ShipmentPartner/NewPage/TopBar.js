import PropTypes from 'prop-types';
import React from 'react';
import { CardHeader, CardHeaderToolbar } from '_metronic/_partials/controls';

TopBar.propTypes = {
    onBack: PropTypes.func,
    onSave: PropTypes.func,
    title: PropTypes.string
};

function TopBar({ onBack, onSave, title = '' }) {
    return (
        <CardHeader title={title}>
            <CardHeaderToolbar>
                <button
                    type="button"
                    onClick={onBack}
                    className="btn btn-light"
                >
                    <i className="fa fa-arrow-left"></i>
                    Back
                </button>
                {`  `}
                <button
                    type="submit"
                    style={{ width: '100px' }}
                    className="btn btn-primary ml-2"
                    onClick={onSave}
                >
                    New
                </button>
            </CardHeaderToolbar>
        </CardHeader>
    );
}

export default TopBar;
