import React from 'react';
import { useDispatch } from 'react-redux';

import { pickGoodsDelivery } from 'app/modules/Warehouse/warehouse-redux/outBoundPickerSlice';

import SelectGoodsDelivery from 'app/components/Select/SelectGoodsDelivery';

const InputAddGoodsDelivery = props => {

    const dispatch = useDispatch();

    const handleSelectGoodsDelivery = (v) => {
        dispatch(pickGoodsDelivery({ id: v }));
    }

    return (
        <SelectGoodsDelivery onChange={handleSelectGoodsDelivery} showLabel={false} />
    );
};

InputAddGoodsDelivery.propTypes = {

};

export default InputAddGoodsDelivery;