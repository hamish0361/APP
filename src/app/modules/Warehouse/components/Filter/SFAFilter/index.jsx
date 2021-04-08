import React, { useCallback, useState, forwardRef, useImperativeHandle, useMemo } from 'react';
import { useSelector } from 'react-redux';

import _ from 'lodash';
import useTrans from 'helper/useTrans';



const SFAFilter = ({ onSearch, searchAll = true }, ref) => {

    const [searchText, setSearchText] = useState('');
    const [trans] = useTrans();

    const fields = useMemo(() => ([
        { id: 'id', title: trans("warehouse.sfa.id") },
        { id: 'tracking', title: trans("warehouse.tracking.id") },
        { id: 'agency_id', title: trans("common.agency") },
    ]), [trans]);

    const [searchField, setSearchField] = useState(searchAll ? '' : fields?.[0]?.id);
    const agencies = useSelector(state => state.warehouse.agency.list);

    // eslint-disable-next-line react-hooks/exhaustive-deps
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

    const getSearchFieldCpn = useMemo(() => {
        if (searchField === 'agency_id')
            return (
                <select onChange={handleSearchTextChange} className="form-control">
                    <option value="">{trans('common.all')}</option>
                    {agencies.map((agency, idx) => (
                        <option value={agency.id} key={`agency-idx-${idx}`}>{agency.name}</option>
                    ))}
                </select>
            )

        return (
            <input
                type="text"
                className="form-control"
                placeholder="Search"
                onChange={handleSearchTextChange}
                value={searchText}
            />
        )
    }, [searchField, searchText, agencies]); // eslint-disable-line

    return (
        <div className="d-flex custom-filter-warehouse">
            <div className="p-3">
                <select name="searchField" id="searchField" className="form-control" onChange={handleSearchFieldChange} value={searchField}>
                    {searchAll ? (<option value="">{trans('common.all')}</option>) : ''}
                    {(fields || []).map((f, idx) => (
                        <option value={f.id} key={`search-field-${idx}`}>{f.title}</option>
                    ))}
                </select>
            </div>
            <div className="p-3 flex-grow-1">
                {getSearchFieldCpn}
            </div>
        </div>
    );
};

export default forwardRef(SFAFilter);