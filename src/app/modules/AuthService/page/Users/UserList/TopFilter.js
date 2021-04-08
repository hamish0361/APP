import CustomFilter from 'app/components/CustomFilter';
import DatePicker from 'react-datepicker';
import { fetchUserStatus } from 'app/modules/AuthService/auth-service-redux/userSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import moment from 'moment';
import './index.scss';

function TopFilter({ handleSubmitSearch, intl }) {
    const options = [
        {
            value: 'all',
            label: `${intl.formatMessage({
                id: 'AUTH_SERVICE.USER_LIST.TOPFILTER.ALL'
            })}`
        },
        {
            value: 'id',
            label: `${intl.formatMessage({
                id: 'AUTH_SERVICE.USER_LIST.TOPFILTER.USER_ID'
            })}`
        },
        {
            value: 'email',
            label: `${intl.formatMessage({
                id: 'AUTH_SERVICE.USER_LIST.TOPFILTER.EMAIL'
            })}`
        },
        {
            value: 'status.id',
            label: `${intl.formatMessage({
                id: 'AUTH_SERVICE.USER_LIST.TOPFILTER.STATUS'
            })}`
        },
        {
            value: 'created_at',
            label: `${intl.formatMessage({
                id: 'AUTH_SERVICE.USER_LIST.TOPFILTER.REGISTRATION_DATE'
            })}`
        }
    ];
    const [optionSearch, setOptionSearch] = useState('');
    const [optionsStatus, setOptionsStatus] = useState([]);

    const { userStatus } = useSelector(state => state.authService.user);

    const dispatch = useDispatch();

    const handleSelect = type => {
        setOptionSearch(type.value);
        if (type.value === 'all') {
            const data = {
                option: '',
                value: ''
            };
            handleSubmitSearch(data);
        }
    };

    const handleFilter = status => {
        const data = {
            option: optionSearch,
            value: status.value
        };
        if (status.value === 'select') data.option = 'all';
        handleSubmitSearch(data);
    };

    const [date, setDate] = useState(null);
    const handleDateChange = date => {
        setDate(date);
        const dateFormat = moment(date).format('yyyy-MM-DD');
        const data = {
            option: 'created_at',
            value: dateFormat
        };
        handleSubmitSearch(data);
    };

    useEffect(() => {
        if (userStatus) {
            setOptionsStatus([
                ...userStatus.map(status => ({
                    value: status.id,
                    label: status.name
                }))
            ]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userStatus]);

    useEffect(() => {
        dispatch(fetchUserStatus());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="form-group row">
            <div className="col-lg-2 col-md-3 mb-2">
                <Select
                    defaultValue={options[0]}
                    options={options}
                    onChange={handleSelect}
                />
            </div>
            <div className="col-lg-10 col-md-9">
                {optionSearch === 'status.id' ? (
                    <Select
                        options={optionsStatus}
                        onChange={handleFilter}
                        placeholder="Chọn trạng thái tìm kiếm"
                    />
                ) : optionSearch === 'created_at' ? (
                    <div className="container-date">
                        <DatePicker
                            className="form-control"
                            selected={date}
                            dateFormat="dd-MM-yyy"
                            onChange={handleDateChange}
                        />
                    </div>
                ) : (
                    <CustomFilter
                        onSearchSubmit={value => handleFilter({ value })}
                    />
                )}
            </div>
        </div>
    );
}

export default TopFilter;
