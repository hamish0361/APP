import { DateRangePicker } from 'materialui-daterange-picker';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import Select from 'react-select';

TopFilter.propTypes = {
    onSearch: PropTypes.func
};

const options = [
    { value: 'date', label: 'Từ ngày - đến ngày' },
    { value: 'user', label: 'Người dùng' },
    { value: 'prepared_by', label: 'Người thực hiện' },
    { value: 'description', label: 'Mô tả' },
    { value: 'type', label: 'Loại' }
];

function TopFilter({ onSearch }) {
    const ref = useRef(null);
    const { typeList } = useSelector(
        ({ accounting }) => ({ typeList: accounting.transaction.typeList }),
        shallowEqual
    );

    const [values, setValues] = useState({
        type: 'date',
        status: '',
        search: ''
    });

    const [open, setOpen] = React.useState(false);

    const [dateRange, setDateRange] = useState(null);

    const handleChangeSearch = e => {
        const value = e.target.value;
        setValues({
            ...values,
            search: value
        });
        if (ref.current) {
            clearTimeout(ref.current);
        }
        ref.current = setTimeout(() => {
            if (onSearch && value.length > 0) {
                switch (values.type) {
                    case 'user':
                        onSearch({
                            search: `user_id:${value}`,
                            searchFields: 'user_id:like'
                        });
                        break;
                    case 'prepared_by':
                        onSearch({
                            search: `prepared_by:${value}`,
                            searchFields: 'prepared_by:like'
                        });
                        break;
                    default:
                        onSearch({
                            search: `description:${value}`,
                            searchFields: `description:like`
                        });
                        break;
                }
            } else {
                onSearch({
                    search: ''
                });
            }
        }, 500);
    };

    const handleSelectType = type => {
        setValues({
            ...values,
            type: type.value,
            search: ''
        });
        setDateRange(null);
        onSearch({ search: '' });
    };

    const handleSelectTypeSearch = type => {
        onSearch({
            search: `type_id:${type.value}`,
            searchFields: `type_id:=`
        });
        setOpen(false);
    };

    // date range
    const handleDateChange = ({ startDate, endDate }) => {
        const start = moment(startDate).format('yyyy-MM-DD');
        const end = moment(endDate).format('yyyy-MM-DD');

        setDateRange({
            startDate: start,
            endDate: end
        });
        setOpen(false);
        const params = {
            search: `created_at:${start},${end}`,
            searchFields: 'created_at:between'
        };
        onSearch(params);
    };

    const typeOptions = typeList.map(item => {
        return {
            value: item.id,
            label: item.name
        };
    });

    const toggle = () => setOpen(!open);

    return (
        <>
            <div className="form-group row">
                <div className="col-lg-2 col-md-3">
                    <Select
                        defaultValue={options[0]}
                        options={options}
                        onChange={handleSelectType}
                    />
                </div>
                {values.type === 'type' ? (
                    <div className="col-lg-10 col-md-9">
                        <Select
                            placeholder="Chọn loại"
                            options={typeOptions}
                            onChange={handleSelectTypeSearch}
                        />
                    </div>
                ) : values.type === 'date' ? (
                    <div className="col-lg-10 col-md-9">
                        <div className="position-absolute">
                            <DateRangePicker
                                open={open}
                                toggle={toggle}
                                onChange={handleDateChange}
                            />
                        </div>
                        <div
                            className="form-control d-flex justify-content-between align-items-center"
                            onClick={() => setOpen(true)}
                        >
                            <span>
                                {dateRange
                                    ? `${dateRange?.startDate} - ${dateRange?.endDate}`
                                    : 'Chọn thời gian tìm kiếm'}
                            </span>
                            <i className="flaticon-event-calendar-symbol" />
                        </div>
                    </div>
                ) : (
                    <div className="col-lg-10 col-md-9">
                        <input
                            type="text"
                            name="search"
                            value={values.search}
                            className="form-control"
                            placeholder="Nhập tìm kiếm"
                            onChange={handleChangeSearch}
                        />
                    </div>
                )}
            </div>
        </>
    );
}

export default TopFilter;
