import React from 'react';

import useTrans from 'helper/useTrans';

import { DatePickerField, Input } from '_metronic/_partials/controls';
import { FastField, Form, Formik } from 'formik';
import * as Yup from 'yup';
import SelectAreaForm from '../../SelectArea/SelectAreaForm';
import FormStatus from '../FormStatus';

import './index.scss';
import SelectShipmentMethodForm from 'app/components/Select/SelectShipmentMethod/SelectShipmentMethodForm';
import Divider from 'app/components/Divider';

const FormAddInvoice = ({
    isEdit = true,
    isShowCutOff = false,
    initialValues = {
        shipping_date: new Date(),
        max_volume: 0,
        max_weight: 0,
        from_area_id: '',
        to_area_id: '',
        shipment_method_id: '',
    },
    onSubmit
}, ref) => {

    const [trans] = useTrans();

    const validationSchema = Yup.object().shape({
        shipping_date: Yup.date().required(trans("validation.message.required")),
        max_volume: Yup.number().min(0, trans("validation.message.min", {min: 0})).required(trans("validation.message.required")),
        max_weight: Yup.number().min(0, trans("validation.message.min", {min: 0})).required(trans("validation.message.required")),
        from_area_id: Yup.string().required(trans("validation.message.required")),
        to_area_id: Yup.string().required(trans("validation.message.required")),
        shipment_method_id: Yup.string().required(trans("validation.message.required")),
    });

    return (
        <Formik
            onSubmit={onSubmit}
            initialValues={initialValues}
            validationSchema={validationSchema}
            enableReinitialize
            innerRef={ref}
        >
            <Form className="form form-label-right form-add-invoce">
                <div className="row">
                    <div className="col-lg-6">
                        <SelectAreaForm
                            name="from_area_id"
                            label={trans("warehouse.invoice.from_area_id.title")}
                            disabled={!isEdit}
                        />
                    </div>

                    <div className="col-lg-6">
                        <SelectAreaForm
                            name="to_area_id"
                            label={trans("warehouse.invoice.to_area_id.title")}
                            disabled={!isEdit}
                        />
                    </div>

                    <div className="col-lg-6">
                        <SelectShipmentMethodForm
                            name="shipment_method_id"
                            disabled={!isEdit}
                        />
                    </div>

                    <Divider />

                    <div className="col-lg-6">
                        <FastField
                            name="max_volume"
                            label={trans("common.max_volume")}
                            placeholder={trans("common.max_volume")}
                            component={Input}
                            shouldUpdate={() => true}
                            disabled={!isEdit}
                            type="number"
                            min={0}
                        />
                    </div>

                    <div className="col-lg-6">
                        <FastField
                            name="max_weight"
                            label={trans("common.max_weight")}
                            placeholder={trans("common.max_weight")}
                            component={Input}
                            shouldUpdate={() => true}
                            disabled={!isEdit}
                            type="number"
                            min={0}
                        />
                    </div>

                    <Divider />


                    <div className="col-lg-6">
                        <DatePickerField
                            name="shipping_date"
                            label={trans("warehouse.invoice.shipping_date")}
                            placeholder={trans("warehouse.invoice.shipping_date")}
                            disabled={!isEdit}
                        />
                    </div>

                    <div className="col-lg-6">
                        <DatePickerField
                            name="vanning_date"
                            label={trans("warehouse.invoice.vanning_date")}
                            placeholder={trans("warehouse.invoice.vanning_date")}
                            disabled={!isEdit}
                        />
                    </div>

                    <div className="col-lg-6">
                        <DatePickerField
                            name="departure_date"
                            label={trans("warehouse.invoice.departure_date")}
                            placeholder={trans("warehouse.invoice.departure_date")}
                            disabled={!isEdit}
                        />
                    </div>

                    <div className="col-lg-6">
                        <DatePickerField
                            name="arrival_date"
                            label={trans("warehouse.invoice.arrival_date")}
                            placeholder={trans("warehouse.invoice.arrival_date")}
                            disabled={!isEdit}
                        />
                    </div>

                    {isShowCutOff && (
                        <div className="col-lg-6">
                            <DatePickerField
                                name="cut_off_date"
                                label={trans("warehouse.invoice.cut_off_date")}
                                placeholder={trans("warehouse.invoice.cut_off_date")}
                                disabled={true}
                            />
                        </div>
                    )}
                </div>

                <FormStatus />
            </Form>
        </Formik>
    );
};

export default React.forwardRef(FormAddInvoice);
