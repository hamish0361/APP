import React from 'react';

import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import FormStatus from '../FormStatus';
import useTrans from 'helper/useTrans';
import Button from 'app/components/Button';

export const receiptSchema = Yup.object().shape({
    file: Yup.object().required('Required'),
});

const FormAddReceipt = ({ initialValues = { file: '' }, onSubmit, closeSection }) => {

    const [trans] = useTrans();

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
        >
            {({ handleSubmit, setFieldValue, values }) => (
                <>
                    <Form className="form form-label-right form-add-receipt">

                        <div className="form-group">
                            <label htmlFor="">{trans("warehouse.receipt.file")}</label>
                            <div className="custom-file">
                                <input name="file" type="file" className="custom-file-input" id="customFile" onChange={(e) => setFieldValue("file", e.currentTarget.files[0])} />
                                <label className="custom-file-label" htmlFor="customFile">{values?.file?.name || trans("common.choose_file")}</label>
                            </div>
                        </div>

                        <FormStatus />
                    </Form >

                    <div className="form-actions">
                        <button className="btn btn-secondary" onClick={closeSection}>{trans("common.close")}</button>
                        <Button
                            type="primary"
                            onClick={handleSubmit}
                            need={['receipts.create']}
                            className="ml-3"
                        >
                            {trans("common.save")}
                        </Button>
                    </div>
                </>
            )}
        </Formik>

    );
};

export default FormAddReceipt;
