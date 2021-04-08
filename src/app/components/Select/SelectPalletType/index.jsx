import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { fetchPalletTypes } from 'app/modules/Warehouse/warehouse-redux/palletTypeSlice';
import useTrans from 'helper/useTrans';

import TMNBaseSelect from '../BaseSelect';

import './index.scss';

const SelectPalletType = ({ onChange, value, showLabel = true, ...props }) => {
    const palletTypeList = useSelector(state => state.warehouse.palletType.list.data);
    const loading = useSelector(state => state.warehouse.palletType.list.loading);
    const dispatch = useDispatch();
    const [trans] = useTrans();

    const makeOption = useCallback((item) => ({
        value: item.id,
        label: trans("warehouse.pallet_type.option_label", {
            id: item.id,
            max_volume: item.max_volume,
            max_weight: item.max_weight
        })
    }), [trans]);

    const palletTypeOptions = palletTypeList?.map(item => makeOption(item));

    const handleSelectPalletType = option => {
        onChange && onChange(option.value);
    };

    const fetchData = (params) => {
        dispatch(fetchPalletTypes(params));
    }

    return (
        <TMNBaseSelect
            value={value}
            label={showLabel && trans("warehouse.pallet_type.title")}
            className="select-pallet-type"
            placeholder={trans("common.select_here")}
            options={palletTypeOptions}
            onChange={handleSelectPalletType}
            loading={loading}
            onFetchData={fetchData}
            typeSearch='name'
            {...props}
        />
    );
};

SelectPalletType.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.any,
    showLabel: PropTypes.bool
};

export default SelectPalletType;
