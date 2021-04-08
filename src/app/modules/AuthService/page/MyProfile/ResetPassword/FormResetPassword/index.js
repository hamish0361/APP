import { FastField, Form, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { Input } from '_metronic/_partials/controls';

const ResetPasswordSchema = Yup.object().shape({
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

function FormResetPassword({ onResetPassword }) {
    const initialValues = {
		password: '',
		password_confirmation: '',
    };

    return (
        <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            validationSchema={ResetPasswordSchema}
            onSubmit={onResetPassword}
        >
            {({ handleSubmit }) => (
                <>
                    <Form className="form form-label-right">
                        <div className="row">
                            <div className="form-group col-lg-12">
                                <FastField
                                    name="password"
                                    component={Input}
                                    label="Password"
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
                                    Save Password
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

export default FormResetPassword;
