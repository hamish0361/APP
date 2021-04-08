import { dialog } from 'app/components/DialogNotify';
import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import { ModalBody } from 'react-bootstrap';
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
    onSearchUser: PropTypes.func,

    show: PropTypes.bool,
    isPayment: PropTypes.bool
};

function DialogPayment({
    onHide,
    onNewSubmit,
    onSearchUser,
    show,
    isPayment,
    intl
}) {
    const { userList } = useSelector(
        ({ authService }) => ({
            userList: authService.user.userList
        }),
        shallowEqual
    );
    const [values, setValues] = useState({
        userSelected: null,
        typeSelected: null,
        amount: 0,
        description: '',
        file: ''
    });

    const customerRef = useRef(null);
    const handleUserInputSearch = value => {
        if (customerRef.current) {
            clearTimeout(customerRef.current);
        }
        customerRef.current = setTimeout(() => {
            const params = {
                value,
                type: 'email'
            };
            if (value.length > 0 && onSearchUser) onSearchUser(params);
        }, 500);
    };

    const handleUserSelected = userSelected => {
        setValues({
            ...values,
            userSelected
        });
    };

    const handleTypeSeleted = typeSelected => {
        setValues({
            ...values,
            typeSelected
        });
    };

    const handleInputChange = e => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        });
    };

    const typeOptions = [
        { value: 'deposit_jpy', label: 'Deposit ¥' },
        { value: 'deposit_vnd', label: 'Deposit ₫' }
    ];

    // customer
    const userOptions = userList?.map(item => {
        return {
            value: item.id,
            label: item.email
        };
    });

    // submit
    const handleNewSubmit = () => {
        const formData = new FormData();
        formData.append('path_file', values.file);
        formData.append('name', values.file.name);
        const params = {
            user: values.userSelected?.value || '',
            amount: values.amount,
            description: values.description,
            type: values.typeSelected?.value || typeOptions[0].value,
            file: formData
        };
        if (!values.userSelected) {
            dialog.warning(
                ` ${intl.formatMessage({
                    id: 'ACCOUNTING.CARD.DIALOG_NEW.REQUIRED.NAME'
                })}`
            );
        } else if (!values.amount) {
            dialog.warning(
                ` ${intl.formatMessage({
                    id: 'ACCOUNTING.CARD.DIALOG_NEW.REQUIRED.AMOUNT'
                })}`
            );
        } else {
            onHide();
            resetForm();
            onNewSubmit(params);
        }
    };

    const resetForm = () => {
        setValues({
            userSelected: null,
            typeSelected: null,
            amount: 0,
            description: '',
            file: ''
        });
    };

    //file
    const handleFileChange = e => {
        setValues({
            ...values,
            file: e.target.files[0]
        });
    };

    return (
        <Modal
            returnFocusAfterClose={true}
            isOpen={show}
            className="warehouse-modal"
        >
            <ModalHeader>
                {intl.formatMessage({
                    id: 'ACCOUNTING.CARD.PAYMENT'
                })}
            </ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label className="font-size-h6 text-dark">
                            {intl.formatMessage({
                                id: 'ACCOUNTING.ORDER.TOPFILTER.USER'
                            })}
                        </Label>
                        <Select
                            placeholder="Nhập tìm kiếm người dùng"
                            options={userOptions}
                            className="w-100"
                            onInputChange={handleUserInputSearch}
                            onChange={handleUserSelected}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label className="font-size-h6 text-dark">
                            {intl.formatMessage({
                                id: 'ACCOUNTING.ORDER.TYPE'
                            })}
                        </Label>
                        <Select
                            options={typeOptions}
                            defaultValue={typeOptions[0]}
                            onChange={handleTypeSeleted}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label className="font-size-h6 text-dark">
                            {intl.formatMessage({
                                id: 'ACCOUNTING.ORDER.AMOUNT_OF_MONEY'
                            })}
                        </Label>
                        <Input
                            name="amount"
                            type="number"
                            value={values.amount}
                            min="1"
                            onChange={handleInputChange}
                            placeholder="Nhập số tiền"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label className="font-size-h6 text-dark">
                            {' '}
                            {intl.formatMessage({
                                id: 'ACCOUNTING.ORDER.DESCRIPTION'
                            })}
                        </Label>
                        <Input
                            name="description"
                            type="textarea"
                            value={values.description}
                            onChange={handleInputChange}
                            placeholder="Nhập mô tả"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label className="font-size-h6 text-dark">
                            {intl.formatMessage({
                                id:
                                    'ACCOUNTING.ORDER.DETAIL.TRANSACTION.RECEIPT'
                            })}
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
                    {intl.formatMessage({
                        id: 'GLOBAL.BUTTON.CANCEL'
                    })}
                </Button>
                <Button
                    color="primary"
                    className="font-weight-bolder"
                    onClick={handleNewSubmit}
                >
                    {isPayment
                        ? ` ${intl.formatMessage({
                              id: 'ACCOUNTING.CARD.PAYMENT'
                          })}`
                        : ` ${intl.formatMessage({
                              id: 'ACCOUNTING.CARD.WITHDRAWAL'
                          })}`}
                </Button>
            </ModalFooter>
        </Modal>
    );
}

export default DialogPayment;
