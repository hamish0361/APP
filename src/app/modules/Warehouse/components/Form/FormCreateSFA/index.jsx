import React from 'react';
import { useSelector } from 'react-redux';

import useTrans from 'helper/useTrans';

import { FastField, Formik } from 'formik';
import { Input, Select, DatePickerField } from '_metronic/_partials/controls';
import * as Yup from 'yup';
import FormStatus from '../FormStatus';
import TrackingLabel from './TrackingLabel';
import Form from '../FormEnterIndex';
import AgencyLabel from './AgencyLabel';
import TrackingInput from './TrackingInput';

import './index.scss';

function FormCreateSFA({
    editMode = false,
    formItemClass = 'col-lg-6 col-md-12',
    initialValues = {
        tracking: '',
        quantity: 0,
        shipping_inside: 0,
        arrival_date: new Date()
    },
    onSubmit,
}, ref) {
    const agencies = useSelector(state => state.warehouse.agency.list);
    const [trans] = useTrans();

    const validationSchema = Yup.object().shape({
        tracking: Yup.string()
            .required(trans("validation.message.required")),
        quantity: Yup.number()
            .min(1, trans("validation.message.min", { min: 1 }))
            .required(trans("validation.message.required")),
        shipping_inside: Yup.number()
            .min(0, trans("validation.message.min", { min: 0 })),
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
                            name="quantity"
                            component={Input}
                            label={trans("common.quantity")}
                            placeholder={trans("common.quantity")}
                            type="number"
                            shouldUpdate={(np, p) => true}
                            autoComplete="off"
                            min={0}
                        />
                    </div>

                    <div className={formItemClass}>
                        <FastField
                            name="tracking"
                            component={TrackingInput}
                            label={!editMode ? (<TrackingLabel />) : trans("ORDER.CODE_TRACKING")}
                            placeholder={trans("ORDER.CODE_TRACKING")}
                            shouldUpdate={(np, p) => true}
                            autoComplete="off"
                            disabled={editMode}
                        />
                    </div>

                    <div className={formItemClass}>
                        <FastField
                            name="shipping_inside"
                            component={Input}
                            label={trans("warehouse.cost.shipping_inside")}
                            placeholder={trans("warehouse.cost.shipping_inside")}
                            type="number"
                            shouldUpdate={(np, p) => true}
                            autoComplete="off"
                            min={0}
                        />
                    </div>
                    <div className={formItemClass}>
                        <FastField
                            name="coupon"
                            component={Input}
                            label={trans("common.coupon_code")}
                            placeholder={trans("common.coupon_code")}
                            shouldUpdate={(np, p) => true}
                            autoComplete="off"
                        />
                    </div>
                    <div className={formItemClass}>
                        <Select
                            name="agency_id"
                            label={<AgencyLabel />}
                            placeholder={trans("common.agency")}
                        >
                            {agencies.map((agency, idx) => (
                                <option
                                    value={agency.id}
                                    key={`select-option-${idx}`}
                                >
                                    {agency.name}
                                </option>
                            ))}
                        </Select>
                    </div>
                    <div className={formItemClass}>
                        <DatePickerField
                            label={trans("common.created_at")}
                            name='arrival_date'
                        />
                    </div>
                </div>
                <FormStatus />
            </Form>
        </Formik>
    );
}

export default React.forwardRef(FormCreateSFA);
