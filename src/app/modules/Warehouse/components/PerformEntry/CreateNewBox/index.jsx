import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useParams } from 'react-router-dom';

import warehouseApi from 'apis/warehouse';
import handleApiError from 'helper/handleApiError';
import _ from 'lodash';

import FormUpdateBoxPhysicalInfo from '../../Form/FormUpdateBoxPhysicalInfo';
import CustomModal from 'app/components/CustomModal';
import { Modal } from 'react-bootstrap';
import { dialog } from 'app/components/DialogNotify';
import useTrans from 'helper/useTrans';
import Button from 'app/components/Button';

import './index.scss';

const initialBoxPhysicalData = {
    width: 1,
    height: 1,
    weight_per_box: 1,
    length: 1,
    duplicate: 1,
}

const CreateNewBox = ({ show, onSuccess, initialValues, onHide, isHaveDuplicate = true }) => {

    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const params = useParams();
    const [trans] = useTrans();
    const formRef = useRef();

    const closeModal = () => {
        if (onHide) onHide();
        else history.goBack();
    }

    const handleBoxInfo = async (values, form) => {
        setLoading(true);

        if (initialValues) await updateBox(values, form);
        else await createBox({ sfa_id: params?.sfa_id, ...values }, form);

        setLoading(false);
    }

    const createBox = (body, form) => {

        let apiParams = body;
        if (!isHaveDuplicate) apiParams = _.omit(body, ['duplicate'])

        return warehouseApi.box.create(apiParams)
            .then((response) => {

                dialog.success(trans("warehouse.sku.create.success"));

                closeModal();
                setTimeout(() => {
                    onSuccess && onSuccess(response);
                }, 500);
            })
            .catch((err) => {
                dialog.error(trans("warehouse.sku.create.failure"));
                handleApiError(err, form);
            })
    }

    const updateBox = (body, form) => {
        const box_id = initialValues?.id || params?.box_id;

        let apiParams = _.pick(body, ['width', 'height', 'weight_per_box', 'length', 'duplicate']);
        if (!isHaveDuplicate) apiParams = _.pick(body, ['width', 'height', 'weight_per_box', 'length']);

        return warehouseApi.box.update(box_id, apiParams)
            .then((response) => {
                dialog.success(trans("warehouse.sku.update.success"));

                closeModal();
                setTimeout(() => {
                    onSuccess && onSuccess(response);
                }, 500);
            })
            .catch((err) => {
                dialog.error(trans("warehouse.sku.update.failure"));
                handleApiError(err, form);
            })
    }

    const triggerSubmit = () => {
        formRef.current.submitForm();
    }

    return (
        <CustomModal
            show={show}
            onHide={closeModal}
            actionsLoading={loading}
            title={initialValues ? trans("warehouse.sku.update.title") : trans("warehouse.sku.create.title")}
        >
            <div className="modal-create-new-box">
                <Modal.Body>
                    <FormUpdateBoxPhysicalInfo
                        isHaveDuplicate={isHaveDuplicate}
                        formItemClass="col-lg-6 col-md-12 col-sm-12"
                        initialValues={initialValues || initialBoxPhysicalData}
                        onSubmit={handleBoxInfo}
                        ref={formRef}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button type="secondary" onClick={closeModal} className="btn-large">{trans("common.cancel")}</Button>
                    <Button htmlType="submit" type="primary" onClick={triggerSubmit} className="btn-large" need={['boxes.create', 'boxes.update']}>{trans("common.save")}</Button>
                </Modal.Footer>
            </div>

        </CustomModal>
    );
};

CreateNewBox.propTypes = {
    show: PropTypes.bool,
    onSuccess: PropTypes.func,
    initialValue: PropTypes.any,
    onHide: PropTypes.func,
    isHaveDuplicate: PropTypes.bool
};

export default CreateNewBox;