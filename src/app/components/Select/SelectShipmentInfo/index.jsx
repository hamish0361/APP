import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { fetchShipmentInfo } from 'app/modules/Order/order-redux/shipmentInfoSlice';
import useTrans from 'helper/useTrans';

import TMNBaseSelect from '../BaseSelect';

import './index.scss';

const makeOption = (item) => {
    return {
        value: item.id,
        label: `${item.consignee} - ${item.address}`
    }
}

const SelectShipmentInfo = ({ onChange, value, customer_id, ...props }) => {
    const shipmentInfoList = useSelector(state => state.order.shipmentInfo.shipmentInfoList)
    const isLoading = useSelector(state => state.order.shipmentInfo.isLoading)
    const dispatch = useDispatch();
    const [trans] = useTrans();

    const options = useMemo(() => {
        return shipmentInfoList.map(item => {
            return makeOption(item);
        })
    }, [shipmentInfoList]);

    const handleSelectShipmentInfo = (option) => {
        onChange && onChange(option.value);
    }

    const fetchData = (params) => {
        dispatch(fetchShipmentInfo(params));
    }

    return (
        <TMNBaseSelect
            value={value}
            label={trans("warehouse.shipment_info.title")}
            className="select-shipment-info"
            placeholder={trans("common.select_here")}
            options={options}
            onChange={handleSelectShipmentInfo}
            loading={isLoading}
            onFetchData={fetchData}
            typeSearch='consignee'
            {...props}
        />
    );
};

SelectShipmentInfo.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.any,
    customer_id: PropTypes.any
};

export default SelectShipmentInfo;