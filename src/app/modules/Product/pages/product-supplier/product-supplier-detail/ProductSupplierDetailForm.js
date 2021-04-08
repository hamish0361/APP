import { FastField, Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import { Input } from '_metronic/_partials/controls';
import * as Yup from 'yup';

ProductSupplierDetailForm.propTypes = {
    initialValues: PropTypes.object
};

function ProductSupplierDetailForm({
    initialValues = {},
    btnRef,
    onSave,
    intl
}) {
    const SupplierUpdateSchema = Yup.object().shape({
        email: Yup.string().email(
            `${intl.formatMessage({
                id: 'SUPPLIER.DIALOG_NEW.REQUIRED.EMAIL'
            })}`
        ),
        link: Yup.string().matches(
            /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
            `${intl.formatMessage({
                id: 'SUPPLIER.DIALOG_NEW.REQUIRED.LINK'
            })}`
        )
    });
    return (
        <>
            <Formik
                enableReinitialize={true}
                initialValues={initialValues}
                onSubmit={onSave}
                validationSchema={SupplierUpdateSchema}
            >
                {({ handleSubmit }) => (
                    <>
                        <Form className="form form-label-right">
                            <div className="form-group row">
                                <div className="col-lg-6 col-md-6">
                                    <label>
                                        {intl.formatMessage({
                                            id: 'SUPPLIER.TOPFILTER.ID'
                                        })}
                                    </label>
                                    <FastField
                                        name="id"
                                        component={Input}
                                        placeholder={intl.formatMessage({
                                            id:
                                                'PRODUCT.CREATE.SUPPLIER.ID.PLACEHOLER'
                                        })}
                                        disabled={true}
                                    />
                                </div>
                                <div className="col-lg-6 col-md-6">
                                    <label>
                                        {' '}
                                        {intl.formatMessage({
                                            id: 'SUPPLIER.TOPFILTER.NAME'
                                        })}
                                    </label>
                                    <FastField
                                        name="name"
                                        component={Input}
                                        placeholder={intl.formatMessage({
                                            id:
                                                'PRODUCT.CREATE.SUPPLIER.NAME.PLACEHOLER'
                                        })}
                                    />
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-lg-6 col-md-6">
                                    <label>
                                        {' '}
                                        {intl.formatMessage({
                                            id: 'SUPPLIER.TOPFILTER.EMAIL'
                                        })}
                                    </label>
                                    <FastField
                                        name="email"
                                        component={Input}
                                        placeholder={intl.formatMessage({
                                            id:
                                                'PRODUCT.CREATE.SUPPLIER.EMAIL.PLACEHOLER'
                                        })}
                                    />
                                </div>
                                <div className="col-lg-6 col-md-6">
                                    <label>
                                        {' '}
                                        {intl.formatMessage({
                                            id: 'SUPPLIER.TOPFILTER.ADDRESS'
                                        })}
                                    </label>
                                    <FastField
                                        name="address"
                                        component={Input}
                                        placeholder={intl.formatMessage({
                                            id:
                                                'PRODUCT.CREATE.SUPPLIER.ADDRESS.PLACEHOLER'
                                        })}
                                    />
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-lg-6 col-md-6">
                                    <label>
                                        {' '}
                                        {intl.formatMessage({
                                            id: 'SUPPLIER.TOPFILTER.LINK'
                                        })}
                                    </label>
                                    <FastField
                                        name="link"
                                        component={Input}
                                        placeholder={intl.formatMessage({
                                            id:
                                                'PRODUCT.CREATE.SUPPLIER.LINK.PLACEHOLER'
                                        })}
                                    />
                                </div>
                                <div className="col-lg-6 col-md-6">
                                    <label>
                                        {' '}
                                        {intl.formatMessage({
                                            id: 'SUPPLIER.TOPFILTER.NOTE'
                                        })}
                                    </label>
                                    <FastField
                                        name="note"
                                        component={Input}
                                        placeholder={intl.formatMessage({
                                            id:
                                                'PRODUCT.CREATE.SUPPLIER.NOTE.PLACEHOLER'
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

export default ProductSupplierDetailForm;
