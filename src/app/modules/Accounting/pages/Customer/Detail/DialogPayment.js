import { dialog } from 'app/components/DialogNotify';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { ModalBody } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { shallowEqual, useSelector } from 'react-redux';
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

DialogPayment.propTypes = {
    onHide: PropTypes.func,
    onNewSubmit: PropTypes.func,

    show: PropTypes.bool
};

function DialogPayment({ onHide, onNewSubmit, show, intl }) {
    const { cardList } = useSelector(
        ({ accounting }) => ({
            cardList: accounting.card.list
        }),
        shallowEqual
    );
    const [values, setValues] = useState({
        cardSelected: null,
        amount: 0,
        description: '',
        file: '',
        typeSelected: null
    });

    // input change
    const handleInputChange = e => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        });
    };

    // select
    const handleTypeSeleted = typeSelected => {
        setValues({
            ...values,
            typeSelected
        });
    };

    const handleCardSelected = cardSelected => {
        setValues({
            ...values,
            cardSelected
        });
    };

    // submit
    const handleNewSubmit = () => {
        const formData = new FormData();
        formData.append('path_file', values.file);
        formData.append('name', values.file.name);
        const params = {
            amount: values.amount,
            description: values.description,
            card: values.cardSelected?.value || methodOptions[0]?.value,
            file: formData,
            type: values.typeSelected?.value || typeOptions[0]?.value
        };
        if (!values.amount) {
            dialog.warning('Vui lòng Nhập số tiền');
        } else {
            onHide();
            resetForm();
            onNewSubmit(params);
        }
    };

    const resetForm = () => {
        setValues({
            userSelected: null,
            cardSelected: null,
            amount: 0,
            description: '',
            file: '',
            typeSelected: null
        });
    };

    //file
    const handleFileChange = e => {
        setValues({
            ...values,
            file: e.target.files[0]
        });
    };

    // options
    const typeOptions = [
        { value: 'deposit_jpy', label: 'Deposit ¥' },
        { value: 'deposit_vnd', label: 'Deposit ₫' }
    ];

    const methodOptions = cardList?.map(item => {
        return {
            value: item.id,
            label: item.name
        };
    });

    return (
        <Modal
            returnFocusAfterClose={true}
            isOpen={show}
            className="warehouse-modal"
        >
            <ModalHeader>
                <FormattedMessage id="ACCOUNTING.PAYMENT.TITLE" />
            </ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label className="font-size-h6 text-dark">
                            <FormattedMessage id="ACCOUNTING.PAYMENT.TRANSACTION_TYPE" />
                        </Label>
                        <Select
                            options={typeOptions}
                            defaultValue={typeOptions[0]}
                            onChange={handleTypeSeleted}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label className="font-size-h6 text-dark">
                            <FormattedMessage id="ACCOUNTING.AMOUNT" />
                        </Label>
                        <Input
                            name="amount"
                            type="number"
                            min="1"
                            value={values.amount}
                            onChange={handleInputChange}
                            placeholder={intl.formatMessage({
                                id: 'GLOBAL.PLACEHOLER.INPUT'
                            })}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label className="font-size-h6 text-dark">
                            <FormattedMessage id="ACCOUNTING.DESCRIPTION" />
                        </Label>
                        <Input
                            name="description"
                            type="textarea"
                            value={values.description}
                            onChange={handleInputChange}
                            placeholder={intl.formatMessage({
                                id: 'GLOBAL.PLACEHOLER.INPUT'
                            })}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label className="font-size-h6 text-dark">
                            <FormattedMessage id="ACCOUNTING.PAYMENT.CHOOSE_CARD" />
                        </Label>
                        <Select
                            options={methodOptions}
                            defaultValue={methodOptions[0]}
                            onChange={handleCardSelected}
                            placeholder={intl.formatMessage({
                                id: 'GLOBAL.PLACEHOLER.SELECT'
                            })}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label className="font-size-h6 text-dark">
                            <FormattedMessage id="ACCOUNTING.PAYMENT.CHOOSE_RECEIPT" />
                        </Label>
                        <Input
                            type="file"
                            name="file"
                            id="exampleFile"
                            onChange={handleFileChange}
                        />
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
                    <FormattedMessage id="GLOBAL.BUTTON.CANCEL" />
                </Button>
                <Button
                    color="primary"
                    className="font-weight-bolder"
                    onClick={handleNewSubmit}
                >
                    <FormattedMessage id="GLOBAL.BUTTON.MONEY" />
                </Button>
            </ModalFooter>
        </Modal>
    );
}

export default DialogPayment;
