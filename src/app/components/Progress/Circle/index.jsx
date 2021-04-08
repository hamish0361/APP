import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

export default function CircleProgress({ label, value, ...props }) {
    return (
        <Box position="relative" display="inline-flex">
            <CircularProgress variant="determinate" value={value} {...props} />
            {!!label && (
                <Box
                    top={0}
                    left={0}
                    bottom={0}
                    right={0}
                    position="absolute"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <span className="circle-process-label">{label}</span>
                </Box>
            )}

        </Box>
    );
};

CircleProgress.propTypes = {
    label: PropTypes.string,
    value: PropTypes.number
};