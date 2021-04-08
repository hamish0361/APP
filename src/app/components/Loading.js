import React, { useMemo } from 'react';
import { Spinner } from 'react-bootstrap';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';

function Loading({ local = false, hideLoadingText = false, absolute = true }) {
    const getStyles = useMemo(() => {

        if(!absolute) return {};

        if (local) {
            return {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',

                position: 'absolute',
                left: '0',
                top: '0',
                bottom: 0,
                right: 0,
                borderRadius: '0.42rem',
                zIndex: '9999',
                backgroundColor: 'rgba(0,0,0,0)'
            };
        }

        return {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',

            position: 'fixed',
            left: '0',
            top: '0',

            width: '100%',
            height: '100%',
            borderRadius: '0.42rem',
            zIndex: '9999',
            backgroundColor: 'rgba(0,0,0,0)'
        };
    }, [local, absolute]);

    return (
        <div style={getStyles}>
            <div>
                <div className="d-flex justify-content-center">
                    <Spinner animation="border" variant="primary" />
                </div>
                {!hideLoadingText && (
                    <div className="font-size-h4 text-primary font-weight-bold mt-4">
                        <FormattedMessage id="GLOBAL.LOADING" />
                    </div>
                )}
            </div>
        </div>
    );
}

export default injectIntl(connect(null, null)(Loading));
