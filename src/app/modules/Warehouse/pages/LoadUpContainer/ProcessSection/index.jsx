import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import warehouseApi from 'apis/warehouse';
import { loadUpContainerAction } from 'app/modules/Warehouse/warehouse-redux/loadUpContainerSlice';
import useTrans from 'helper/useTrans';
import isContainerCutOff from 'helper/isContainerCutOff';
import getCurrentContainer from 'app/modules/Warehouse/selector/LoadUpContainer/getCurrentContainer';
import getUpContMessages from 'app/modules/Warehouse/selector/LoadUpContainer/getUpContMessages';

import { Card } from '_metronic/_partials/controls';
import InputAddData from './InputAddData';
import IOMessage from 'app/modules/Warehouse/components/WarehouseIO/IOMessages';
import { dialog } from 'app/components/DialogNotify';

import './index.scss';

const ProcessSection = props => {

    const messages = useSelector(getUpContMessages);
    const currentContainer = useSelector(getCurrentContainer);
    const [trans] = useTrans();
    const dispatch = useDispatch();
    const containerCutOff = isContainerCutOff(currentContainer);

    const handleDeleteMessage = (message) => {
        warehouseApi.inContainerPicker.delete(message.id)
            .then(() => {
                dialog.success(trans("warehouse.io.delete.success"));
                dispatch(loadUpContainerAction.removeBoxByPickerId(message));
            })
            .catch(() => {
                dialog.error(trans("warehouse.io.delete.failure"));
            })
    }

    const handleEditQuantity = ({ newQuantity, ...message }) => {
        if (Number(newQuantity) > 0)
            warehouseApi.inContainerPicker.update(message.id, { quantity: Number(newQuantity) })
                .then(() => {
                    dialog.success(trans("warehouse.io.update.success"));
                    dispatch(loadUpContainerAction.updateBoxQuantity({ newQuantity: Number(newQuantity), ...message }));
                })
                .catch(() => {
                    dialog.error(trans("warehouse.io.update.failure"));
                })
    }

    return (
        <Card className="process-section">
            <InputAddData />
            <IOMessage
                messages={messages}
                onDelete={!containerCutOff ? handleDeleteMessage : undefined}
                onEdit={!containerCutOff ? handleEditQuantity : undefined}
                permissions={{
                    delete: ['in-container-pickers.delete'],
                    update: ['in-container-pickers.update'],
                }}
            />
        </Card>
    );
};

ProcessSection.propTypes = {

};

export default ProcessSection;