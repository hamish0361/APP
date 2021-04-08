import React, { useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import PropTypes from 'prop-types';

import warehouseApi from 'apis/warehouse';
import useTrans from 'helper/useTrans';

import CustomModal from 'app/components/CustomModal';
import { Modal } from 'react-bootstrap';
import FormAddBoxToGoodsDelivery from 'app/modules/Warehouse/components/Form/FormAddBoxToGoodsDelivery';
import { dialog } from 'app/components/DialogNotify';
import Button from 'app/components/Button';

const AddBoxToGoodsDelivery = ({ onSuccess, show }) => {

    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const [trans] = useTrans();
    const formRef = useRef();
    const params = useParams();

    const closeModal = () => {
        history.goBack();
    }

    const triggerSubmit = () => {
        formRef.current.submitForm();
    }

    const handleAddBox = (values) => {
        if (!values.boxes.length) return;

        setLoading(true);
        return Promise.all(values.boxes.map(({ id: box_lading_bill_id, quantity }) => {
            return warehouseApi.goodsDeliveryBoxes.create({ goods_delivery_id: params?.id, box_lading_bill_id, quantity })
        })).then((res) => {
            dialog.success(trans("warehouse.goods_delivery.pivot.box_lading_bill.create.success"));

            onSuccess && onSuccess();
            history.goBack();
        }).catch((err) => {
            console.error(err);

            dialog.error(trans("warehouse.goods_delivery.pivot.box_lading_bill.create.failure"));
        }).finally(() => {
            setLoading(false);
        });
    }

    return (
        <CustomModal
            show={show}
            title={trans("warehouse.goods_delivery.pivot.box_lading_bill.create.title")}
            onHide={closeModal}
            actionsLoading={loading}
        >
            <Modal.Body>
                <FormAddBoxToGoodsDelivery onSubmit={handleAddBox} ref={formRef} />
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

AddBoxToGoodsDelivery.propTypes = {
    onSuccess: PropTypes.func,
    show: PropTypes.bool
};

export default AddBoxToGoodsDelivery;