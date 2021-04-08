import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import warehouseApi from 'apis/warehouse';
import handleApiError from 'helper/handleApiError';
import _ from 'lodash';

import CustomModal from 'app/components/CustomModal';
import { Modal } from 'react-bootstrap';
import FormAddLadingBill from '../../../components/Form/FormAddLadingBill';
import convertObjectDateToString from 'helper/convertObjectDateToString';
import { dialog } from 'app/components/DialogNotify';
import useTrans from 'helper/useTrans';
import Button from 'app/components/Button';

const CreateLadingBill = ({ show, onSuccess }) => {
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const formRef = useRef();
    const [trans] = useTrans();

    const closeModal = () => {
        history.goBack();
        formRef.current.resetForm();
    };

    const handleCreateLadingBill = async (values, form) => {

        const body = convertObjectDateToString(_.omit(values, ['boxes']));

        setLoading(true);
        warehouseApi.ladingBill.create(body)
            .then((ladingBill) => {
                return updateMultiBox(values.boxes, ladingBill)
                    .then(() => { return ladingBill });
            })
            .then((res) => {
                dialog.success(trans("warehouse.lading_bill.create.success"));
                onSuccess && onSuccess(res);
            })
            .catch((err) => {
                console.error(err, 'err')
                dialog.error(trans("warehouse.lading_bill.create.failure"));
                handleApiError(err, form);
            })
            .finally(() => {
                setLoading(false);
            })
    };

    const updateMultiBox = (boxes, ladingBill) => {

        if (!boxes?.length) return new Promise(resolve => {
            resolve(ladingBill);
        });

        return Promise.all(boxes.map(b => {
            return warehouseApi.boxLadingBill.create({
                owning_box_id: b.id,
                quantity: b.avalableQuantity,
                lading_bill_id: ladingBill.id
            })
        }))
    }

    const triggerSubmit = () => {
        formRef.current.submitForm();
    }

    return (
        <CustomModal
            show={show}
            onHide={closeModal}
            title={trans("warehouse.lading_bill.create.title")}
            actionsLoading={loading}
        >

            <Modal.Body>
                <FormAddLadingBill
                    onSubmit={handleCreateLadingBill}
                    initialValues={{
                        customer_id: '',
                        boxes: []
                    }}
                    ref={formRef}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button type="secondary" loading={loading} onClick={closeModal}>
                    {trans("common.cancel")}
                </Button>
                <Button type="primary" loading={loading} onClick={triggerSubmit}>
                    {trans("common.save")}
                </Button>
            </Modal.Footer>
        </CustomModal>
    );
};

CreateLadingBill.propTypes = {
    show: PropTypes.bool,
    onSuccess: PropTypes.func
};

export default CreateLadingBill;
