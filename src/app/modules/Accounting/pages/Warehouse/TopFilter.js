import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import Select from 'react-select';

TopFilter.propTypes = {
    onSearch: PropTypes.func
};

const options = [
    { value: 'name', label: 'Tên thẻ' },
    { value: 'code', label: 'Mã thẻ' },
    { value: 'bank', label: 'Ngân hàng' },
    { value: 'balance', label: 'Số dư' }
];

function TopFilter({ onSearch }) {
    const ref = useRef(null);

    const [values, setValues] = useState({
        type: 'name',
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
                    case 'name':
                        onSearch({
                            search: `name:${value}`
                        });
                        break;
                    case 'code':
                        onSearch({
                            search: ``
                        });
                        break;
                    case 'balance':
                        onSearch({
                            search: ``
                        });
                        break;
                    default:
                        onSearch({
                            search: ``
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
        onSearch({ search: '' });
    };

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
                <div className="col-lg-10 col-md-9">
                    <input
                        value={values.search}
                        className="form-control"
                        placeholder="Nhập tìm kiếm"
                        onChange={handleChangeSearch}
                    />
                </div>
            </div>
        </>
    );
}

export default TopFilter;
