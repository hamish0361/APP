import React from 'react';

import { FastField, Formik } from 'formik';
import { Input } from '_metronic/_partials/controls';
import * as Yup from 'yup';
import FormStatus from '../FormStatus';
import Form from '../FormEnterIndex';
import useTrans from 'helper/useTrans';

import './index.scss';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

function FormAddAgency({
    formItemClass = 'col-lg-12 col-md-12 col-sm-12',
    initialValues = {
        name: '',
        address: '',
        tel: '',
    },
    onSubmit,
}, ref) {
    const [trans] = useTrans();

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required(trans("validation.message.required")),
        address: Yup.string()
            .required(trans("validation.message.required")),
        tel: Yup.string()
            .matches(phoneRegExp, trans("validation.message.invalid_phone_number"))
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
            <Form className="form form-label-right form-add-agency">
                <div className="form-group row">
                    <div className={formItemClass}>
                        <FastField
                            name="name"
                            component={Input}
                            label={trans("warehouse.agency.name")}
                            placeholder={trans("warehouse.agency.name")}
                            autoComplete="off"
                        />
                    </div>

                    <div className={formItemClass}>
                        <FastField
                            name="address"
                            component={Input}
                            label={trans("warehouse.agency.address")}
                            placeholder={trans("warehouse.agency.address")}
                            autoComplete="off"
                        />
                    </div>

                    <div className={formItemClass}>
                        <FastField
                            name="tel"
                            component={Input}
                            label={trans("warehouse.agency.tel")}
                            placeholder={trans("warehouse.agency.tel")}
                            autoComplete="off"
                        />
                    </div>
                </div>
                
                <FormStatus />
            </Form>
        </Formik>
    );
}

export default React.forwardRef(FormAddAgency);
