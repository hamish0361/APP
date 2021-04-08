import React from 'react';
import PropTypes from 'prop-types';
import LinearProgressMTUI from '@material-ui/core/LinearProgress';
import Box from '@material-ui/core/Box';

import './index.scss';

export default function LinearProgress({ value, label, ...props }) {
    return (
        <Box display="flex" alignItems="center" className="tmn-base-linear-progress">
            <Box width="100%" mr={1}>
                <LinearProgressMTUI variant="determinate" value={value} {...props} />
            </Box>
            {!!label && (
                <Box minWidth={35}>
                    <span className="linear-progress-label">{label}</span>
                </Box>
            )}
        </Box>
    );
}

LinearProgress.propTypes = {
    value: PropTypes.number.isRequired,
    label: PropTypes.string
};