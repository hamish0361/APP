import React, { useCallback, useImperativeHandle, useRef, useState } from 'react';

import { useHistory } from 'react-router';
import warehouseApi from 'apis/warehouse';
import handleApiError from 'helper/handleApiError';
import useTrans from 'helper/useTrans';

import { Modal } from 'react-bootstrap';
import CustomModal from 'app/components/CustomModal';
import Button from 'app/components/Button';
import FormAddShelve from 'app/modules/Warehouse/components/Form/FormAddShelve';
import { dialog } from 'app/components/DialogNotify';

const ModalCreateShelve = ({ show, onHide, onSuccess, editMode = false, id }, ref) => {

    const [loading, setLoading] = useState(false);
    const [initialValues, setInitialValues] = useState();
    const [trans] = useTrans();
    const history = useHistory();
    const formRef = useRef();

    useImperativeHandle(ref, () => ({
        setInitialData: (data) => {
            setInitialValues(data)
        }
    }));

    const closeModal = useCallback(() => {
        if (onHide) onHide();
        else history.goBack();
    }, [history, onHide]);

    const triggerSubmit = useCallback(() => {
        formRef.current.submitForm();
    }, [formRef]);

    const handleSubmit = (values, form) => {
        setLoading(true);

        if (editMode) updateShelve(values, form);
        else createShelve(values, form);
    }

    const updateShelve = useCallback((values, form) => {
        warehouseApi.shelve.update(id, values)
            .then(() => {
                dialog.success(trans("warehouse.shelve.update.success"));

                onSuccess && onSuccess();
                closeModal();
            })
            .catch((err) => {
                console.error(err);

                dialog.error(trans("warehouse.shelve.update.failure"));
                handleApiError(err, form);
            })
            .finally(() => {
                setLoading(false);
            })
    }, [id, closeModal, onSuccess, trans]);

    const createShelve = useCallback((values, form) => {
        warehouseApi.shelve.create(values)
            .then(() => {
                dialog.success(trans("warehouse.shelve.create.success"));

                onSuccess && onSuccess();
                closeModal();
            })
            .catch((err) => {
                console.error(err);

                dialog.error(trans("warehouse.shelve.create.failure"));
                handleApiError(err, form);
            })
            .finally(() => {
                setLoading(false);
            })
    }, [onSuccess, closeModal, trans]);

    return (
        <CustomModal
            show={show}
            onHide={closeModal}
            actionsLoading={loading}
            title={trans("warehouse.shelve.create.title")}
        >
            <Modal.Body>
                <FormAddShelve
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    ref={formRef}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button type="secondary" onClick={closeModal}>{trans("common.cancel")}</Button>
                <Button type="primary" onClick={triggerSubmit} loading={loading}>{trans("common.save")}</Button>
            </Modal.Footer>
        </CustomModal>
    );
};

export default React.forwardRef(ModalCreateShelve);