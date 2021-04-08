import React from 'react';
import { Form, useFormikContext } from 'formik';
import SelectLadingBillForm from 'app/components/Select/SelectLadingBill/SelectLadingBillForm';
import ListBox from './ListBox';
import useBoxLadingBill from './useBoxLadingBill';

const FormContent = props => {

    const { values } = useFormikContext();
    const { pagination, loading, boxes, setPage } = useBoxLadingBill(values.lading_bill_id);

    return (
        <Form className="form form-add-box-to-lading-bill">
            <SelectLadingBillForm name="lading_bill_id" />

            <ListBox boxes={boxes} loading={loading} pagination={pagination} onChangePage={setPage} />
        </Form>
    );
};

FormContent.propTypes = {

};

export default FormContent;