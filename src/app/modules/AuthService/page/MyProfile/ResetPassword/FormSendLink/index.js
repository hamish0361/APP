import { FastField, Form, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { Input } from '_metronic/_partials/controls';

const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email')
        .required('Required')
});

function FormSendLink({ email, onSendLinkResetPassword }) {
    const initialValues = {
        email: email
    };

    return (
        <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            validationSchema={ResetPasswordSchema}
            onSubmit={onSendLinkResetPassword}
        >
            {({ handleSubmit }) => (
                <>
                    <Form className="form form-label-right">
                        <div className="row">
                            <div className="form-group col-lg-12">
                                <FastField
                                    name="email"
                                    component={Input}
                                    label="Email"
                                    type="email"
                                />
                            </div>
                            <div className="form-group col-lg-12 text-right">
                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    className="btn btn-success mr-2"
                                >
                                    Send
                                </button>
                                {`  `}
                            </div>
                        </div>
                    </Form>
                </>
            )}
        </Formik>
    );
}

export default FormSendLink;
