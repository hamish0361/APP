import authApi from 'apis/auth/authApi';
import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import { Card, CardBody, CardHeader } from '_metronic/_partials/controls';
import FormResetPassword from './FormResetPassword';
import FormSendLink from './FormSendLink';

function ResetPassword({ email }) {
    const [isAlert, setIsAlert] = useState(false);
    const [typeAlert, setTypeAlert] = useState('success');
    const [txtNotifi, setTxtNotifi] = useState('');
    // const [token, setToken] = useState('');
    const [isSendLink, setIsSendLink] = useState(true);

    const handleSendLinkResetPassword = value => {
        authApi.sendLinkResetPassword(value).then(
            res => {
                setIsSendLink(false);
                toggleAlert(true, 'success', 'Successfully');
            },
            error => {
                let msgErr = 'Error Sometimes';
                if (error.response) {
                    msgErr = error.response.data?.errors?.message;
                }
                toggleAlert(true, 'danger', msgErr);
            }
        );
    };

    const handleResetPassword = value => {
        const body = { email, token: '', ...value };
        authApi.resetPassword(body).then(
            res => {
                setIsSendLink(false);
                toggleAlert(true, 'success', 'Reset Password Successfully');
            },
            error => {
                let msgErr = 'Reset Password Failed';
                if (error.response) {
                    msgErr = error.response.data?.errors?.message;
                }
                toggleAlert(true, 'danger', msgErr);
            }
        );
    };

    const toggleAlert = (isAlert, type, msg) => {
        setIsAlert(isAlert);
        type && setTypeAlert(type);
        msg && setTxtNotifi(msg);
    };

    return (
        <Card>
            <CardHeader title="Reset Password" />
            <CardBody>
                {isAlert && (
                    <Alert
                        variant={typeAlert}
                        onClose={() => toggleAlert(false, null, null)}
                        dismissible
                    >
                        <p className="mb-0">{txtNotifi}</p>
                    </Alert>
                )}

                {isSendLink ? (
                    <FormSendLink
                        email={email}
                        onSendLinkResetPassword={handleSendLinkResetPassword}
                    />
                ) : (
                    <FormResetPassword onResetPassword={handleResetPassword} />
                )}
            </CardBody>
        </Card>
    );
}

export default ResetPassword;
