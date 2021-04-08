import React from 'react';

import { FastField, Form, Formik } from 'formik';
import * as Yup from 'yup';
import useTrans from 'helper/useTrans';

import './index.scss';
import { Input } from '_metronic/_partials/controls';
import SelectDeliveryPartnersForm from 'app/components/Select/SelectDeliveryPartner/SelectDeliveryPartnerForm';
import SelectGoodsDeliveryStatusForm from 'app/components/Select/SelectGoodsDeliveryStatus/SelectGoodsDeliveryStatusForm';
import SelectPlaceOfDeliveryForm from 'app/components/Select/SelectPlaceOfDelivery/SelectPlaceOfDeliveryForm';

const FormAddGoodsDelivery = ({
    onSubmit,
    initialValues = {
        partner_id: '',
        status_id: 'waiting_shipment',
        shipping_cost: 0,
        place_of_delivery_id: ''
    },
    isEdit = true,
    formItemClassName = "col-lg-6 col-sm-12",
    showStatus = true
}, ref) => {

    const [trans] = useTrans();

    const validationSchema = Yup.object().shape({
        status_id: Yup.string().required(trans("validation.message.required")),
        shipping_cost: Yup.number().required(trans("validation.message.required")),
        place_of_delivery_id: Yup.string().required(trans("validation.message.required"))
    });

    return (
        <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            innerRef={ref}
        >
            <Form className="form form-add-goods-delivery row">
                <div className={formItemClassName}>
                    <SelectDeliveryPartnersForm name="partner_id" isDisabled={!isEdit} />
                </div>
                {showStatus && (
                    <div className={formItemClassName}>
                        <SelectGoodsDeliveryStatusForm name="status_id" isDisabled={!isEdit} />
                    </div>
                )}
                <div className={formItemClassName}>
                    <SelectPlaceOfDeliveryForm name="place_of_delivery_id" isDisabled={!isEdit} />
                </div>

                <div className={formItemClassName}>
                    <FastField
                        name="shipping_cost"
                        component={Input}
                        placeholder={trans("warehouse.cost.shipping")}
                        type="number"
                        label={trans("warehouse.cost.shipping")}
                        shouldUpdate={() => true}
                        disabled={!isEdit}
                        min={0}
                    />
                </div>
            </Form>
        </Formik>
    );
};

export default React.forwardRef(FormAddGoodsDelivery);
