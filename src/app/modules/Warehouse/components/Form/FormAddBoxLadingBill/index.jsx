import React from 'react';

import useTrans from 'helper/useTrans';

import { Formik } from 'formik';
import * as Yup from 'yup';
import FormContent from './FormContent';

import './index.scss';

const FormAddBoxLadingBill = ({
    initialValues = {
        customer_id: '', 
        boxes: []
    },
    onSubmit
}, ref) => {
    const [trans] = useTrans();

    const validationSchema = Yup.object().shape({
        boxes: Yup.array().required(trans("validation.message.required")),
    });

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
            innerRef={ref}
            enableReinitialize
        >
            <FormContent />
        </Formik>

    );
};

export default React.forwardRef(FormAddBoxLadingBill);
