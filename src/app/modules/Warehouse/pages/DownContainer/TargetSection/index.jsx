import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { downContainerAction } from 'app/modules/Warehouse/warehouse-redux/downContainerSlice';
import getTargetBoxes from 'app/modules/Warehouse/selector/DownContainer/targetBoxesSelector';
import formatNumber from 'helper/formatNumber';
import getCurrentContainer from 'app/modules/Warehouse/selector/DownContainer/getCurrentContainer';

import { Card } from '_metronic/_partials/controls';
import InputAddInvoice from './InputAddInvoice';
import TargetBoxes from 'app/modules/Warehouse/components/WarehouseIO/TargetBoxes';

import './index.scss';

const TargetSection = props => {
    const targetBoxes = useSelector(getTargetBoxes);
    const currentContainer = useSelector(getCurrentContainer);
    const dispatch = useDispatch();

    const handleRemoveInvoice = (c) => {
        dispatch(downContainerAction.removeInvoiceByIdx(c));
    }

    return (
        <Card className="target-section">
            <InputAddInvoice />
            <TargetBoxes
                targetBoxes={targetBoxes}
                currentContainer={currentContainer}
                onRemoveTarget={handleRemoveInvoice}
                countRendering={(v) => `${formatNumber(v.out || 0)} / ${formatNumber(v.count || 0)} / ${formatNumber(v.quantity)}`}
            />
        </Card>
    );
};

TargetSection.propTypes = {

};

export default TargetSection;