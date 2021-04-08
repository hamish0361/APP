import React from 'react';

import { Input } from '_metronic/_partials/controls';
import { FastField, Form, Formik } from 'formik';
import FormStatus from '../FormStatus';

import './index.scss';
import useTrans from 'helper/useTrans';

const FormEditInvoiceCost = ({
    isEdit = true,
    initialValues,
    onSubmit
}, ref) => {

    const [trans] = useTrans();

    return (
        <Formik
            innerRef={ref}
            enableReinitialize
            initialValues={initialValues}
            onSubmit={onSubmit}
        >
            <Form className="form form-label-right form-edit-invoice-cost">
                <div className="row">
                    <div className="col-lg-6">
                        <FastField
                            name="shipping_cost"
                            label={trans("warehouse.cost.shipping")}
                            placeholder={trans("warehouse.cost.shipping")}
                            component={Input}
                            disabled={!isEdit}
                            shouldUpdate={() => true}
                            type="number"
                        />
                    </div>
                    <div className="col-lg-6">
                        <FastField
                            name="shipping_cost_per_unit"
                            label={trans("warehouse.cost.shipping_per_unit")}
                            placeholder={trans("warehouse.cost.shipping_per_unit")}
                            component={Input}
                            disabled={true}
                            shouldUpdate={() => true}
                            type="number"
                        />
                    </div>
                </div>

                <FormStatus />
            </Form>
        </Formik>
    );
};

export default React.forwardRef(FormEditInvoiceCost);
