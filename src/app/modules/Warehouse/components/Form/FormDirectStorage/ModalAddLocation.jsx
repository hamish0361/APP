import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import { startPrinter } from 'app/components/PrinterModal';
import { printerTemplate } from 'helper/printerTemplateData';
import handleApiError from 'helper/handleApiError';
import warehouseApi from 'apis/warehouse';
import useTrans from 'helper/useTrans';

import CustomModal from 'app/components/CustomModal';
import { Modal, Button } from 'react-bootstrap';
import FormAddLocation from '../FormAddLocation';

const ModalAddLocation = ({ show, onHide, onSuccess }) => {

    const [loading, setLoading] = useState();
    const areaList = useSelector(state => state.warehouse.area.list);
    const history = useHistory();
    const formRef = useRef();
    const [trans] = useTrans();

    const handleSaveLocation = (values, form) => {
        setLoading(true);
        warehouseApi.location.create(values)
            .then((res) => {
                startPrinter(printerTemplate.location(res));

                onSuccess && onSuccess(res);
                closeModal();
            })
            .catch((err) => {
                console.error(err);
                handleApiError(err, form);
            })
            .finally(() => {
                setLoading(false);
            })
    }

    const closeModal = () => {
        if (onHide) onHide();
        else history.goBack();
    }

    const triggerSubmit = () => {
        formRef.current.submitForm();
    }

    return (
        <CustomModal
            show={show}
            onHide={closeModal}
            title={trans("warehouse.location.create.title")}
            actionsLoading={loading}
        >
            <Modal.Body>
                <FormAddLocation
                    initialValues={{
                        area_id: areaList?.[0]?.id,
                        shelve_id: '',
                        floor: 1,
                        row: 1,
                        column: 1
                    }}
                    onSubmit={handleSaveLocation}
                    ref={formRef}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeModal} className="btn-large">{trans("common.back")}</Button>
                <Button variant="primary" onClick={triggerSubmit} className="btn-large">{trans("common.save")}</Button>
            </Modal.Footer>
        </CustomModal>
    );
};

ModalAddLocation.propTypes = {

};

export default ModalAddLocation;