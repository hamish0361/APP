import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router';

import useTrans from 'helper/useTrans';

import CustomModal from 'app/components/CustomModal';
import { Button, Modal } from 'react-bootstrap';

import './index.scss';

const ModalConfirmNextStep = () => {

    const [show, setShow] = useState(false);
    const [data, setData] = useState({});
    const [trans] = useTrans();
    const history = useHistory();

    const openModal = useCallback((evt) => {
        let { totalSku, quantity } = evt.detail;

        setShow(true);
        setData({ totalSku, quantity });
    }, []);

    useEffect(() => {
        window.addEventListener('checking-box-return-wrong-quantity', openModal);

        return () => {
            window.removeEventListener('checking-box-return-wrong-quantity', openModal);
        }
    }, [openModal]);

    const toggleModal = () => { setShow(!show) }

    const handleOK = () => {
        toggleModal();

        history.goBack();
    }

    return (
        <CustomModal
            show={show}
            onHide={toggleModal}
            title={trans("warehouse.io.confirm.data.sfa_sku.wrong")}
            className="modal-confirm-next-step"
        >
            <Modal.Body>
                <div className="confirm-data">
                    <span className="text-danger">{data?.totalSku}</span> / <span className="text-success">{data?.quantity}</span>
                </div>

                <div className="actions">
                    <Button variant="secondary" onClick={toggleModal}>{trans("common.continue")}</Button>
                    <Button variant="primary" onClick={handleOK}>{trans("common.back")}</Button>
                </div>
            </Modal.Body>
        </CustomModal>
    );
};

export default ModalConfirmNextStep;

export const confirmStep2 = dataSend => {
    var evt = new CustomEvent('checking-box-return-wrong-quantity', {
        detail: dataSend,
    });
    window.dispatchEvent(evt);
};