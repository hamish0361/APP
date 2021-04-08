import React, { useCallback, useImperativeHandle, useRef, useState } from 'react';

import { useHistory } from 'react-router';
import warehouseApi from 'apis/warehouse';
import handleApiError from 'helper/handleApiError';
import useTrans from 'helper/useTrans';

import { Modal } from 'react-bootstrap';
import CustomModal from 'app/components/CustomModal';
import Button from 'app/components/Button';
import FormAddArea from 'app/modules/Warehouse/components/Form/FormAddArea';
import { dialog } from 'app/components/DialogNotify';

const ModalCreateArea = ({ show, onHide, onSuccess, editMode = false, id }, ref) => {

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

        if (editMode) updateArea(values, form);
        else createArea(values, form);
    }

    const updateArea = useCallback((values, form) => {
        warehouseApi.area.update(id, values)
            .then(() => {
                dialog.success(trans("warehouse.area.update.success"));

                onSuccess && onSuccess();
                closeModal();
            })
            .catch((err) => {
                console.error(err);

                dialog.error(trans("warehouse.area.update.failure"));
                handleApiError(err, form);
            })
            .finally(() => {
                setLoading(false);
            })
    }, [id, closeModal, onSuccess, trans]);

    const createArea = useCallback((values, form) => {
        warehouseApi.area.create(values)
            .then(() => {
                dialog.success(trans("warehouse.area.create.success"));

                onSuccess && onSuccess();
                closeModal();
            })
            .catch((err) => {
                console.error(err);

                dialog.error(trans("warehouse.area.create.failure"));
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
            title={editMode ? trans("warehouse.area.update.title") : trans("warehouse.area.create.title")}
        >
            <Modal.Body>
                <FormAddArea
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

export default React.forwardRef(ModalCreateArea);