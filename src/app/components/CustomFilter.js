import PropTypes from 'prop-types';
import React, { useRef } from 'react';

CustomFilter.propTypes = {
    onSearchSubmit: PropTypes.func
};

function CustomFilter({ onSearchSubmit = null }) {
    const ref = useRef(null);

    const handleChange = e => {
        const value = e.target.value;

        if (ref.current) {
            clearTimeout(ref.current);
        }

        ref.current = setTimeout(() => {
            if (onSearchSubmit) onSearchSubmit(value);
        }, 500);
    };

    return (
        <input
            type="text"
            className="form-control"
            placeholder="Nhập tìm kiếm"
            onChange={handleChange}
        />
    );
}

export default CustomFilter;
