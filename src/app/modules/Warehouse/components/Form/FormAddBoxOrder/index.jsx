import React from 'react';
import { FastField, Form, Formik } from 'formik';
import { Input } from '_metronic/_partials/controls';
import * as Yup from 'yup';
import SelectObjType from './SelectObjType';
import SelectObjValue from './SelectObjValue';
import FormStatus from '../FormStatus';
import useTrans from 'helper/useTrans';
import Button from 'app/components/Button';
import clsx from 'clsx';

import './index.scss';

const FormAddBoxOrder = ({
    onSubmit,
    initialValues = {
        objectable_type: 'order',
        objectable_id: '',
        quantity: 1,
    }
}) => {

    const [trans] = useTrans();

    const validationSchema = Yup.object().shape({
        objectable_id: Yup.string().required(trans("validation.message.required")),
        objectable_type: Yup.string().required(trans("validation.message.required")),
        quantity: Yup.number()
            .required(trans("validation.message.required"))
            .min(1, trans("validation.message.min", { min: 1 })),
    });

    return (
        <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            {({ handleSubmit, values }) => (
                <Form className={clsx("form-add-order row", values.objectable_type === 'order' && 'mb-item')}>
                    <div className={`col-lg-${values.objectable_type === 'user' ? 8 : 4} col-md-6 col-sm-12`}>
                        <SelectObjType name="objectable_type" />
                    </div>
                    <div className={clsx("col-lg-4 col-md-6 col-sm-12", values.objectable_type === 'user' && 'd-none')}>
                        <SelectObjValue name="objectable_id" />
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-12">
                        <FastField
                            name="quantity"
                            label={trans("common.quantity")}
                            component={Input}
                            type="number"
                            min={1}
                        />
                    </div>

                    <FormStatus />

                    <div className="action-submit text-right mt-3 w-100">
                        <Button type="primary" onClick={handleSubmit} need={['owning-boxes.create']}>{trans("common.add")}</Button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

FormAddBoxOrder.propTypes = {

};

export default FormAddBoxOrder;