import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import useTrans from 'helper/useTrans';

import TMNBaseSelect from '../BaseSelect';

import './index.scss';

const SelectDateOfWeek = ({ onChange, value, showLabel = true, ...props }) => {
    const [trans] = useTrans();

    const options = useMemo(() => ([
        {value: 2, label: trans("common.monday")},
        {value: 3, label: trans("common.tuesday")},
        {value: 4, label: trans("common.wednesday")},
        {value: 5, label: trans("common.thursday")},
        {value: 6, label: trans("common.friday")},
        {value: 7, label: trans("common.saturday")},
        {value: 1, label: trans("common.sunday")},
    ]), [trans]);

    const handleSelect = option => {
        onChange && onChange(option.value);
    };

    return (
        <TMNBaseSelect
            value={value}
            label={showLabel && trans("common.day_of_week")}
            placeholder={trans("common.pick_here")}
            options={options}
            onChange={handleSelect}
            className="select-date-of-week"
            {...props}
        />
    );
};

SelectDateOfWeek.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.any,
    showLabel: PropTypes.bool
};

export default SelectDateOfWeek;
