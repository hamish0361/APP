import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import TMNBaseSelect from 'app/components/Select/BaseSelect';

import './index.scss';

const SelectBox = ({ onChange }) => {

    const sfa = useSelector(state => state.warehouse.sfa.detail.data);
    const currentBox = useSelector(state => state.warehouse.box.detail.data);

    const getOptions = useMemo(() => {
        if (!sfa?.boxes?.length) return [];

        return sfa.boxes.map(i => ({ value: i.id, label: i.id }))
    }, [sfa]); // eslint-disable-line

    const handleChange = (option) => {
        onChange && onChange(option);
    }

    return (
            <TMNBaseSelect
                className="select-box"
                value={currentBox?.id}
                options={getOptions}
                onChange={handleChange}
            />
    );
};

SelectBox.propTypes = {
    onChange: PropTypes.func
};

export default SelectBox;