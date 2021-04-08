import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { fetchAreas } from '../../warehouse-redux/areaSlice';
import useTrans from 'helper/useTrans';

import TMNBaseSelect from 'app/components/Select/BaseSelect';

import './index.scss';

const makeOption = (item) => ({
    value: item.id,
    label: `Mã: ${item.id} - ${item.name}`
});

const SelectArea = ({ onChange, value, showLabel = true, label, ...props }) => {
    const areaList = useSelector(state => state.warehouse.area.list);
    const loading = useSelector(state => state.warehouse.area.loading);
    const dispatch = useDispatch();
    const [trans] = useTrans();

    const areaOptions = areaList?.map(item => makeOption(item));

    const handleSelect = option => {
        onChange && onChange(option.value);
    };

    const fetchData = (params) => {
        dispatch(fetchAreas(params));
    }

    return (
        <TMNBaseSelect
            value={value}
            label={showLabel && (label || trans("warehouse.area.title"))}
            className="select-area"
            placeholder={trans("warehouse.area.title")}
            options={areaOptions}
            onChange={handleSelect}
            isLoading={loading}
            onFetchData={fetchData}
            typeSearch='name'
            {...props}
        />
    );
};

SelectArea.propTypes = {
    onSelectContainerType: PropTypes.func,
    value: PropTypes.any,
    showLabel: PropTypes.bool
};

export default SelectArea;
