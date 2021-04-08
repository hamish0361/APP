import React from 'react';

import useTrans from 'helper/useTrans';

import { Input } from '_metronic/_partials/controls';
import { FastField, Formik } from 'formik';
import Form from '../FormEnterIndex';
import FormStatus from '../FormStatus';
import * as Yup from 'yup';
import SelectDateOfWeekForm from 'app/components/Select/SelectDateOfWeek/SelectDateOfWeekForm';
import SelectShipmentMethodForm from 'app/components/Select/SelectShipmentMethod/SelectShipmentMethodForm';
import SelectAreaForm from '../../SelectArea/SelectAreaForm';

import './index.scss';

const FormAddContainerType = ({
    onSubmit,
    initialValues = {
        shipment_method_id: '',
        volume: 1,
        weight: 1,
        day_of_week: 2,
        to_area_id: ''
    }
}, ref) => {
    const [trans] = useTrans();

    const validationSchema = Yup.object().shape({
        shipment_method_id: Yup.string().required(trans("validation.message.required")),
        volume: Yup.number().min(1, trans("validation.message.min", { min: 1 })).required(trans("validation.message.required")),
        weight: Yup.number().min(1, trans("validation.message.min", { min: 1 })).required(trans("validation.message.required")),
        day_of_week: Yup.number().required(trans("validation.message.required")),
        to_area_id: Yup.string().required(trans("validation.message.required"))
    });

    return (
        <Formik
            initialValues={initialValues}
            enableReinitialize
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            innerRef={ref}
        >
            <Form className="form-add-container-type">
                <div className="row">
                    <div className="col-lg-6 col-sm-12">
                        <SelectShipmentMethodForm
                            name="shipment_method_id"
                        />
                    </div>

                    <div className="col-lg-6 col-sm-12">
                        <SelectDateOfWeekForm name="day_of_week" />
                    </div>

                    <div className="col-lg-6 col-sm-12">
                        <SelectAreaForm name="to_area_id" label={trans("warehouse.container_type.to_area")} />
                    </div>

                    <div className="col-lg-6 col-sm-12">
                        <FastField
                            name="volume"
                            label={trans("common.volume")}
                            component={Input}
                            type="number"
                        />
                    </div>

                    <div className="col-lg-6 col-sm-12">
                        <FastField
                            name="weight"
                            label={trans("common.weight")}
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

export default React.forwardRef(FormAddContainerType);