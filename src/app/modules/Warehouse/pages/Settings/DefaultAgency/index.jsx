import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { settingsAction } from 'app/modules/Warehouse/warehouse-redux/settingSlice';
import _ from 'lodash';

import Select from 'react-select';

import './index.scss';
import useTrans from 'helper/useTrans';

const DefaultAgency = props => {
    const agencyList = useSelector(state => state.warehouse.agency.list);
    const default_agency = useSelector(
        state => state.warehouse.settings.default_agency
    );
    const [value, setValue] = useState();

    const dispatch = useDispatch();
    const [trans] = useTrans();

    useEffect(() => {

        if(!value?.value) return;

        if (value?.value !== default_agency) dispatch(settingsAction.changeDefaultAgency(value?.value));
    }, [value, default_agency]); // eslint-disable-line

    useEffect(() => {
        if (!agencyList.length || !default_agency) return;

        if (value) return;

        const matchedDefaultAgency = _.find(agencyList, ['id', default_agency]);

        if (matchedDefaultAgency) setValue({ label: matchedDefaultAgency.name, value: matchedDefaultAgency.id });

    }, [agencyList, default_agency, value]);

    const handleChange = (selectedOptions) => {
        setValue(selectedOptions)
    };

    const selectOptions = useMemo(() => {
        return agencyList.map(agency => ({
            label: agency.name,
            value: agency.id
        }))
    }, [agencyList]);

    return (
        <div className="row default-agency">
            <div className="col-lg-4 custom-label">{trans("warehouse.settings.default_agency")}:</div>
            <div className="col-lg-6">
                <Select
                    className="react-cm-select"
                    value={value}
                    options={selectOptions}
                    onChange={handleChange}
                />
            </div>
        </div>
    );
};

DefaultAgency.propTypes = {};

export default DefaultAgency;
