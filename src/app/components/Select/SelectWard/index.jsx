import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';

import useTrans from 'helper/useTrans';
import { useWard } from 'helper/useLocation';

import TMNBaseSelect from '../BaseSelect';

const SelectWard = ({ onChange, value, district_id, showLabel = true, disabled, ...props }) => {
    const [ward, loading] = useWard(district_id);
    const [trans] = useTrans();

    const makeOption = useCallback((item) => ({
        value: item.ward_id,
        label: item.ward_name
    }), []);

    const wardOptions = ward?.map(item => makeOption(item));

    const handleSelectWard = option => {
        onChange && onChange(option.value);
    };

    const isDisabled = useMemo(() => {
        return disabled || !district_id;
    }, [district_id, disabled]);

    return (
        <TMNBaseSelect
            value={value}
            label={showLabel && trans("common.ward")}
            className="select-ward"
            placeholder={trans("common.select_here")}
            options={wardOptions}
            onChange={handleSelectWard}
            loading={loading}
            typeSearch='ward_name'
            isDisabled={isDisabled}
            {...props}
        />
    );
};

SelectWard.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.any,
    showLabel: PropTypes.bool
};

export default SelectWard;
