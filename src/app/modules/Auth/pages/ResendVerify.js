import authApi from 'apis/auth/authApi';
import { useFormik } from 'formik';
import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect, useDispatch } from 'react-redux';
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
    email: ''
};

function ResendVerify(props) {
    const { intl } = props;

    const SendLinkSchema = Yup.object().shape({
        email: Yup.string()
            .email(intl.formatMessage({ id: 'AUTH.VALIDATION.EMAIL' }))
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
        validationSchema: SendLinkSchema,
        onSubmit: (values, { setStatus, setSubmitting }) => {
            authApi.resendVerify(values).then(res => {});
        }
    });

    return (
        <div className="login-form login-signin" id="kt_login_signin_form">
            {/* begin::Head */}
            <div className="text-center mb-10 mb-lg-20">
                <h3 className="font-size-h1">
                    <FormattedMessage id="AUTH.FORGOT.TITLE" />
                </h3>
                <p className="text-muted font-weight-bold">
                    <FormattedMessage id="AUTH.FORGOT.DESC" />
                </p>
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
                <div className="form-group d-flex flex-wrap justify-content-end align-items-center">
                    <button
                        id="kt_login_signin_submit"
                        type="submit"
                        className={`btn btn-primary font-weight-bold px-9 py-4 my-3`}
                    >
                        <span>
                            <FormattedMessage id="AUTH.FORGOT.BUTTON" />
                        </span>
                    </button>
                </div>
            </form>
            {/*end::Form*/}
        </div>
    );
}

export default injectIntl(connect(null, null)(ResendVerify));
