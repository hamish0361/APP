import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { fetchShipmentMethods } from 'app/modules/Warehouse/warehouse-redux/shipmentMethodSlice';
import useTrans from 'helper/useTrans';

import TMNBaseSelect from '../BaseSelect';

import './index.scss';

const makeOption = (item) => {
    return {
        value: item.id,
        label: `${item.name}`
    }
}

const SelectShipmentMethod = ({ onChange, value, ...props }) => {
    const shipmentMethodList = useSelector(state => state.warehouse.shipmentMethod.list.data)
    const loading = useSelector(state => state.warehouse.shipmentMethod.list.loading)
    const dispatch = useDispatch();
    const [trans] = useTrans();

    const options = useMemo(() => {
        return shipmentMethodList.map(item => {
            return makeOption(item);
        })
    }, [shipmentMethodList]);

    const handleSelectShipmentMethod = (option) => {
        onChange && onChange(option.value);
    }

    const fetchData = (params) => {
        dispatch(fetchShipmentMethods(params));
    }

    return (
        <TMNBaseSelect
            value={value}
            label={trans("warehouse.shipment_method.title")}
            className="select-shipment-method"
            placeholder={trans("common.select_here")}
            options={options}
            onChange={handleSelectShipmentMethod}
            loading={loading}
            onFetchData={fetchData}
            typeSearch='name'
            {...props}
        />
    );
};

SelectShipmentMethod.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.any,
};

export default SelectShipmentMethod;