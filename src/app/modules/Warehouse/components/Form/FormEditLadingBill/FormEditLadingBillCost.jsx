import React from 'react';

import { Input } from '_metronic/_partials/controls';
import { Form, FastField, Formik } from 'formik';
import FormStatus from '../FormStatus';
import './index.scss';

const FormEditLadingBillCost = ({
    initialValues,
    onSubmit
}, ref) => {
    return (
        <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={onSubmit}
            innerRef={ref}
        >
            <Form className="form form-label-right form-edit-lading-bill">
                <div className="row">
                    <div className="col-lg-12">
                        <FastField
                            name="balance"
                            component={Input}
                            label="Phí"
                            placeholder="Phí"
                            disabled={true}
                            shouldUpdate={() => true}
                            type="number"
                        />
                    </div>
                    <div className="col-lg-12">
                        <FastField
                            name="additional_cost"
                            component={Input}
                            label="Phụ phí"
                            placeholder="Phụ phí"
                            disabled={true}
                            shouldUpdate={() => true}
                        />
                    </div>
                    <div className="col-lg-12">
                        <FastField
                            name="shipping_cost"
                            component={Input}
                            label="Phí vận chuyển"
                            placeholder="Phí vận chuyển"
                            disabled={true}
                            shouldUpdate={() => true}
                        />
                    </div>
                    <div className="col-lg-12">
                        <FastField
                            name="shipping_inside_cost"
                            component={Input}
                            label="Phí vận chuyển nội địa"
                            placeholder="Phí vận chuyển nội địa"
                            disabled={true}
                            shouldUpdate={() => true}
                        />
                    </div>
                    <div className="col-lg-12">
                        <FastField
                            name="storage_cost"
                            component={Input}
                            label="Phí lưu hàng"
                            placeholder="Phí lưu hàng"
                            disabled={true}
                            shouldUpdate={() => true}
                        />
                    </div>
                </div>

                <FormStatus />
            </Form>
        </Formik>
    );
};

export default React.forwardRef(FormEditLadingBillCost);
