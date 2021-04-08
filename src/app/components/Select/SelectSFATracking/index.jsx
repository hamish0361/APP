import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { fetchSFAs } from 'app/modules/Warehouse/warehouse-redux/sfaSlice';
import useTrans from 'helper/useTrans';

import TMNBaseSelect from '../BaseSelect';

import './index.scss';

const makeOption = (i) => ({
    value: i.tracking,
    label: i.tracking
})

const SelectTracking = ({ onChange, value, showLabel = true, ...props }) => {
    const { loading, data: trackingList } = useSelector(state => state.warehouse.sfa.list); // eslint-disable-line
    const dispatch = useDispatch();
    const [trans] = useTrans();

    const options = trackingList?.map(item => makeOption(item));

    const handleSelect = option => {
        onChange && onChange(option.value);
    };

    const fetchData = (params) => {
        dispatch(fetchSFAs(params));
    }

    return (
        <TMNBaseSelect
            value={value}
            label={showLabel && trans("warehouse.tracking.title")}
            className="select-tracking"
            placeholder={trans("warehouse.tracking.find")}
            options={options}
            onChange={handleSelect}
            loading={loading}
            onFetchData={fetchData}
            typeSearch='tracking'
            {...props}
        />
    );
};

SelectTracking.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.any,
    showLabel: PropTypes.bool
};

export default SelectTracking;