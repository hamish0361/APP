import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { fetchPlaceOfDeliveries } from 'app/modules/Warehouse/warehouse-redux/placeOfDeliverySlice';
import useTrans from 'helper/useTrans';

import TMNBaseSelect from '../BaseSelect';

import './index.scss';

const SelectPlaceOfDelivery = ({ onChange, value, showLabel = true, ...props }) => {
    const placeOfDeliveries = useSelector(state => state.warehouse.placeOfDelivery.list.data);
    const loading = useSelector(state => state.warehouse.placeOfDelivery.list.loading);
    const dispatch = useDispatch();
    const [trans] = useTrans();

    const makeOption = useCallback((i) => ({
        value: i.id,
        label: i.consignee
    }), []);

    const options = placeOfDeliveries?.map(item => makeOption(item));

    const handleSelect = option => {
        onChange && onChange(option.value);
    };

    const fetchData = (params) => {
        dispatch(fetchPlaceOfDeliveries(params));
    }

    return (
        <TMNBaseSelect
            value={value}
            label={showLabel && trans("warehouse.place_of_delivery.title")}
            className="select-place-of-delivery"
            placeholder={trans("warehouse.place_of_delivery.title")}
            options={options}
            onChange={handleSelect}
            loading={loading}
            onFetchData={fetchData}
            {...props}
        />
    );
};

SelectPlaceOfDelivery.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.any,
    showLabel: PropTypes.bool
};

export default SelectPlaceOfDelivery;