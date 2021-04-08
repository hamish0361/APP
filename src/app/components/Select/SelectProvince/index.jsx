import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import useTrans from 'helper/useTrans';
import { useProvince } from 'helper/useLocation';

import TMNBaseSelect from '../BaseSelect';

const SelectProvince = ({ onChange, value, showLabel = true, ...props }) => {
    const [province, loading] = useProvince();
    const [trans] = useTrans();

    const makeOption = useCallback((item) => ({
        value: item.province_id,
        label: item.province_name
    }), []);

    const provinceOptions = province?.map(item => makeOption(item));

    const handleSelectProvince = option => {
        onChange && onChange(option.value);
    };

    return (
        <TMNBaseSelect
            value={value}
            label={showLabel && trans("common.province")}
            className="select-province"
            placeholder={trans("common.select_here")}
            options={provinceOptions}
            onChange={handleSelectProvince}
            loading={loading}
            typeSearch='province_name'
            {...props}
        />
    );
};

SelectProvince.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.any,
    showLabel: PropTypes.bool
};

export default SelectProvince;
