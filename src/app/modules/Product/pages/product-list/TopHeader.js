import { Divider } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import {
    Card,
    CardHeader,
    CardHeaderToolbar
} from '_metronic/_partials/controls';

TopHeader.propTypes = {
    title: PropTypes.string,
    children: PropTypes.any
};

function TopHeader({ title = '', children }) {
    return (
        <Card>
            <Divider />
            <CardHeader title={title}>
                <CardHeaderToolbar>{children}</CardHeaderToolbar>
            </CardHeader>
        </Card>
    );
}

export default TopHeader;
