import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { fetchGoodsDeliveryStatuses } from 'app/modules/Warehouse/warehouse-redux/goodsDeliveryStatusSlice';
import useTrans from 'helper/useTrans';

import TMNBaseSelect from '../BaseSelect';

import './index.scss';

const SelectGoodsDeliveryStatus = ({ onChange, value, showLabel = true, ...props }) => {
    const listGoodsDeliveryStatus = useSelector(state => state.warehouse.goodsDeliveryStatus.list.data);
    const loading = useSelector(state => state.warehouse.goodsDeliveryStatus.list.loading);
    const dispatch = useDispatch();
    const [trans] = useTrans();

    const makeOption = useCallback((i) => ({
        value: i.id,
        label: i.name
    }), []);

    const options = listGoodsDeliveryStatus?.map(item => makeOption(item));

    const handleSelect = option => {
        onChange && onChange(option.value);
    };

    const fetchData = (params) => {
        dispatch(fetchGoodsDeliveryStatuses(params));
    }

    return (
        <TMNBaseSelect
            value={value}
            label={showLabel && trans("warehouse.goods_delivery_status.title")}
            className="select-delivery-partner"
            placeholder={trans("warehouse.goods_delivery_status.find")}
            options={options}
            onChange={handleSelect}
            loading={loading}
            onFetchData={fetchData}
            typeSearch='name'
            {...props}
        />
    );
};

SelectGoodsDeliveryStatus.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.any,
    showLabel: PropTypes.bool
};

export default SelectGoodsDeliveryStatus;