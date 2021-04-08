import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { fetchInvoices } from 'app/modules/Warehouse/warehouse-redux/invoiceSlice';
import useTrans from 'helper/useTrans';

import TMNBaseSelect from '../BaseSelect';

import './index.scss';

const SelectInvoice = ({ onChange, value, showLabel = true, ...props }) => {
    const invoiceList = useSelector(state => state.warehouse.invoice.list.data);
    const loading = useSelector(state => state.warehouse.invoice.list.loading);
    const dispatch = useDispatch();
    const [trans] = useTrans();

    const makeOption = useCallback((i) => ({
        value: i.id,
        label: trans("warehouse.invoice.option_label", { id: i.id, created_at: i.created_at || '---' })
    }), [trans]);

    const options = invoiceList?.map(item => makeOption(item));

    const handleSelect = option => {
        onChange && onChange(option.value);
    };

    const fetchData = (params) => {
        dispatch(fetchInvoices(params));
    }

    return (
        <TMNBaseSelect
            value={value}
            label={showLabel && trans("warehouse.invoice.title")}
            className="select-invoice"
            placeholder={trans("warehouse.invoice.find")}
            options={options}
            onChange={handleSelect}
            loading={loading}
            onFetchData={fetchData}
            {...props}
        />
    );
};

SelectInvoice.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.any,
    showLabel: PropTypes.bool
};

export default SelectInvoice;