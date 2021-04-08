import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router';

import warehouseApi from 'apis/warehouse';
import queryString from 'query-string';

import Loading from 'app/components/Loading';
import PalletItem from '../PalletItem';

import './index.scss';
import clsx from 'clsx';

const LocationItem = ({ location }) => {

    const [locationData, setLocationData] = useState();
    const [loading, setLoading] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const routerLocation = useLocation();

    useEffect(() => {
        if(routerLocation.search) {
            let search = queryString.parse(routerLocation.search);

            if(search['locations.id'] === location.id) 
                setIsActive(true);
        }
    }, [routerLocation]); // eslint-disable-line

    useEffect(() => {
        if (location) {
            setLoading(true);
            warehouseApi.location.fetchLocation(location.id, { with: 'pallets.pivotBoxes' })
                .then(res => {
                    setLocationData(res);
                })
                .finally(() => { setLoading(false) });
        }
    }, [location]);

    return (
        <div className={clsx("location-item position-relative", isActive && 'active')}>
            {loading && <Loading local />}

            {locationData?.pallets?.length ? locationData.pallets.map((p, idx) => (
                <PalletItem pallet={p} key={`pallet-item-${idx}`} />
            )) : (
                    <div className="empty-location">{locationData?.id}</div>
                )}
        </div>
    );
};

LocationItem.propTypes = {
    location: PropTypes.any
};

export default LocationItem;