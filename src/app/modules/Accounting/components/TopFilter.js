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
    { value: 'method', label: 'Thẻ' },
    { value: 'receipt', label: 'Chứng từ' },
    { value: 'type', label: 'Loại' }
];

function TopFilter({ onSearch }) {
    const ref = useRef(null);
    const { statusList } = useSelector(
        ({ order }) => ({ statusList: order.status.list }),
        shallowEqual
    );

    const [values, setValues] = useState({
        type: 'all',
        status: '',
        search: ''
    });

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
                    case 'date':
                        onSearch({
                            search: `director.type.id:wholesale;id:${value}`,
                            searchFields: 'id:like;director.type.id:='
                        });
                        break;
                    case 'user':
                        onSearch({
                            search: `director.type.id:wholesale;customer_id:${value}`,
                            searchFields: 'customer_id:like;director.type.id:='
                        });
                        break;
                    case 'prepared_by':
                        onSearch({
                            search: `director.type.id:wholesale;note:${value}`,
                            searchFields: 'note:like;director.type.id:='
                        });
                        break;
                    case 'description':
                        onSearch({
                            search: `director.type.id:wholesale;items.product_id:${value}`,
                            searchFields: `items.product_id:like;director.type.id:=`
                        });
                        break;
                    case 'method':
                        onSearch({
                            search: `director.type.id:wholesale;items.product_id:${value}`,
                            searchFields: `items.product_id:like;director.type.id:=`
                        });
                        break;
                    case 'receipt':
                        onSearch({
                            search: `director.type.id:wholesale;items.product_id:${value}`,
                            searchFields: `items.product_id:like;director.type.id:=`
                        });
                        break;
                    default:
                        onSearch({
                            search: `director.type.id:wholesale;${value}`,
                            searchFields: `director.type.id:=`
                        });
                        break;
                }
            } else {
                onSearch({
                    search: `director.type.id:wholesale`
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
        onSearch({ search: `director.type.id:wholesale` });
    };

    const handleSelectStatus = status => {
        if (status.value === 'all') {
            onSearch({
                search: `director.type.id:wholesale`,
                searchFields: `director.status.name:like`
            });
        } else {
            onSearch({
                search: `director.type.id:wholesale;director.status.id:${status.value}`,
                searchFields: `director.type.id:=;director.status.id:=`
            });
        }
    };

    const statusOptions = statusList.map(item => {
        return {
            value: item.id,
            label: item.name
        };
    });

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
                {values.type === 'status' ? (
                    <div className="col-lg-10 col-md-9">
                        <Select
                            options={statusOptions}
                            onChange={handleSelectStatus}
                        />
                    </div>
                ) : (
                    <div className="col-lg-10 col-md-9">
                        <input
                            type="text"
                            name="search"
                            value={values.search}
                            className="form-control"
                            placeholder="Search..."
                            onChange={handleChangeSearch}
                        />
                    </div>
                )}
            </div>
        </>
    );
}

export default TopFilter;
