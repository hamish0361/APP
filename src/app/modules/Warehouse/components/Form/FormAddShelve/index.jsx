import React from 'react';

import useTrans from 'helper/useTrans';

import { Input } from '_metronic/_partials/controls';
import { FastField, Form, Formik } from 'formik';
import FormStatus from '../FormStatus';
import * as Yup from 'yup';
import SelectAreaForm from '../../SelectArea/SelectAreaForm';

import './index.scss';

const FormAddShelve = ({
    onSubmit,
    initialValues = {
        area_id: '',
        floor: 1,
        row: 1,
        column: 1
    }
}, ref) => {
    const [trans] = useTrans();

    const validationSchema = Yup.object().shape({
        area_id: Yup.string().required(trans("validation.message.required")),
        floor: Yup.number().min(1, trans("validation.message.min", { min: 1 })),
        row: Yup.number().min(1, trans("validation.message.min", { min: 1 })),
        column: Yup.number().min(1, trans("validation.message.min", { min: 1 }))
    });

    return (
        <Formik
            initialValues={initialValues}
            enableReinitialize
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            innerRef={ref}
        >
            <Form className="form-add-location">
                <div className="row">
                    <div className="col-lg-6 col-sm-12">
                        <SelectAreaForm
                            name="area_id"
                        />
                    </div>

                    <div className="col-lg-6 col-sm-12">
                        <FastField
                            name="floor"
                            label={trans("common.floor")}
                            component={Input}
                            type="number"
                        />
                    </div>

                    <div className="col-lg-6 col-sm-12">
                        <FastField
                            name="row"
                            label={trans("common.row")}
                            component={Input}
                            type="number"
                        />
                    </div>

                    <div className="col-lg-6 col-sm-12">
                        <FastField
                            name="column"
                            label={trans("common.column")}
                            component={Input}
                            type="number"
                        />
                    </div>
                </div>

                <FormStatus />
            </Form>
        </Formik>
    );
};

export default React.forwardRef(FormAddShelve);