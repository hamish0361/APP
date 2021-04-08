import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import warehouseApi from 'apis/warehouse';

import FormAddOrder from 'app/modules/Warehouse/components/Form/FormAddBoxOrder';
import { dialog } from 'app/components/DialogNotify';
import handleApiError from 'helper/handleApiError';

import './index.scss';
import useTrans from 'helper/useTrans';

const AddOrder = ({ onSuccess }) => {

    const currentBox = useSelector(state => state.warehouse.box.detail.data);
    const [trans] = useTrans();

    const handleCreateBoxOwning = (values, form) => {
        warehouseApi.boxOwner.create({ ...values, box_id: currentBox?.id })
            .then((res) => {
                dialog.success(trans("warehouse.sku.owner.create.success"));
                onSuccess && onSuccess(res);
            })
            .catch((err) => {
                dialog.error(trans("warehouse.sku.owner.create.failure"));
                handleApiError(err, form);
            })
    }

    return (
        <div className="add-order">
            <FormAddOrder onSubmit={handleCreateBoxOwning} />
        </div>
    );
};

AddOrder.propTypes = {
    onSuccess: PropTypes.func
};

export default AddOrder;