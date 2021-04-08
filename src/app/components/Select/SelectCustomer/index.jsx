import React from 'react';
import PropTypes from 'prop-types';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import { fetchUsers } from 'app/modules/AuthService/auth-service-redux/userSlice';
import useTrans from 'helper/useTrans';

import TMNBaseSelect from '../BaseSelect';

import './index.scss';

const SelectCustomer = ({ onChange, value, showLabel = true, ...props }) => {
    const { customerList } = useSelector(
        ({ authService }) => ({
            customerList: authService.user.userList
        }),
        shallowEqual
    );
    const dispatch = useDispatch();
    const [trans] = useTrans();

    const customerOptions = customerList?.map(item => {
        return {
            value: item.id,
            label: item.email
        };
    });

    const handleSelectCustomer = option => {
        onChange && onChange(option.value);
    };

    const fetchData = (params) => {
        dispatch(fetchUsers(params));
    }

    return (
        <TMNBaseSelect
            value={value}
            label={showLabel && trans("common.customer_info")}
            placeholder={trans("common.pick_here")}
            options={customerOptions}
            onChange={handleSelectCustomer}
            className="select-customer"
            typeSearch="id"
            onFetchData={fetchData}
            {...props}
        />
    );
};

SelectCustomer.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.any,
    showLabel: PropTypes.bool
};

export default SelectCustomer;
