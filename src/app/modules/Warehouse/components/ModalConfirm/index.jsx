import useTrans from 'helper/useTrans';
import React, { useImperativeHandle, useState } from 'react';

import { Modal } from 'react-bootstrap';

const ModalConfirm = ({ onHide, onOk, ...props }, ref) => {
    const [show, setShow] = useState(false);
    const [data, setData] = useState();
    const [trans] = useTrans();
    const [title, setTitle] = useState(trans("common.confirm"));

    useImperativeHandle(ref, () => ({
        open: ({ title, ...refData }) => {
            setShow(true);
            setData(refData);
            setTitle(title);
        }
    }));

    const handleConfirmed = () => {
        setShow(false);
        onOk && onOk(data);
    }

    const handleHide = () => {
        setShow(false);
        onHide && onHide(data);
    }

    return (
        <Modal
            show={show}
            onHide={handleHide}
            aria-labelledby="example-modal-sizes-title-lg"
            {...props}
        >
            <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">
                    {title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Footer>
                <div>
                    <button
                        type="button"
                        onClick={handleHide}
                        className="btn btn-light btn-elevate"
                    >
                        {trans("common.skip")}
                </button>
                    <> </>
                    <button
                        type="button"
                        onClick={handleConfirmed}
                        className="btn btn-primary btn-elevate"
                    >
                        {trans("common.confirm")}
                </button>
                </div>
            </Modal.Footer>
        </Modal>
    );
};

export default React.forwardRef(ModalConfirm);
