import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';

import useTrans from 'helper/useTrans';
import { useDistrict } from 'helper/useLocation';

import TMNBaseSelect from '../BaseSelect';

const SelectDistrict = ({ onChange, value, province_id, showLabel = true, disabled, ...props }) => {
    const [district, loading] = useDistrict(province_id);
    const [trans] = useTrans();

    const makeOption = useCallback((item) => ({
        value: item.district_id,
        label: item.district_name
    }), []);

    const districtOptions = district?.map(item => makeOption(item));

    const handleSelectDistrict = option => {
        onChange && onChange(option.value);
    };

    const isDisabled = useMemo(() => {
        return disabled || !province_id;
    }, [province_id, disabled]);

    return (
        <TMNBaseSelect
            value={value}
            label={showLabel && trans("common.district")}
            className="select-district"
            placeholder={trans("common.select_here")}
            options={districtOptions}
            onChange={handleSelectDistrict}
            loading={loading}
            typeSearch='district_name'
            isDisabled={isDisabled}
            {...props}
        />
    );
};

SelectDistrict.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.any,
    showLabel: PropTypes.bool
};

export default SelectDistrict;
