import { FastField, Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import { Input } from '_metronic/_partials/controls';
import * as Yup from 'yup';

ProductTaxDetailForm.propTypes = {
    initialValues: PropTypes.object
};

function ProductTaxDetailForm({ initialValues = {}, btnRef, onSave, intl }) {
    const TaxUpdateSchema = Yup.object().shape({
        name: Yup.string()
            .matches(
                /\d+(%)/,
                `${intl.formatMessage({
                    id: 'TAX.DIALOG_NEW.MATCHES.NAME'
                })}`
            )
            .required(
                `${intl.formatMessage({
                    id: 'TAX.DIALOG_NEW.REQUIRED.NAME'
                })}`
            ),
        percent: Yup.number()
            .max(
                100,
                `${intl.formatMessage({
                    id: 'TAX.DIALOG_NEW.MAX.PERCENT'
                })}`
            )
            .required(
                `${intl.formatMessage({
                    id: 'TAX.DIALOG_NEW.REQUIRED.PERCENT'
                })}`
            )
    });

    return (
        <>
            <Formik
                enableReinitialize={true}
                initialValues={initialValues}
                onSubmit={onSave}
                validationSchema={TaxUpdateSchema}
            >
                {({ handleSubmit }) => (
                    <>
                        <Form className="form form-label-right">
                            <div className="form-group row">
                                <div className="col-lg-6 col-md-6">
                                    <label>
                                        {intl.formatMessage({
                                            id: 'TAX.TOPFILTER.NAME'
                                        })}
                                    </label>
                                    <FastField
                                        name="name"
                                        component={Input}
                                        placeholder={intl.formatMessage({
                                            id: 'PRODUCT.DETAIL.NAME.PLACEHOLER'
                                        })}
                                    />
                                </div>
                                <div className="col-lg-6 col-md-6">
                                    <label>
                                        {' '}
                                        {intl.formatMessage({
                                            id: 'TAX.TOPFILTER.PERCENT'
                                        })}
                                    </label>
                                    <FastField
                                        name="percent"
                                        component={Input}
                                        placeholder={intl.formatMessage({
                                            id: 'PRODUCT.DETAIL.NAME.PLACEHOLER'
                                        })}
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                style={{ display: 'none' }}
                                ref={btnRef}
                                onSubmit={() => handleSubmit()}
                            ></button>
                        </Form>
                    </>
                )}
            </Formik>
        </>
    );
}

export default ProductTaxDetailForm;
