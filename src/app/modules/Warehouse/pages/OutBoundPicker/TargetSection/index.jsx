import React from 'react';
import { useSelector } from 'react-redux';

import useTrans from 'helper/useTrans';
import getTargetBoxes from 'app/modules/Warehouse/selector/outBoundPicker/targetBoxesSelector';

import { Card } from '_metronic/_partials/controls';
import InputAddGoodsDelivery from './InputAddGoodsDelivery';
import TargetBoxes from 'app/modules/Warehouse/components/WarehouseIO/TargetBoxes';

import './index.scss';

const TargetSection = props => {
    const targetBoxes = useSelector(getTargetBoxes);
    const goodsDelivery = useSelector(state => state.warehouse.outBoundPicker.goodsDelivery.data);
    const [trans] = useTrans();

    return (
        <Card className="target-section">
            <InputAddGoodsDelivery />
            <TargetBoxes
                targetBoxes={targetBoxes}
                currentContainer={goodsDelivery}
                labelPrefix={trans("warehouse.goods_delivery.title")}
            />
        </Card>
    );
};

TargetSection.propTypes = {

};

export default TargetSection;