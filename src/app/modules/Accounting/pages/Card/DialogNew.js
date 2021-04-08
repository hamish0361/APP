import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { ModalBody } from 'react-bootstrap';
import Select from 'react-select';
import {
    Button,
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
    banks: PropTypes.array,

    show: PropTypes.bool
};

function DialogNew({ onHide, onNewSubmit, show, banks, intl }) {
    const [values, setValues] = useState({
        name: '',
        code: ''
    });
    const [selectedBank, setSelectedBank] = useState(null);

    const handleInputChange = e => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        });
    };

    const handleBankSelect = selectedBank => {
        setSelectedBank(selectedBank);
    };

    // submit
    const handleNewSubmit = e => {
        const params = {
            name: values.name,
            code: values.code,
            bankId: selectedBank?.value || bankOptions[0].value
        };
        if (onNewSubmit) onNewSubmit(params);
    };

    const bankOptions = banks?.map(bank => {
        return {
            value: bank.id,
            label: bank.name
        };
    });

    return (
        <Modal
            returnFocusAfterClose={true}
            isOpen={show}
            className="warehouse-modal"
        >
            <ModalHeader>Tạo thẻ</ModalHeader>
            <ModalBody>
                <FormGroup>
                    <Label className="font-size-h6 text-dark">
                        {intl.formatMessage({
                            id: 'ACCOUNTING.CARD.TOPFILTER.ID'
                        })}
                    </Label>
                    <Input
                        name="code"
                        onChange={handleInputChange}
                        placeholder="Nhập ID thẻ"
                    />
                </FormGroup>
                <FormGroup>
                    <Label className="font-size-h6 text-dark">
                        {' '}
                        {intl.formatMessage({
                            id: 'ACCOUNTING.CARD.TOPFILTER.NAME'
                        })}
                    </Label>
                    <Input
                        name="name"
                        onChange={handleInputChange}
                        placeholder="Nhập tên thẻ"
                    />
                </FormGroup>
                <FormGroup>
                    <Label className="font-size-h6 text-dark">
                        {' '}
                        {intl.formatMessage({
                            id: 'ACCOUNTING.CARD.TOPFILTER.BANK'
                        })}
                    </Label>
                    <Select
                        options={bankOptions}
                        defaultValue={bankOptions[0]}
                        name="bank"
                        onChange={handleBankSelect}
                    />
                </FormGroup>
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
                    {intl.formatMessage({
                        id: 'GLOBAL.BUTTON.CANCEL'
                    })}
                </Button>
                <Button
                    color="primary"
                    type="submit"
                    className="font-weight-bolder"
                    onClick={handleNewSubmit}
                >
                    {intl.formatMessage({
                        id: 'GLOBAL.BUTTON.CREATE'
                    })}
                </Button>
            </ModalFooter>
        </Modal>
    );
}

export default DialogNew;
