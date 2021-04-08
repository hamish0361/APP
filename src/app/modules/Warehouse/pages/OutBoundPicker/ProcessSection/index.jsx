import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import warehouseApi from 'apis/warehouse';
import useTrans from 'helper/useTrans';
import { outBoundPickerAction } from 'app/modules/Warehouse/warehouse-redux/outBoundPickerSlice';

import { Card } from '_metronic/_partials/controls';
import InputAddData from './InputAddData';
import IOMessage from 'app/modules/Warehouse/components/WarehouseIO/IOMessages';
import { dialog } from 'app/components/DialogNotify';

import './index.scss';

const ProcessSection = props => {
    const message = useSelector(state => state.warehouse.outBoundPicker.process.message);
    const dispatch = useDispatch();
    const [trans] = useTrans();

    const handleDeleteMessage = (message) => {
        warehouseApi.outBoundPicker.delete(message.id)
            .then(() => {
                dialog.success(trans("warehouse.io.delete.success"));
                dispatch(outBoundPickerAction.removeBoxByPickerId(message.id));
            })
            .catch(() => {
                dialog.error(trans("warehouse.io.delete.failure"));
            })
    }

    const handleEditQuantity = ({ newQuantity, ...message }) => {
        if (Number(newQuantity) > 0)
            warehouseApi.outBoundPicker.update(message.id, { quantity: Number(newQuantity) })
                .then(() => {
                    dialog.success(trans("warehouse.io.update.success"));
                    dispatch(outBoundPickerAction.updateBoxQuantity({ newQuantity: Number(newQuantity), ...message }));
                })
                .catch(() => {
                    dialog.error(trans("warehouse.io.update.failure"));
                })
    }

    return (
        <Card className="process-section">
            <InputAddData />
            <IOMessage
                messages={message}
                onDelete={handleDeleteMessage}
                onEdit={handleEditQuantity}
                permissions={{
                    update: ['outbound-pickers.update'],
                    delete: ['outbound-pickers.delete']
                }}
            />
        </Card>
    );
};

ProcessSection.propTypes = {

};

export default ProcessSection;