import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { fetchGoodsDeliveries } from 'app/modules/Warehouse/warehouse-redux/goodsDeliverySlice';
import useTrans from 'helper/useTrans';

import TMNBaseSelect from '../BaseSelect';

import './index.scss';

const SelectGoodsDelivery = ({ onChange, value, showLabel = true, ...props }) => {
    const goodsDeliveries = useSelector(state => state.warehouse.goodsDelivery.list.data);
    const loading = useSelector(state => state.warehouse.goodsDelivery.list.loading);
    const dispatch = useDispatch();
    const [trans] = useTrans();

    const makeOption = useCallback((i) => ({
        value: i.id,
        label: trans("warehouse.goods_delivery.id", { id: i.id })
    }), [trans]);

    const options = goodsDeliveries?.map(item => makeOption(item));

    const handleSelect = option => {
        onChange && onChange(option.value);
    };

    const fetchData = (params) => {
        dispatch(fetchGoodsDeliveries(params));
    }

    return (
        <TMNBaseSelect
            value={value}
            label={showLabel && trans("warehouse.goods_delivery.title")}
            className="select-goods-delivery"
            placeholder={trans("warehouse.goods_delivery.find")}
            options={options}
            onChange={handleSelect}
            loading={loading}
            onFetchData={fetchData}
            {...props}
        />
    );
};

SelectGoodsDelivery.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.any,
    showLabel: PropTypes.bool
};

export default SelectGoodsDelivery;