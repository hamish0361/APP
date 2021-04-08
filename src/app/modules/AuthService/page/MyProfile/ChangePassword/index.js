import authApi from 'apis/auth/authApi';
import { FastField, Form, Formik } from 'formik';
import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import * as Yup from 'yup';
import {
    Card,
    CardBody,
    CardHeader,
    Input
} from '_metronic/_partials/controls';

const ChangePasswordSchema = Yup.object().shape({
    current_password: Yup.string().required('Required'),
    password: Yup.string().required('Required'),
    password_confirmation: Yup.string()
        .required('Required')
        .when('password', {
            is: val => (val && val.length > 0 ? true : false),
            then: Yup.string().oneOf(
                [Yup.ref('password')],
                'Both password need to be the same'
            )
        })
});

function ChangePassword() {
    const [isAlert, setIsAlert] = useState(false);
    const [typeAlert, setTypeAlert] = useState('success');
    const [txtNotifi, setTxtNotifi] = useState('');

    const initialValues = {
        current_password: '',
        password: '',
        password_confirmation: ''
    };

    const onSavePassword = value => {
        authApi.changePassword(value).then(
            res => {
                toggleAlert(true, 'success', 'password change successfully');
            },
            error => {
                toggleAlert(true, 'danger', 'password change failed');
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
            <CardHeader title="Change Password" />
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
                <Formik
                    enableReinitialize={true}
                    initialValues={initialValues}
                    validationSchema={ChangePasswordSchema}
                    onSubmit={onSavePassword}
                >
                    {({ handleSubmit }) => (
                        <>
                            <Form className="form form-label-right">
                                <div className="row">
                                    <div className="form-group col-lg-12">
                                        <FastField
                                            name="current_password"
                                            component={Input}
                                            label="Current Password"
                                            type="password"
                                        />
                                    </div>
                                    <div className="form-group col-lg-12">
                                        <FastField
                                            name="password"
                                            component={Input}
                                            label="New Password"
                                            type="password"
                                        />
                                    </div>
                                    <div className="form-group col-lg-12">
                                        <FastField
                                            name="password_confirmation"
                                            component={Input}
                                            label="Verify Password"
                                            type="password"
                                        />
                                    </div>
                                    <div className="form-group col-lg-12 text-right">
                                        <button
                                            type="button"
                                            onClick={handleSubmit}
                                            className="btn btn-success mr-2"
                                        >
                                            Save Changes
                                        </button>
                                        {`  `}
                                    </div>
                                </div>
                            </Form>
                        </>
                    )}
                </Formik>
            </CardBody>
        </Card>
    );
}

export default ChangePassword;
