import React from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';

import RDatePicker from "react-datepicker";

const DatePicker = ({ value, onChange, formater, ...props }) => {

    const handleChange = (date) => {
        if (formater) onChange(moment(date).format(formater));
        else onChange(date);
    }

    return (
        <div>
            <RDatePicker
                style={{ width: "100%" }}
                selected={value ? new Date(value) : null}
                onChange={handleChange}
                className="form-control w-100"
                {...props}
            />
        </div>
    );
};

DatePicker.propTypes = {
    value: PropTypes.any,
    onChange: PropTypes.func,
    formater: PropTypes.string,
};

export default DatePicker;