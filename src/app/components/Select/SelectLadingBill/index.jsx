import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { fetchLadingBills } from 'app/modules/Warehouse/warehouse-redux/ladingBillSlice';
import useTrans from 'helper/useTrans';

import TMNBaseSelect from '../BaseSelect';

import './index.scss';

const SelectLadingBill = ({ onChange, value, showLabel = true, ...props }) => {
    const ladingBillList = useSelector(state => state.warehouse.ladingBill.list.data);
    const loading = useSelector(state => state.warehouse.ladingBill.list.loading);
    const dispatch = useDispatch();
    const [trans] = useTrans();

    const makeOption = useCallback((i) => ({
        value: i.id,
        label: trans('warehouse.lading_bill.option_label', { id: i.id, customerId: i.customer_id || '---', createdAt: i.created_at || '---' }),
    }), [trans]);

    const ladingBillOptions = ladingBillList?.map(item => makeOption(item));

    const handleSelect = option => {
        onChange && onChange(option.value);
    };

    const fetchData = (params) => {
        dispatch(fetchLadingBills(params));
    }

    return (
        <TMNBaseSelect
            value={value}
            label={showLabel && trans("warehouse.lading_bill.title")}
            className="select-lading-bill"
            placeholder={trans("warehouse.lading_bill.find")}
            options={ladingBillOptions}
            onChange={handleSelect}
            loading={loading}
            onFetchData={fetchData}
            typeSearch={undefined}
            {...props}
        />
    );
};

SelectLadingBill.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.any,
    showLabel: PropTypes.bool
};

export default SelectLadingBill;
