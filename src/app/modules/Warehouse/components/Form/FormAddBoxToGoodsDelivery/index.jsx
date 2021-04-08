import React from 'react';
import { Formik } from 'formik';
import FormContent from './FormContent';

const FormAddBoxToGoodsDelivery = ({
    onSubmit,
    initialValues = {
        lading_bill_id: '',
        boxes: []
    }
}, ref) => {
    return (
       <Formik
            onSubmit={onSubmit}
            initialValues={initialValues}
            innerRef={ref}
       >
           <FormContent />
       </Formik>
    );
};

export default React.forwardRef(FormAddBoxToGoodsDelivery);