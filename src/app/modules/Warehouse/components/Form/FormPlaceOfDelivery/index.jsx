import React from 'react';

import useTrans from 'helper/useTrans';

import { Input, Textarea } from '_metronic/_partials/controls';
import { Form, FastField, Formik } from 'formik';
import * as Yup from 'yup';
import FormStatus from '../FormStatus';
import SelectProvinceForm from 'app/components/Select/SelectProvince/SelectProvinceForm';
import SelectDistrictForm from 'app/components/Select/SelectDistrict/SelectDistrictForm';
import SelectWardForm from 'app/components/Select/SelectWard/SelectWardForm';

import './index.scss';

const FormPlaceOfDelivery = ({
    initialValues = {
        consignee: '',
        tel: '',
        province_id: '',
        district_id: '',
        ward_id: '',
        address: '',
        note: ''
    },
    onSubmit,
    formItemClassName = 'col-lg-12'
}, ref) => {

    const [trans] = useTrans();

    const validationSchema = Yup.object().shape({
        consignee: Yup.string().required(trans("validation.message.required")),
        tel: Yup.string().required(trans("validation.message.required")),
        province_id: Yup.string().required(trans("validation.message.required")),
        district_id: Yup.string().required(trans("validation.message.required")),
        ward_id: Yup.string().required(trans("validation.message.required")),
        address: Yup.string().required(trans("validation.message.required")),
    });

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            enableReinitialize
            validationSchema={validationSchema}
            innerRef={ref}
        >
            <Form className="form form-label-right form-edit-lading-bill">
                <div className="row">
                    <div className={formItemClassName}>
                        <FastField
                            name="consignee"
                            component={Input}
                            label={trans("common.consignee")}
                            placeholder={trans("common.consignee")}
                            shouldUpdate={() => true}
                        />
                    </div>

                    <div className={formItemClassName}>
                        <FastField
                            name="tel"
                            component={Input}
                            label={trans("common.tel")}
                            placeholder={trans("common.tel")}
                            shouldUpdate={() => true}
                        />
                    </div>

                    <div className={formItemClassName}>
                        <SelectProvinceForm name="province_id" />
                    </div>

                    <div className={formItemClassName}>
                        <SelectDistrictForm name="district_id" />
                    </div>

                    <div className={formItemClassName}>
                        <SelectWardForm name="ward_id" />
                    </div>

                    <div className={formItemClassName}>
                        <FastField
                            name="address"
                            component={Input}
                            label={trans("common.address")}
                            placeholder={trans("common.address")}
                            shouldUpdate={() => true}
                        />
                    </div>

                    <div className={formItemClassName}>
                        <FastField
                            name="note"
                            component={Textarea}
                            label={trans("common.note")}
                            placeholder={trans("common.note")}
                            shouldUpdate={() => true}
                        />
                    </div>
                </div>

                <FormStatus />
            </Form>
        </Formik>
    );
};

export default React.forwardRef(FormPlaceOfDelivery);
