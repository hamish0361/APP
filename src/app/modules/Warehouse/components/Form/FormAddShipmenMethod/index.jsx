import React from 'react';

import { FastField, Formik } from 'formik';
import { Input } from '_metronic/_partials/controls';
import * as Yup from 'yup';
import FormStatus from '../FormStatus';
import Form from '../FormEnterIndex';
import useTrans from 'helper/useTrans';

import './index.scss';

function FormAddShipmentMethod({
    initialValues = {
        id: '',
        name: '',
        fee: ''
    },
    onSubmit,
}, ref) {
    const [trans] = useTrans();

    const validationSchema = Yup.object().shape({
        id: Yup.string()
            .required(trans("validation.message.required")),

        name: Yup.string()
            .required(trans("validation.message.required")),
        fee: Yup.number()
            .min(1, trans("validation.message.min", { min: 1 }))
            .required(trans("validation.message.required")),
    });

    return (
        <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={onSubmit}
            innerRef={ref}
            validationSchema={validationSchema}
        >
            <Form className="form form-label-right form-add-shipment-method">

                <div className="p-3">
                    <FastField
                        name="id"
                        component={Input}
                        label={trans("warehouse.shipment_method.id")}
                        placeholder={trans("warehouse.shipment_method.id")}
                        autoComplete="off"
                    />
                </div>

                <div className="p-3">
                    <FastField
                        name="name"
                        component={Input}
                        label={trans("warehouse.shipment_method.name")}
                        placeholder={trans("warehouse.shipment_method.name")}
                        autoComplete="off"
                    />
                </div>

                <div className="p-3">
                    <FastField
                        name="fee"
                        component={Input}
                        label={trans("warehouse.shipment_method.fee")}
                        placeholder={trans("warehouse.shipment_method.fee")}
                        autoComplete="off"
                        type="number"
                    />
                </div>

                <FormStatus />
            </Form>
        </Formik>
    );
}

export default React.forwardRef(FormAddShipmentMethod);
