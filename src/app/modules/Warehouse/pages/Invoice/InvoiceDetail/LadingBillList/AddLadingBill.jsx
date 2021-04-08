import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useParams } from 'react-router-dom';

import warehouseApi from 'apis/warehouse';
import handleApiError from 'helper/handleApiError';

import CustomModal from 'app/components/CustomModal';
import { Form, Formik } from 'formik';
import { Modal } from 'react-bootstrap';
import * as Yup from 'yup';
import { dialog } from 'app/components/DialogNotify';
import SelectLadingBillForm from 'app/components/Select/SelectLadingBill/SelectLadingBillForm';
import FormStatus from 'app/modules/Warehouse/components/Form/FormStatus';
import useTrans from 'helper/useTrans';
import Button from 'app/components/Button';

const AddLadingBill = ({ show, onSuccess }) => {

    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const params = useParams();
    const [trans] = useTrans();

    const addLadingBillSchema = Yup.object().shape({
        lading_bill_id: Yup.string().required(trans("validation.message.required")),
    });

    const closeModal = () => {
        history.goBack();
    }

    const handleAddLadingBill = (values, form) => {
        setLoading(true);
        warehouseApi.invoice.update(params?.id, {
            action: 'attach',
            params: JSON.stringify(['ladingBills', { lading_bill_id: values.lading_bill_id }])
        })
            .then(() => {
                closeModal();
                onSuccess && onSuccess();
                dialog.success(trans("warehouse.invoice.pivot.lading_bill.create.success"));
            })
            .catch(err => {
                handleApiError(err, form)
                dialog.success(trans("warehouse.invoice.pivot.lading_bill.create.failure"));
            })
            .finally(() => {
                setLoading(false);
            })
    }

    return (
        <CustomModal
            title={trans("warehouse.invoice.pivot.lading_bill.title")}
            show={show}
            onHide={closeModal}
            actionsLoading={loading}
        >
            <Formik
                initialValues={{ lading_bill_id: '' }}
                validationSchema={addLadingBillSchema}
                onSubmit={handleAddLadingBill}
            >
                {({ handleSubmit }) => (
                    <>
                        <Modal.Body>
                            <Form>
                                <SelectLadingBillForm
                                    name="lading_bill_id"
                                />
                            </Form>
                            <FormStatus />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button type="secondary" loading={loading} onClick={closeModal}>{trans("common.cancel")}</Button>
                            <Button type="primary" loading={loading} onClick={handleSubmit} htmlType="submit">{trans("common.save")}</Button>
                        </Modal.Footer>
                    </>
                )}
            </Formik>
        </CustomModal>
    );
};

AddLadingBill.propTypes = {
    show: PropTypes.bool,
    onSuccess: PropTypes.func
};

export default AddLadingBill;