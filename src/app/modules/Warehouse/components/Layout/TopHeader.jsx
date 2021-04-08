import { Divider } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import {
    Card,
    CardHeader,
    CardHeaderToolbar
} from '_metronic/_partials/controls';

TopHeader.propTypes = {
    title: PropTypes.any,
    toolbar: PropTypes.any
};

function TopHeader({ title = '', toolbar }) {
    return (
        <Card>
            <Divider />
            <CardHeader title={title}>
                <CardHeaderToolbar>{toolbar}</CardHeaderToolbar>
            </CardHeader>
        </Card>
    );
}

export default TopHeader;
