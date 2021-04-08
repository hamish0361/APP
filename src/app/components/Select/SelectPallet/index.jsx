import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { fetchPallets } from 'app/modules/Warehouse/warehouse-redux/palletSlice';
import useTrans from 'helper/useTrans';

import TMNBaseSelect from '../BaseSelect';

const SelectPallet = ({ onChange, value, showLabel = true, defaultParams = {}, ...props }) => {
    const palletList = useSelector(state => state.warehouse.pallet.list.data);
    const loading = useSelector(state => state.warehouse.pallet.list.loading);
    const dispatch = useDispatch();
    const [trans] = useTrans();

    const makeOption = useCallback((i) => ({
        value: i.id,
        label: trans("warehouse.pallet.option_label", {
            id: i.id,
            pallet_info: !!i?.location?.floor ? `(F${i?.location?.floor} . R${i?.location?.row} . C${i?.location?.column})` : ''
        })
    }), [trans]);

    const palletOptions = palletList?.map(item => makeOption(item));

    const fetchOptions = useCallback((params = {}) => {

        const body = params;

        Object.entries(defaultParams).forEach(([k, v]) => {
            if (body[k] && ['search', 'searchFields'].includes(k)) {
                body[k] += `;${v}`;
            } else {
                body[k] = v;
            }
        });

        body['searchJoin'] = 'and';

        dispatch(fetchPallets({ ...body, with: 'location' }));
    }, [dispatch, defaultParams]);

    const handleSelect = option => {
        onChange && onChange(option.value);
    };

    return (
        <TMNBaseSelect
            value={value}
            label={showLabel && trans("warehouse.pallet.find")}
            className="select-pallet"
            placeholder={trans("warehouse.pallet.find")}
            options={palletOptions}
            onChange={handleSelect}
            loading={loading}
            onFetchData={fetchOptions}
            {...props}
        />
    );
};

SelectPallet.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.any,
    showLabel: PropTypes.bool
};

export default SelectPallet;
