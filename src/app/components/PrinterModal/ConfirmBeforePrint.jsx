import React, { useImperativeHandle, useRef, useState } from 'react';

import useTrans from 'helper/useTrans';

import { Button, Modal } from 'react-bootstrap';
import CustomModal from '../CustomModal';
import FormConfirmBeforePrint from '../Form/FormConfirmBeforePrint';

const ConfirmBeforePrint = ({ onOK }, ref) => {

    const [show, setShow] = useState(false);
    const [data, setData] = useState();
    const formRef = useRef();
    const [trans] = useTrans();

    const toggleModal = () => setShow(!show);

    useImperativeHandle(ref, () => ({
        open: (newData) => {

            let parsedData = JSON.parse(newData);

            if (parsedData.startIndex == parsedData.quantity) { // eslint-disable-line
                onOK && onOK(newData)
            } else {
                setData(JSON.parse(newData));
                setShow(true);
            }
        }
    }));

    const handleSubmitData = (values) => {
        onOK && onOK(JSON.stringify({ ...values, quantity: values.quantity.toString(), startIndex: values.startIndex.toString() }));
        toggleModal();
    }

    const handleConfirm = () => {
        formRef.current.submitForm();
    }

    return (
        <CustomModal
            show={show}
            title={trans("printer.confirm.quantity_before_print")}
            onHide={toggleModal}
        >
            <Modal.Body>
                <FormConfirmBeforePrint
                    initialValues={data}
                    onSubmit={handleSubmitData}
                    ref={formRef}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={toggleModal}>{trans("common.cancel")}</Button>
                <Button onClick={handleConfirm}>{trans("common.ok")}</Button>
            </Modal.Footer>
        </CustomModal>
    );
};

export default React.forwardRef(ConfirmBeforePrint);