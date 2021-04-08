import React from 'react';

import { FastField, Formik } from 'formik';
import { Input } from '_metronic/_partials/controls';
import * as Yup from 'yup';
import FormStatus from '../FormStatus';
import Form from '../FormEnterIndex';
import useTrans from 'helper/useTrans';

import './index.scss';

function FormAddArea({
    initialValues = {
        name: '',
        id: ''
    },
    onSubmit,
}, ref) {
    const [trans] = useTrans();

    const validationSchema = Yup.object().shape({
        id: Yup.number()
            .required(trans("validation.message.required")),

        name: Yup.string()
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
            <Form className="form form-label-right form-add-delivery-partner">
                <div className="p-3">
                    <FastField
                        name="id"
                        component={Input}
                        label={trans("warehouse.delivery_partner.id")}
                        placeholder={trans("warehouse.delivery_partner.id")}
                        autoComplete="off"
                        type="number"
                    />
                </div>

                <div className="p-3">
                    <FastField
                        name="name"
                        component={Input}
                        label={trans("warehouse.delivery_partner.name")}
                        placeholder={trans("warehouse.delivery_partner.name")}
                        autoComplete="off"
                    />
                </div>

                <FormStatus />
            </Form>
        </Formik>
    );
}

export default React.forwardRef(FormAddArea);
