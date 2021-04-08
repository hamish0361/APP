import authApi from 'apis/auth/authApi';
import { dialog } from 'app/components/DialogNotify';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
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

function SendLinkEmail(props) {
    const history = useHistory();
    const [isAuthorized, setIsAuthorized] = useState(false);
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
        onSubmit: values => {
            setIsAuthorized(true);
            authApi.sendLinkResetPassword(values).then(
                res => {
                    dialog.success(
                        intl.formatMessage({ id: 'AUTH.FORGOT.SUCCESS' })
                    );
                    setIsAuthorized(false);
                    history.goBack();
                },
                error => {
                    dialog.error(
                        error.response.data?.errors?.message ||
                            intl.formatMessage({ id: 'AUTH.FORGOT.FAIL' })
                    );
                    setIsAuthorized(false);
                }
            );
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

export default injectIntl(connect(null, null)(SendLinkEmail));
