import { Divider } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { Button } from 'react-bootstrap';
import {
    CardHeader,
    CardHeaderToolbar,
    Card
} from '_metronic/_partials/controls';

TopBar.propTypes = {
    onBack: PropTypes.func,
    onSave: PropTypes.func,
    title: PropTypes.string,
    disabled: PropTypes.bool
};

function TopBar({ onBack, onSave, title = '', disabled, intl }) {
    return (
        <Card>
            <Divider />
            <CardHeader title={title}>
                <CardHeaderToolbar>
                    <Button
                        type="button"
                        onClick={onBack}
                        className="btn btn-light"
                    >
                        <i className="fa fa-arrow-left"></i>
                        {intl.formatMessage({
                            id: 'GLOBAL.BUTTON.BACK'
                        })}
                    </Button>
                    {`  `}
                    <Button
                        style={{ width: '100px' }}
                        type="submit"
                        className="btn btn-primary ml-2"
                        onClick={onSave}
                        disabled={disabled}
                    >
                        {intl.formatMessage({
                            id: 'GLOBAL.BUTTON.SAVE'
                        })}
                    </Button>
                </CardHeaderToolbar>
            </CardHeader>
        </Card>
    );
}

export default injectIntl(connect(null, null)(TopBar));
