import React from 'react';

import { Input } from '_metronic/_partials/controls';
import { Form, FastField, Formik } from 'formik';
import * as Yup from 'yup';
import FormStatus from '../FormStatus';
import SelectCustomerForm from 'app/components/Select/SelectCustomer/SelectCustomerForm';

import './index.scss';
import useTrans from 'helper/useTrans';

const FormEditLadingBill = ({
    isEdit,
    initialValues,
    onSubmit
}, ref) => {

    const [trans] = useTrans();

    const validationSchema = Yup.object().shape({
    });

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            enableReinitialize
            validationSchema={validationSchema}
            innerRef={ref}
        >
            <Form className="form form-label-right form-edit-lading-bill">
                <div className="row">
                    <div className="col-lg-12">
                        <SelectCustomerForm name="customer_id" isDisabled={!isEdit} />
                    </div>
                    <div className="col-lg-12">
                        <FastField
                            name="volume"
                            component={Input}
                            label={trans("common.volume")}
                            placeholder={trans("common.volume")}
                            disabled={true}
                            shouldUpdate={() => true}
                        />
                    </div>
                    <div className="col-lg-12">
                        <FastField
                            name="weight"
                            component={Input}
                            label={trans("common.weight")}
                            placeholder={trans("common.weight")}
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

export default React.forwardRef(FormEditLadingBill);
