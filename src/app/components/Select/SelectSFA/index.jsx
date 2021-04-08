import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { fetchSFAs } from 'app/modules/Warehouse/warehouse-redux/sfaSlice';
import useTrans from 'helper/useTrans';

import TMNBaseSelect from '../BaseSelect';

import './index.scss';

const SelectSFA = ({ onChange, value, showLabel = true, ...props }) => {
    const sfaList = useSelector(state => state.warehouse.sfa.list.data);
    const loading = useSelector(state => state.warehouse.sfa.list.loading);
    const dispatch = useDispatch();
    const [trans] = useTrans();

    const makeOption = useCallback((i) => ({
        value: i.id,
        label: trans('warehouse.sfa.x_id', { x: i.id })
    }), [trans]);

    const options = sfaList?.map(item => makeOption(item));

    const handleFetchData = (params) => {
        dispatch(fetchSFAs(params));
    }

    const handleChange = (selectedOption) => {
        onChange && onChange(selectedOption.value)
    }

    return (
        <TMNBaseSelect
            className="select-sfa"
            value={value}
            label={showLabel && trans("warehouse.sfa.title")}
            placeholder={trans("warehouse.sfa.find")}
            options={options}
            onChange={handleChange}
            loading={loading}
            onFetchData={handleFetchData}
            {...props}
        />
    );
};

SelectSFA.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.any,
    showLabel: PropTypes.bool
};

export default SelectSFA;