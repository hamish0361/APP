import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { downContainerAction } from 'app/modules/Warehouse/warehouse-redux/downContainerSlice';
import useTrans from 'helper/useTrans';
import warehouseApi from 'apis/warehouse';
import getCurrentContainer from 'app/modules/Warehouse/selector/DownContainer/getCurrentContainer';
import getDownContMessages from 'app/modules/Warehouse/selector/DownContainer/getDownContMessages';
import useInputAdd from './InputAddData/useInputAdd';

import { Card } from '_metronic/_partials/controls';
import InputAddData from './InputAddData';
import ListPallet from './ListPallet';
import IOMessage from 'app/modules/Warehouse/components/WarehouseIO/IOMessages';
import { dialog } from 'app/components/DialogNotify';

import './index.scss';

const ProcessSection = props => {

    const message = useSelector(getDownContMessages);
    const currentContainer = useSelector(getCurrentContainer);
    const dispatch = useDispatch();
    const [trans] = useTrans();
    const { addPallet } = useInputAdd();

    const handleDeleteMessage = (message) => {
        warehouseApi.outContainerPicker.delete(message.id)
            .then(() => {
                dialog.success(trans("warehouse.io.delete.success"));
                dispatch(downContainerAction.removeBoxByPickerId(message.id));
            })
            .catch(() => {
                dialog.error(trans("warehouse.io.delete.failure"));
            })
    }

    const handleEditQuantity = ({ newQuantity, ...message }) => {
        if (Number(newQuantity) > 0)
            warehouseApi.outContainerPicker.update(message.id, { quantity: Number(newQuantity) })
                .then((res) => {
                    dialog.success(trans("warehouse.io.update.success"));
                    dispatch(downContainerAction.updateBoxQuantity({ newQuantity: Number(newQuantity), ...message }));
                    if(res.pallet_id) addPallet(res.pallet_id)
                })
                .catch(() => {
                    dialog.error(trans("warehouse.io.update.failure"));
                })
    }

    return (
        <Card className="process-section">
            <InputAddData />
            <ListPallet />
            <IOMessage
                messages={message}
                messageKey={currentContainer?.id}
                onDelete={handleDeleteMessage}
                onEdit={handleEditQuantity}
                permissions={{
                    update: ['out-container-pickers.update'],
                    delete: ['out-container-pickers.delete']
                }}
            />
        </Card>
    );
};

ProcessSection.propTypes = {

};

export default ProcessSection;