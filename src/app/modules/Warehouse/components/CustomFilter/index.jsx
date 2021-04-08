import React, { useCallback, useState, forwardRef, useImperativeHandle } from 'react';

import _ from 'lodash';

import './index.scss'

const CustomFilter = ({ fields, onSearch, searchAll = true }, ref) => {


    const [searchText, setSearchText] = useState('');
    const [searchField, setSearchField] = useState(searchAll ? '' : fields?.[0]?.id);

    const dispatchSearch = useCallback(_.debounce((_searchText, _searchField) => {
        if (_searchField.length && _searchText.length) {
            onSearch && onSearch({ search: `${_searchField}:${_searchText}`, searchFields: `${_searchField}:like` });
        } else {
            onSearch && onSearch({ search: _searchText });
        }
    }, 700), []);

    useImperativeHandle(ref, () => ({
        reset: () => {
            setSearchText('');
            setSearchField(searchAll ? '' : fields?.[0]?.id);
        }
    }))

    const handleSearchTextChange = (e) => {
        setSearchText(e.target.value);

        dispatchSearch(e.target.value, searchField);
    }

    const handleSearchFieldChange = (e) => {
        setSearchField(e.target.value);

        if (searchText.length) {
            setSearchText('');
            dispatchSearch('', e.target.value);
        }
    }

    return (
        <div className="form-group row custom-filter-warehouse">
            <div className="col-lg-4 col-md-4 col-sm-4">
                <select name="searchField" id="searchField" className="form-control" onChange={handleSearchFieldChange} value={searchField}>
                    {searchAll ? (<option value="">All</option>) : ''}
                    {(fields || []).map((f, idx) => (
                        <option value={f.id} key={`search-field-${idx}`}>{f.title}</option>
                    ))}
                </select>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-8">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search"
                    onChange={handleSearchTextChange}
                    value={searchText}
                />
            </div>
        </div>
    );
};

export default forwardRef(CustomFilter);