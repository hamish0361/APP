import React, { useImperativeHandle, useRef, useState } from 'react';
import { useHistory } from 'react-router';

import useTrans from 'helper/useTrans';
import warehouseApi from 'apis/warehouse';

import CustomModal from 'app/components/CustomModal';
import { Modal } from 'react-bootstrap';
import { dialog } from 'app/components/DialogNotify';
import handleApiError from 'helper/handleApiError';
import FormAddShipmenMethod from 'app/modules/Warehouse/components/Form/FormAddShipmenMethod';
import Button from 'app/components/Button';

const ModalCreateShipmentMethod = ({ show, onHide, onSuccess, editMode = false, id }, ref) => {

    const [loading, setLoading] = useState();
    const [initialValues, setInitialValues] = useState();
    const [trans] = useTrans();
    const history = useHistory();
    const formRef = useRef();

    useImperativeHandle(ref, () => ({
        setInitialData: (data) => {
            setInitialValues(data)
        }
    }));

    const closeModal = () => {
        if (onHide) onHide();
        else history.goBack();
    }

    const handleSubmit = (values, form) => {
        if (editMode) updateShipmentMethod(values, form);
        else createShipmentMethod(values, form);
    }

    const createShipmentMethod = (values, form) => {

        setLoading(true);

        warehouseApi.shipmentMethod.create(values)
            .then(() => {
                dialog.success(trans("warehouse.shipment_method.create.success"));

                onSuccess && onSuccess();
                closeModal();
            })
            .catch((err) => {
                dialog.error(trans("warehouse.shipment_method.create.failure"));

                handleApiError(err, form);
            })
            .finally(() => {
                setLoading(false);
            })
    }

    const updateShipmentMethod = (values, form) => {

        setLoading(true);

        warehouseApi.shipmentMethod.update(id, values)
            .then(() => {
                dialog.success(trans("warehouse.shipment_method.update.success"));

                onSuccess && onSuccess();
                closeModal();
            })
            .catch((err) => {
                dialog.error(trans("warehouse.shipment_method.update.failure"));

                handleApiError(err, form);
            })
            .finally(() => {
                setLoading(false);
            })
    }

    const triggerSubmit = () => {
        formRef.current.submitForm();
    }

    return (
        <CustomModal
            show={show}
            onHide={closeModal}
            title={!editMode ? trans("warehouse.shipment_method.create.title") : trans("warehouse.shipment_method.update.title")}
            actionsLoading={loading}
        >
            <Modal.Body>
                <FormAddShipmenMethod
                    formItemClass="col-lg-4 col-md-6 col-sm-12"
                    ref={formRef}
                    onSubmit={handleSubmit}
                    initialValues={initialValues}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button type="secondary" loading={loading} onClick={closeModal}>{trans("common.cancel")}</Button>
                <Button type="primary" loading={loading} onClick={triggerSubmit}>{trans("common.save")}</Button>
            </Modal.Footer>
        </CustomModal>
    );
};

export default React.forwardRef(ModalCreateShipmentMethod);