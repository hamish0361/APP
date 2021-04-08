import React, { useImperativeHandle, useState } from 'react';
import CustomModal from 'app/components/CustomModal';
import { Button, Modal } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import './ModalNotEnoughVolume.scss';
import useTrans from 'helper/useTrans';

const ModalNotEnoughVolume = ({ onOk = () => null }, ref) => {

    const [show, setShow] = useState(false);
    const [data, setData] = useState();
    const params = useParams();
    const [trans] = useTrans();

    useImperativeHandle(ref, () => ({
        toggle: (newChildId) => {
            setShow(!show);
            setData(newChildId);
        }
    }));

    const toggleModal = () => setShow(!show);

    const handleOk = () => {
        toggleModal();
        onOk(data);
    }

    return (
        <CustomModal className="modal-not-enough-volume" title={trans("common.confirm")} show={show} onHide={toggleModal}>
            <Modal.Body>
                <p
                    dangerouslySetInnerHTML={{
                        __html: trans("warehouse.sku.child.add.over_volume.question",
                            { box_id: params?.box_id, child_id: data?.id || '' })
                    }}
                ></p>
                <p>{trans("warehouse.sku.child.add.over_volume.continue")}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={toggleModal} className="btn-large">{trans("common.cancel")}</Button>
                <Button variant="primary" onClick={handleOk} className="btn-large">{trans("common.ok")}</Button>
            </Modal.Footer>
        </CustomModal>
    );
};

export default React.forwardRef(ModalNotEnoughVolume);