import React from 'react';

import { FastField, Formik } from 'formik';
import { Input } from '_metronic/_partials/controls';
import * as Yup from 'yup';
import FormStatus from '../FormStatus';
import Form from '../FormEnterIndex';
import useTrans from 'helper/useTrans';

import './index.scss';

function FormAddPalletType({
    formItemClass = 'col-lg-12 col-md-12 col-sm-12',
    initialValues = {
        weight: 1,
        max_width: 1,
        max_height: 1,
        max_length: 1,
        max_weight: 1
    },
    onSubmit,
}, ref) {
    const [trans] = useTrans();

    const validationSchema = Yup.object().shape({
        weight: Yup.number()
            .min(0, trans("validation.message.min", { min: 0 }))
            .required(trans("validation.message.required")),
        max_width: Yup.number()
            .min(0, trans("validation.message.min", { min: 0 }))
            .required(trans("validation.message.required")),
        max_height: Yup.number()
            .min(0, trans("validation.message.min", { min: 0 }))
            .required(trans("validation.message.required")),
        max_length: Yup.number()
            .min(0, trans("validation.message.min", { min: 0 }))
            .required(trans("validation.message.required")),
        max_weight: Yup.number()
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
            <Form className="form form-label-right form-add-pallet-box">
                <div className="form-group row">
                    <div className={formItemClass}>
                        <FastField
                            name="weight"
                            component={Input}
                            label={trans("common.weight")}
                            placeholder={trans("common.weight")}
                            type="number"
                            autoComplete="off"
                            min={0}
                        />
                    </div>

                    <div className={formItemClass}>
                        <FastField
                            name="max_width"
                            component={Input}
                            label={trans("common.width")}
                            placeholder={trans("common.width")}
                            type="number"
                            autoComplete="off"
                            min={0}
                        />
                    </div>

                    <div className={formItemClass}>
                        <FastField
                            name="max_height"
                            component={Input}
                            label={trans("common.height")}
                            placeholder={trans("common.height")}
                            type="number"
                            autoComplete="off"
                            min={0}
                        />
                    </div>

                    <div className={formItemClass}>
                        <FastField
                            name="max_length"
                            component={Input}
                            label={trans("common.length")}
                            placeholder={trans("common.length")}
                            type="number"
                            autoComplete="off"
                            min={0}
                        />
                    </div>

                    <div className={formItemClass}>
                        <FastField
                            name="max_weight"
                            component={Input}
                            label={trans("common.max_weight")}
                            placeholder={trans("common.max_weight")}
                            type="number"
                            autoComplete="off"
                            min={0}
                        />
                    </div>
                </div>
                <FormStatus />
            </Form>
        </Formik>
    );
}

export default React.forwardRef(FormAddPalletType);
