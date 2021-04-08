import authApi from 'apis/auth/authApi';
import { useFormik } from 'formik';
import generatorId from 'helper/generatorId';
import React, { useState } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

/*
  INTL (i18n) docs:
  https://github.com/formatjs/react-intl/blob/master/docs/Components.md#formattedmessage
*/

/*
  Formik+YUP:
  https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
*/

const initialValues = {
    email: '',
    id: generatorId(),
    password: '',
    password_confirmation: ''
};

function Register(props) {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [registerSuccess, setRegisterSuccess] = useState(false);
    const { intl } = props;
    const history = useHistory();
    const LoginSchema = Yup.object().shape({
        email: Yup.string()
            .email('Wrong email format')
            .min(3, 'Minimum 3 symbols')
            .max(50, 'Maximum 50 symbols')
            .required(
                intl.formatMessage({
                    id: 'AUTH.VALIDATION.REQUIRED_FIELD'
                })
            ),
        password: Yup.string()
            .min(3, 'Minimum 3 symbols')
            .max(50, 'Maximum 50 symbols')
            .required(
                intl.formatMessage({
                    id: 'AUTH.VALIDATION.REQUIRED_FIELD'
                })
            ),
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

    const getInputClasses = fieldname => {
        if (formik.touched[fieldname] && formik.errors[fieldname]) {
            return 'is-invalid';
        }

        if (formik.touched[fieldname] && !formik.errors[fieldname]) {
            return 'is-valid';
        }

        return '';
    };

    const formik = useFormik({
        initialValues,
        validationSchema: LoginSchema,
        onSubmit: (values, { setStatus, setSubmitting }) => {
            setIsAuthorized(true);
            authApi.register(values).then(
                res => {
                    setIsAuthorized(false);
                    setRegisterSuccess(true);
                },
                error => {
                    setIsAuthorized(false);
                    setStatus(
                        intl.formatMessage({
                            id: 'AUTH.VALIDATION.INVALID_REGISTER'
                        })
                    );
                }
            );
        }
    });

    return (
        <div className="login-form login-signin" id="kt_login_signin_form">
            {/* begin::Head */}
            <div className="text-center mb-10 mb-lg-20">
                <h3 className="font-size-h1">
                    <FormattedMessage id="AUTH.REGISTER.TITLE" />
                </h3>
            </div>
            {/* end::Head */}

            {/*begin::Form*/}
            <form
                onSubmit={formik.handleSubmit}
                className="form fv-plugins-bootstrap fv-plugins-framework"
            >
                {registerSuccess && (
                    <div className="mb-10 alert alert-custom alert-light-success alert-dismissible">
                        <div className="alert-text font-weight-bold">
                            <FormattedMessage id="AUTH.REGISTER.SUCCESS" />
                        </div>
                    </div>
                )}
                {formik.status ? (
                    <div className="mb-10 alert alert-custom alert-light-danger alert-dismissible">
                        <div className="alert-text font-weight-bold">
                            {formik.status}
                        </div>
                    </div>
                ) : null}

                <div className="form-group fv-plugins-icon-container">
                    <input
                        placeholder="Email"
                        type="email"
                        className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
                            'email'
                        )}`}
                        name="email"
                        {...formik.getFieldProps('email')}
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <div className="fv-plugins-message-container">
                            <div className="fv-help-block">
                                {formik.errors.email}
                            </div>
                        </div>
                    ) : null}
                </div>
                <div className="form-group fv-plugins-icon-container">
                    <input
                        placeholder="Password"
                        type="password"
                        className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
                            'password'
                        )}`}
                        name="password"
                        {...formik.getFieldProps('password')}
                    />
                    {formik.touched.password && formik.errors.password ? (
                        <div className="fv-plugins-message-container">
                            <div className="fv-help-block">
                                {formik.errors.password}
                            </div>
                        </div>
                    ) : null}
                </div>
                <div className="form-group fv-plugins-icon-container">
                    <input
                        placeholder="Password Confirm"
                        type="password"
                        className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
                            'password'
                        )}`}
                        name="password_confirmation"
                        {...formik.getFieldProps('password_confirmation')}
                    />
                    {formik.touched.password_confirmation &&
                    formik.errors.password_confirmation ? (
                        <div className="fv-plugins-message-container">
                            <div className="fv-help-block">
                                {formik.errors.password_confirmation}
                            </div>
                        </div>
                    ) : null}
                </div>
                <div className="mb-4 text-right">
                    <Link to="/auth/login" className="text-sm font-weight-bold">
                        Sign in?
                    </Link>
                </div>
                <div className="form-group d-flex flex-wrap justify-content-end align-items-center">
                    <button
                        id="kt_login_signin_submit"
                        type="submit"
                        className={`btn btn-primary font-weight-bold px-9 py-4 my-3`}
                    >
                        <span>Sign Up</span>
                        {isAuthorized && (
                            <span className="ml-3 spinner spinner-white"></span>
                        )}
                    </button>
                </div>
            </form>
            {/*end::Form*/}
        </div>
    );
}

export default injectIntl(connect(null, null)(Register));
