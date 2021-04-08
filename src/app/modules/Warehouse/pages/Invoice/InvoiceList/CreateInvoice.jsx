import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import warehouseApi from 'apis/warehouse';
import handleApiError from 'helper/handleApiError';
import convertObjectDateToString from 'helper/convertObjectDateToString';

import CustomModal from 'app/components/CustomModal';
import FormAddInvoice from '../../../components/Form/FormAddInvoice';
import { Modal } from 'react-bootstrap';
import useTrans from 'helper/useTrans';
import Button from 'app/components/Button';

const CreateInvoice = ({ show, onSuccess }) => {
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const formRef = useRef();
    const [trans] = useTrans();

    const closeModal = () => {
        history.goBack();
    };

    const handleCreateInvoice = (values, form) => {
        setLoading(true);
        warehouseApi.invoice
            .create(convertObjectDateToString(values))
            .then((res) => {
                onSuccess && onSuccess(res);
            })
            .catch(err => {
                handleApiError(err, form);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const triggerSubmit = () => {
        formRef.current.submitForm();
    }

    return (
        <CustomModal
            show={show}
            onHide={closeModal}
            actionsLoading={loading}
            title={trans("warehouse.invoice.create.title")}
        >
            <Modal.Body>
                <FormAddInvoice
                    onSubmit={handleCreateInvoice}
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

CreateInvoice.propTypes = {
    show: PropTypes.bool,
    onSuccess: PropTypes.func
};

export default CreateInvoice;
