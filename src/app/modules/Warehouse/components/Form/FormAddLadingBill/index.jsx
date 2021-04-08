import React from 'react';

import { Formik } from 'formik';
import * as Yup from 'yup';

import './index.scss';
import useTrans from 'helper/useTrans';
import FormContent from './FormContent';

const FormAddLadingBill = ({
    onSubmit,
    initialValues = {
        customer_id: '',
        boxes: []
    }
}, ref) => {
    
    const [trans] = useTrans();

    const validationSchema = Yup.object().shape({
        customer_id: Yup.string().required(trans("validation.message.required")),
    });

    return (
        <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            innerRef={ref}
        >
            <FormContent />
        </Formik>
    );
};

export default React.forwardRef(FormAddLadingBill);
