import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { fetchOrder } from 'app/modules/Order/order-redux/orderSlice';
import useTrans from 'helper/useTrans';

import TMNBaseSelect from '../BaseSelect';

import './index.scss';

const SelectOrder = ({ onChange, value, showLabel = true, defaultQuery = {}, ...props }) => {
    const orderList = useSelector(state => state.order.list.orderList);
    const loading = useSelector(state => state.order.list.isLoading);
    const dispatch = useDispatch();
    const [trans] = useTrans();

    const makeOption = useCallback((i) => ({
        value: i?.id,
        label: i?.id
    }), []);

    const orderOptions = orderList?.map(item => makeOption(item));

    const handleSelect = option => {
        onChange && onChange(option.value);
    };

    const fetchData = (params) => {
        dispatch(fetchOrder({ ...params }));
    }

    return (
        <TMNBaseSelect
            value={value}
            label={showLabel && trans("common.the_order")}
            className="select-order"
            placeholder={trans("common.the_order")}
            options={orderOptions}
            onChange={handleSelect}
            loading={loading}
            onFetchData={fetchData}
            {...props}
        />
    );
};

SelectOrder.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.any,
    showLabel: PropTypes.bool,
    defaultQuery: PropTypes.any
};

export default SelectOrder;
