import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';

TopFilter.propTypes = {
    onSearch: PropTypes.func
};

function TopFilter({ onSearch, intl }) {
    const ref = useRef(null);

    const [values, setValues] = useState({
        type: 'user',
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
                    case 'user':
                        onSearch({
                            search: `user_id:${value}`,
                            searchFields: `user_id:like`
                        });
                        break;
                    default:
                        onSearch({
                            search: `user.email:${value}`,
                            searchFields: `user.email:like`
                        });
                        break;
                }
            } else {
                onSearch({
                    search: ``
                });
            }
        }, 500);
    };

    return (
        <div className="form-group row">
            <div className="col-12">
                <input
                    type="text"
                    name="search"
                    value={values.search}
                    className="form-control"
                    placeholder={intl.formatMessage({
                        id: 'GLOBAL.SEARCH.PLACEHOLER_INPUT'
                    })}
                    onChange={handleChangeSearch}
                />
            </div>
        </div>
    );
}

export default TopFilter;
