import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { fetchDeliveryPartners } from 'app/modules/Warehouse/warehouse-redux/deliveryPartnerSlice';
import useTrans from 'helper/useTrans';

import TMNBaseSelect from '../BaseSelect';

import './index.scss';

const SelectDeliveryPartners = ({ onChange, value, showLabel = true, ...props }) => {
    const deliveries = useSelector(state => state.warehouse.deliveryPartner.list.data);
    const loading = useSelector(state => state.warehouse.deliveryPartner.list.loading);
    const dispatch = useDispatch();
    const [trans] = useTrans();

    const makeOption = useCallback((i) => ({
        value: i.id,
        label: i.name
    }), []);

    const options = deliveries?.map(item => makeOption(item));

    const handleSelect = option => {
        onChange && onChange(option.value);
    };

    const fetchData = (params) => {
        dispatch(fetchDeliveryPartners(params));
    }

    return (
        <TMNBaseSelect
            value={value}
            label={showLabel && trans("warehouse.delivery_partner.title")}
            placeholder={trans("warehouse.delivery_partner.find")}
            options={options}
            onChange={handleSelect}
            loading={loading}
            onFetchData={fetchData}
            className="select-delivery-partner"
            typeSearch={'name'}
            {...props}
        />
    );
};

SelectDeliveryPartners.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.any,
    showLabel: PropTypes.bool
};

export default SelectDeliveryPartners;