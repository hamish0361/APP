import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';

import useTrans from 'helper/useTrans';
import warehouseApi from 'apis/warehouse';
import handleApiError from 'helper/handleApiError';

import CustomModal from 'app/components/CustomModal';
import { Modal } from 'react-bootstrap';
import { dialog } from 'app/components/DialogNotify';
import FormAddGoodsDelivery from 'app/modules/Warehouse/components/Form/FormAddGoodsDelivery';
import Button from 'app/components/Button';

const CreateGoodsDelivery = ({ onSuccess, show }) => {

    const [loading, setLoading] = useState(false);
    const [trans] = useTrans();
    const history = useHistory();
    const formRef = useRef();

    const closeModal = () => {
        history.goBack();
    }

    const triggerSubmit = () => {
        formRef.current.submitForm();
    }

    const createGoodsDelivery = (values, form) => {
        setLoading(true);

        warehouseApi.goodsDelivery.create(values)
            .then(res => {
                dialog.success(trans("warehouse.goods_delivery.create.success"));

                onSuccess && onSuccess(res);
            })
            .catch((err) => {
                console.error(err);

                handleApiError(err, form);
            })
            .finally(() => {
                setLoading(false);
            })
    }

    return (
        <CustomModal
            show={show}
            onHide={closeModal}
            title={trans("warehouse.goods_delivery.create.title")}
            actionsLoading={loading}
        >

            <Modal.Body>
                <FormAddGoodsDelivery
                    onSubmit={createGoodsDelivery}
                    ref={formRef}
                    showStatus={false}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button type="secondary" loading={loading} onClick={closeModal}>
                    {trans("common.cancel")}
                </Button>
                <Button type="primary" loading={loading} onClick={triggerSubmit}>
                    {trans("common.save")}
                </Button>
            </Modal.Footer>
        </CustomModal>
    );
};

CreateGoodsDelivery.propTypes = {
    onSuccess: PropTypes.func,
    show: PropTypes.bool
};

export default CreateGoodsDelivery;