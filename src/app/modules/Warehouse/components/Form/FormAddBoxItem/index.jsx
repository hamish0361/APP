import React from 'react';

import { Form, FastField, Formik } from 'formik';
import * as Yup from 'yup';
import AddProduct from './AddProduct';
import ACProductInput from './ACProductInput';

import './index.scss';
import useTrans from 'helper/useTrans';

const FormAddBoxItem = ({
    onSubmit,
    initialValues = {
        product_id: '',
        quantity: 1
    }
}) => {

    const [trans] = useTrans();

    const validationSchema = Yup.object().shape({
        product_id: Yup.string().required(trans("validation.message.required")),
        quantity: Yup.number()
            .min(1, trans("validation.message.min", {min: 1}))
            .required(trans("validation.message.required"))
    });

    return (
        <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            {({ handleSubmit }) => (
                <>
                    <Form className="form form-label-right form-add-box-item">
                        <FastField
                            name="product_id"
                            component={ACProductInput}
                            label={<AddProduct />}
                            placeholder={trans("warehouse.jancode.id")}
                            autoComplete="off"
                            autoFocus
                        />
                    </Form>
                    <button className="btn btn-primary btn-large btn-mw-85" onClick={handleSubmit}>{trans("common.add")}</button>
                </>
            )}
        </Formik>

    );
};

FormAddBoxItem.propTypes = {};

export default React.memo(FormAddBoxItem);
