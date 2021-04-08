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

DialogWarehouse.propTypes = {
    onHide: PropTypes.func,
    onNewSubmit: PropTypes.func,
    onSearchUser: PropTypes.func,

    show: PropTypes.bool,
    isPayment: PropTypes.bool
};

function DialogWarehouse({
    onHide,
    onNewSubmit,
    onSearchUser,
    show,
    isPayment
}) {
    const { userList } = useSelector(
        ({ accounting, auth }) => ({
            userList: auth.userList
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
            dialog.warning('Vui lòng chọn người dùng');
        } else if (!values.amount) {
            dialog.warning('Vui lòng nhập số tiền');
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
            <ModalHeader>Nộp tiền</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label className="font-size-h6 text-dark">
                            Người dùng
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
                            Chọn Loại giao dịch
                        </Label>
                        <Select
                            options={typeOptions}
                            defaultValue={typeOptions[0]}
                            onChange={handleTypeSeleted}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label className="font-size-h6 text-dark">
                            Số tiền
                        </Label>
                        <Input
                            name="amount"
                            type="number"
                            min="1"
                            value={values.amount}
                            onChange={handleInputChange}
                            placeholder="Nhập số tiền"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label className="font-size-h6 text-dark">Mô tả</Label>
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
                            Chọn chứng từ
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
                    Huỷ
                </Button>
                <Button
                    color="primary"
                    className="font-weight-bolder"
                    onClick={handleNewSubmit}
                >
                    {isPayment ? 'Nộp tiền' : 'Rút tiền'}
                </Button>
            </ModalFooter>
        </Modal>
    );
}

export default DialogWarehouse;
