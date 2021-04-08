import {
    fetchBank,
    fetchShipmentMethods,
    fetchStatus,
    fetchTax,
    fetchType
} from 'app/modules/Home/redux/homeSlice';
import { useFormik } from 'formik';
import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { fetchMe, fetchToken } from '../auth-redux/authSlice';

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
    password: ''
};

function Login(props) {
    const dispatch = useDispatch();
    const { intl } = props;
    const auth = useSelector(state => state.auth);
    const { isAuthorized } = auth;
    const LoginSchema = Yup.object().shape({
        email: Yup.string()
            .email(intl.formatMessage({ id: 'AUTH.VALIDATION.EMAIL' }))
            .required(
                intl.formatMessage({
                    id: 'AUTH.VALIDATION.REQUIRED_FIELD'
                })
            ),
        password: Yup.string()
            .min(3, intl.formatMessage({ id: 'AUTH.VALIDATION.PASSWORD' }))
            .required(
                intl.formatMessage({
                    id: 'AUTH.VALIDATION.REQUIRED_FIELD'
                })
            )
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
            const body = {
                grant_type: 'password',
                client_id: 2,
                client_secret: process.env.REACT_APP_CLIENT_SECRET,
                username: values.email,
                password: values.password,
                scope: '*'
            };
            dispatch(fetchToken(body)).then(res => {
                if (res.type.includes('fulfilled')) {
                    const params = {
                        with: 'status;role'
                    };
                    dispatch(fetchMe(params));
                    dispatch(fetchStatus());
                    dispatch(fetchTax());
                    dispatch(fetchShipmentMethods());
                    dispatch(fetchType());
                    dispatch(fetchBank());
                } else {
                    setStatus(
                        intl.formatMessage({
                            id: 'AUTH.VALIDATION.INVALID_LOGIN'
                        })
                    );
                }
            });
        }
    });

    return (
        <div className="login-form login-signin" id="kt_login_signin_form">
            {/* begin::Head */}
            <div className="text-center mb-10 mb-lg-16">
                <h3 className="font-size-h1">
                    <FormattedMessage id="AUTH.LOGIN.TITLE" />
                </h3>
            </div>
            {/* end::Head */}

            {/*begin::Form*/}
            <form
                onSubmit={formik.handleSubmit}
                className="form fv-plugins-bootstrap fv-plugins-framework"
            >
                {formik.status ? (
                    <div className="mb-10 alert alert-custom alert-light-danger alert-dismissible">
                        <div className="alert-text font-weight-bold">
                            {formik.status}
                        </div>
                    </div>
                ) : null}

                <div className="form-group fv-plugins-icon-container">
                    <input
                        placeholder={intl.formatMessage({
                            id: 'AUTH.INPUT.EMAIL'
                        })}
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
                        placeholder={intl.formatMessage({
                            id: 'AUTH.INPUT.PASSWORD'
                        })}
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
                <div className="mb-4 d-flex items-center justify-content-between">
                    <Link
                        to="/api/login/send-link-email"
                        className="text-sm font-weight-bold"
                    >
                        <FormattedMessage id="AUTH.FORGOT.TITLE" />
                    </Link>
                    {/* <Link
                        to="/auth/register"
                        className="text-sm font-weight-bold"
                    >
                        Sign up?
                    </Link> */}
                </div>
                <div className="form-group d-flex flex-wrap justify-content-end align-items-center">
                    <button
                        id="kt_login_signin_submit"
                        type="submit"
                        className={`btn btn-primary font-weight-bold px-9 py-4 my-3`}
                    >
                        <span>
                            <FormattedMessage id="AUTH.LOGIN.BUTTON" />
                        </span>
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

export default injectIntl(connect(null, null)(Login));
