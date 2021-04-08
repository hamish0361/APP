import React, { useEffect, useMemo, useState } from 'react';

import useTrans from 'helper/useTrans';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';

import './index.scss';

function Alert({ variant, ...props }) {

    const propsCpnt = useMemo(() => {
        if (variant !== 'default') return { variant, ...props };

        return props;
    }, [props, variant]);

    return <MuiAlert elevation={6} {...propsCpnt} />;
}

const DialogNotify = ({
    size = 'default',
    position = { vertical: 'top', horizontal: 'center' },
    variant = 'filled'
}) => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('Action success');
    const [actionType, setActionType] = useState('success');
    const [trans] = useTrans();

    useEffect(() => {
        window.addEventListener('trigger-dialog-notify', evt => {
            setMessage(evt.detail.message);
            setActionType(evt.detail.actionType);
            setOpen(true);
        });

        return () => {
            // window.removeEventListener('trigger-dialog-notify', evt => {
            //     setMessage(evt.detail.message);
            //     setActionType(evt.detail.actionType);
            //     setOpen(true);
            // });
        };
    }, []); // eslint-disable-line

    const handleClose = (evt, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const alertContent = useMemo(() => {

        if (size === 'large')
            return (
                <Alert severity={actionType} onClose={handleClose} className="large-alert" variant={variant}>
                    <AlertTitle>{trans(`common.${actionType}`)}</AlertTitle>
                    {message}
                </Alert>
            )

        return (
            <Alert onClose={handleClose} severity={actionType} variant={variant}>
                {message}
            </Alert>
        )
    }, [message, actionType, size, trans, variant]);

    return (
        <Snackbar
            open={open}
            autoHideDuration={5 * 1000}
            anchorOrigin={position}
            onClose={handleClose}
        >
            {alertContent}
        </Snackbar>
    );
};

DialogNotify.propTypes = {};

export default DialogNotify;

export const dialog = {
    success: message => {
        var evt = new CustomEvent('trigger-dialog-notify', {
            detail: {
                message,
                actionType: 'success'
            }
        });
        window.dispatchEvent(evt);
    },
    error: message => {
        var evt = new CustomEvent('trigger-dialog-notify', {
            detail: {
                message,
                actionType: 'error'
            }
        });
        window.dispatchEvent(evt);
    },
    warning: message => {
        var evt = new CustomEvent('trigger-dialog-notify', {
            detail: {
                message,
                actionType: 'warning'
            }
        });
        window.dispatchEvent(evt);
    },
    info: message => {
        var evt = new CustomEvent('trigger-dialog-notify', {
            detail: {
                message,
                actionType: 'info'
            }
        });
        window.dispatchEvent(evt);
    }
};
