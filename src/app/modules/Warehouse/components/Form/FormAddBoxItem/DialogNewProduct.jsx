import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import useTrans from 'helper/useTrans';
import productApi from 'apis/product-api/productApi';

import CustomModal from 'app/components/CustomModal';
import { Modal } from 'react-bootstrap';
import { dialog } from 'app/components/DialogNotify';
import FormAddNewProduct from '../FormAddNewProduct';
import Button from 'app/components/Button';

import './DialogNewProduct.scss';
import handleApiError from 'helper/handleApiError';

const DialogNewProduct = ({ show, onHide, onSuccess }) => {

    const [trans] = useTrans();
    const formRef = useRef();

    const createProductWithImg = (body, form) => {
        productApi.createProductImageFile(
            body.params,
            body.data
        ).then(res => {
            dialog.success(trans("warehouse.jancode.create.success"));
            onSuccess && onSuccess(res);
            formRef.current.resetForm();
        })
            .catch((err) => {
                dialog.error(trans("warehouse.jancode.create.success"));
                handleApiError(err, form);
            })
    }

    const createProductFunc = (params, form) => {
        productApi.createProduct(params)
            .then((res) => {
                dialog.success(trans("warehouse.jancode.create.success"));
                onSuccess && onSuccess(res);
                formRef.current.resetForm();
            })
            .catch((err) => {
                dialog.error(trans("warehouse.jancode.create.failure"));
                handleApiError(err, form);
            })
    }

    const triggerSubmit = () => {
        formRef.current.submitForm();
    }

    return (
        <CustomModal
            title={trans("warehouse.jancode.create.title")}
            onHide={onHide}
            actionsLoading={false}
            show={show}
            className="dialog-add-new-product"
        >
            <Modal.Body>
                <FormAddNewProduct
                    ref={formRef}
                    onSubmit={createProductFunc}
                    onSubmitFormData={createProductWithImg}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button type="secondary" onClick={onHide}>{trans("common.cancel")}</Button>
                <Button type="primary" onClick={triggerSubmit}>{trans("common.save")}</Button>
            </Modal.Footer>
        </CustomModal>
    );
};

DialogNewProduct.propTypes = {
    onHide: PropTypes.func,
    show: PropTypes.bool,
    onSuccess: PropTypes.func
};

export default DialogNewProduct;