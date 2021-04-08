import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { loadUpContainerAction } from 'app/modules/Warehouse/warehouse-redux/loadUpContainerSlice';
import getTargetBoxes from 'app/modules/Warehouse/selector/LoadUpContainer/targetBoxesSelector';
import getCurrentContainer from 'app/modules/Warehouse/selector/LoadUpContainer/getCurrentContainer';

import { Card } from '_metronic/_partials/controls';
import InputAddInvoice from './InputAddInvoice';
import TargetBoxes from 'app/modules/Warehouse/components/WarehouseIO/TargetBoxes';

import './index.scss';

const TargetSection = props => {

    const targetBoxes = useSelector(getTargetBoxes);
    const currentContainer = useSelector(getCurrentContainer);
    const dispatch = useDispatch();

    const handleRemoveInvoice = (c) => {
        dispatch(loadUpContainerAction.removeInvoiceByIdx(c));
    }

    return (
        <Card className="target-section">
            <InputAddInvoice />
            <TargetBoxes targetBoxes={targetBoxes} currentContainer={currentContainer} onRemoveTarget={handleRemoveInvoice} />
        </Card>
    );
};

TargetSection.propTypes = {
    
};

export default TargetSection;