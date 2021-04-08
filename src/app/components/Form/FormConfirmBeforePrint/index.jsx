import React from 'react';

import { FastField, Formik, Form } from 'formik';
import { Input } from '_metronic/_partials/controls';
import * as Yup from 'yup';

import useTrans from 'helper/useTrans';

function FormConfirmBeforePrint({
    formItemClass = 'col-lg-6 col-md-12',
    initialValues = {},
    onSubmit,
}, ref) {
    const [trans] = useTrans();

    const validationSchema = Yup.object().shape({
        quantity: Yup.number()
            .min(1, trans("validation.message.min", { min: 1 }))
            .required(trans("validation.message.required")),
        startIndex: Yup.number()
            .min(0, trans("validation.message.min", { min: 0 }))
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
            <Form className="form form-label-right form-create-sfa">
                <div className="form-group row">
                    <div className={formItemClass}>
                        <FastField
                            name="startIndex"
                            component={Input}
                            label={trans("common.start_index")}
                            placeholder={trans("common.start_index")}
                            type="number"
                            autoComplete="off"
                            min={0}
                        />
                    </div>

                    <div className={formItemClass}>
                        <FastField
                            name="quantity"
                            component={Input}
                            label={trans("common.quantity")}
                            placeholder={trans("common.quantity")}
                            type="number"
                            autoComplete="off"
                            min={0}
                        />
                    </div>
                </div>
            </Form>
        </Formik>
    );
}

export default React.forwardRef(FormConfirmBeforePrint);
