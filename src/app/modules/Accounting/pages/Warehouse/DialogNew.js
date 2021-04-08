import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { ModalBody } from 'react-bootstrap';
import Select from 'react-select';
import {
    Button,
    Form,
    FormGroup,
    Input,
    Label,
    Modal,
    ModalFooter,
    ModalHeader
} from 'reactstrap';

DialogNew.propTypes = {
    onHide: PropTypes.func,
    onNewSubmit: PropTypes.func,

    show: PropTypes.bool
};

function DialogNew({ onHide, onNewSubmit, show }) {
    const [values, setValues] = useState({
        name: '',
        code: '',
        bank: ''
    });

    const handleInputChange = e => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        });
    };

    const handleBankSelect = () => {};

    // submit
    const handleNewSubmit = e => {
        const params = {
            name: values.name,
            code: values.code,
            bank: values.bank
        };
        if (onNewSubmit) onNewSubmit(params);
    };

    return (
        <Modal
            returnFocusAfterClose={true}
            isOpen={show}
            className="warehouse-modal"
        >
            <ModalHeader>Tạo thẻ</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label className="font-size-h6 text-dark">ID</Label>
                        <Input
                            name="code"
                            onChange={handleInputChange}
                            placeholder="Nhập ID thẻ"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label className="font-size-h6 text-dark">
                            Tên thẻ
                        </Label>
                        <Input
                            name="name"
                            onChange={handleInputChange}
                            placeholder="Nhập tên thẻ"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label className="font-size-h6 text-dark">
                            Ngân hàng
                        </Label>
                        <Select name="bank" onChange={handleBankSelect} />
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button
                    onClick={onHide}
                    className="font-weight-bolder"
                    style={{
                        color: 'white',
                        width: '75px',
                        backgroundColor: '#6c757d',
                        borderColor: '#6c757d'
                    }}
                >
                    Huỷ
                </Button>
                <Button
                    color="primary"
                    type="submit"
                    className="font-weight-bolder"
                    onClick={handleNewSubmit}
                >
                    Tạo mới
                </Button>
            </ModalFooter>
        </Modal>
    );
}

export default DialogNew;
