import { FastField, Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import { Input } from '_metronic/_partials/controls';
import * as Yup from 'yup';

ProductUnitDetailForm.propTypes = {
    initialValues: PropTypes.object
};

function ProductUnitDetailForm({ initialValues = {}, btnRef, onSave, intl }) {
    const UnitCreateSchema = Yup.object().shape({
        name: Yup.string().required(
            `${intl.formatMessage({
                id: 'UNIT.REQUIRED.NAME'
            })}`
        )
    });
    return (
        <>
            <Formik
                enableReinitialize={true}
                initialValues={initialValues}
                onSubmit={onSave}
                validationSchema={UnitCreateSchema}
            >
                {({ handleSubmit }) => (
                    <>
                        <Form className="form form-label-right">
                            <div className="form-group row">
                                <div className="col-lg-6 col-md-6">
                                    <label>
                                        {intl.formatMessage({
                                            id: 'UNIT.TOPFILTER.ID'
                                        })}
                                    </label>
                                    <FastField
                                        name="id"
                                        component={Input}
                                        placeholder={intl.formatMessage({
                                            id: 'PRODUCT.ADD.UNIT.ID.PLACEHOLER'
                                        })}
                                        disabled={true}
                                    />
                                </div>
                                <div className="col-lg-6 col-md-6">
                                    <label>
                                        {intl.formatMessage({
                                            id: 'UNIT.TOPFILTER.NAME'
                                        })}
                                    </label>
                                    <FastField
                                        name="name"
                                        component={Input}
                                        placeholder={intl.formatMessage({
                                            id:
                                                'PRODUCT.ADD.UNIT.NAME.PLACEHOLER'
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

export default ProductUnitDetailForm;
