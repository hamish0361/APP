import { FastField, Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import { Input } from '_metronic/_partials/controls';
import * as Yup from 'yup';

OriginDetailForm.propTypes = {
    initialValues: PropTypes.object
};

function OriginDetailForm({ initialValues = {}, btnRef, onSave, intl }) {
    const OriginUpdateSchema = Yup.object().shape({
        name: Yup.string().required(
            `${intl.formatMessage({ id: 'PRODUCT.DETAIL.ORIGIN.REQUIRED' })}}`
        )
    });
    return (
        <>
            <Formik
                enableReinitialize={true}
                initialValues={initialValues}
                onSubmit={onSave}
                validationSchema={OriginUpdateSchema}
            >
                {({ handleSubmit }) => (
                    <>
                        <Form className="form form-label-right">
                            <div className="form-group row">
                                <div className="col-lg-6 col-md-6">
                                    <label>
                                        {intl.formatMessage({
                                            id: 'ORIGIN.TYPE.ID'
                                        })}
                                    </label>
                                    <FastField
                                        name="id"
                                        component={Input}
                                        disabled={true}
                                        placeholder={intl.formatMessage({
                                            id:
                                                'PRODUCT.DETAIL.ORIGIN.ID.PLACEHOLER'
                                        })}
                                    />
                                </div>
                                <div className="col-lg-6 col-md-6">
                                    <label>
                                        {intl.formatMessage({
                                            id: 'ORIGIN.TYPE.NAME'
                                        })}
                                    </label>
                                    <FastField
                                        name="name"
                                        component={Input}
                                        placeholder={intl.formatMessage({
                                            id:
                                                'PRODUCT.DETAIL.ORIGIN.NAME.PLACEHOLER'
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

export default OriginDetailForm;
