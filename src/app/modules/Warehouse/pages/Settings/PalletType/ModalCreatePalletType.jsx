import React, { useImperativeHandle, useRef, useState } from 'react';
import { useHistory } from 'react-router';

import useTrans from 'helper/useTrans';
import warehouseApi from 'apis/warehouse';

import CustomModal from 'app/components/CustomModal';
import { Modal } from 'react-bootstrap';
import FormAddPalletType from 'app/modules/Warehouse/components/Form/FormAddPalletType';
import { dialog } from 'app/components/DialogNotify';
import handleApiError from 'helper/handleApiError';
import Button from 'app/components/Button';

const ModalCreatePalletType = ({ show, onHide, onSuccess, editMode = false, id }, ref) => {

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
        if (editMode) updatePalletType(values, form);
        else createPalletType(values, form);
    }

    const createPalletType = (values, form) => {

        setLoading(true);

        warehouseApi.palletType.create(values)
            .then(() => {
                dialog.success(trans("warehouse.pallet_type.create.success"));

                onSuccess && onSuccess();
                closeModal();
            })
            .catch((err) => {
                dialog.error(trans("warehouse.pallet_type.create.failure"));

                handleApiError(err, form);
            })
            .finally(() => {
                setLoading(false);
            })
    }

    const updatePalletType = (values, form) => {

        setLoading(true);

        warehouseApi.palletType.update(id, values)
            .then(() => {
                dialog.success(trans("warehouse.pallet_type.update.success"));

                onSuccess && onSuccess();
                closeModal();
            })
            .catch((err) => {
                dialog.error(trans("warehouse.pallet_type.update.failure"));

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
            title={!editMode ? trans("warehouse.pallet_type.create.title") : trans("warehouse.pallet_type.update.title")}
            actionsLoading={loading}
        >
            <Modal.Body>
                <FormAddPalletType
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

export default React.forwardRef(ModalCreatePalletType);