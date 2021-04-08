import { FastField, Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import { Input } from '_metronic/_partials/controls';

PackageProductForm.propTypes = {
    initialValues: PropTypes.object
};

function PackageProductForm({ initialValues = {}, btnRef, onSave, intl }) {
    return (
        <>
            <Formik
                enableReinitialize={true}
                initialValues={(initialValues && initialValues) || {}}
                onSubmit={onSave}
            >
                {({ handleSubmit }) => (
                    <>
                        <Form className="form form-label-right">
                            <div className="form-group row align-items-center">
                                <div className="col-4">
                                    <span className="order-title">
                                        {intl.formatMessage({
                                            id:
                                                'PRODUCT.CREATE.INFO_PACKAGE.QUANTITY'
                                        })}
                                    </span>
                                </div>
                                <div className="col-8">
                                    <FastField
                                        type="number"
                                        placeholder={intl.formatMessage({
                                            id:
                                                'PRODUCT.CREATE.PLACEHOLER.QUANTITY'
                                        })}
                                        min="1"
                                        name="quantity"
                                        component={Input}
                                        step="0.01"
                                    />
                                </div>
                            </div>
                            <div className="form-group row align-items-center">
                                <div className="col-4">
                                    <span className="order-title">
                                        {intl.formatMessage({
                                            id:
                                                'PRODUCT.CREATE.INFO_PACKAGE.WEIGHT'
                                        })}
                                    </span>
                                </div>
                                <div className="col-8">
                                    <FastField
                                        type="number"
                                        placeholder={intl.formatMessage({
                                            id:
                                                'PRODUCT.CREATE.PLACEHOLER.WEIGHT'
                                        })}
                                        min="1"
                                        name="weight"
                                        component={Input}
                                        step="0.01"
                                    />
                                </div>
                            </div>
                            <div className="form-group row align-items-center">
                                <div className="col-4">
                                    <span className="order-title">
                                        {intl.formatMessage({
                                            id:
                                                'PRODUCT.CREATE.INFO_PACKAGE.HEIGHT'
                                        })}
                                    </span>
                                </div>
                                <div className="col-8">
                                    <FastField
                                        type="number"
                                        placeholder={intl.formatMessage({
                                            id:
                                                'PRODUCT.CREATE.PLACEHOLER.HEIGHT'
                                        })}
                                        min="1"
                                        name="height"
                                        component={Input}
                                        step="0.01"
                                    />
                                </div>
                            </div>
                            <div className="form-group row align-items-center">
                                <div className="col-4">
                                    <span className="order-title">
                                        {intl.formatMessage({
                                            id:
                                                'PRODUCT.CREATE.INFO_PACKAGE.LENGTH'
                                        })}
                                    </span>
                                </div>
                                <div className="col-8">
                                    <FastField
                                        placeholder={intl.formatMessage({
                                            id:
                                                'PRODUCT.CREATE.PLACEHOLER.LENGTH'
                                        })}
                                        type="number"
                                        min="1"
                                        name="length"
                                        component={Input}
                                        step="0.01"
                                    />
                                </div>
                            </div>
                            <div className="form-group row align-items-center">
                                <div className="col-4">
                                    <span className="order-title">
                                        {intl.formatMessage({
                                            id:
                                                'PRODUCT.CREATE.INFO_PACKAGE.WIDTH'
                                        })}
                                    </span>
                                </div>
                                <div className="col-8">
                                    <FastField
                                        type="number"
                                        placeholder={intl.formatMessage({
                                            id:
                                                'PRODUCT.CREATE.PLACEHOLER.WIDTH'
                                        })}
                                        min="1"
                                        name="width"
                                        component={Input}
                                        step="0.01"
                                    />
                                </div>
                            </div>
                            {/* <div className="form-group row align-items-center">
                                <div className="col-4">
                                    <span className="order-title">
                                        {intl.formatMessage({
                                            id:
                                                'PRODUCT.CREATE.INFO_PACKAGE.VOLUME'
                                        })}
                                    </span>
                                </div>
                                <div className="col-8">
                                    <FastField
                                        type="number"
                                        min="1"
                                        name="volume"
                                        component={Input}
                                        disabled={true}
                                    />
                                </div>
                            </div>
                            <div className="form-group row align-items-center">
                                <div className="col-4">
                                    <span className="order-title">
                                        {' '}
                                        {intl.formatMessage({
                                            id:
                                                'PRODUCT.CREATE.INFO_PACKAGE.VOLUME_WEIGHT'
                                        })}
                                    </span>
                                </div>
                                <div className="col-8">
                                    <FastField
                                        type="number"
                                        min="1"
                                        name="volumetric_weight"
                                        component={Input}
                                        disabled={true}
                                    />
                                </div>
                            </div> */}
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

export default PackageProductForm;
