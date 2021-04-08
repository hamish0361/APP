import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import warehouseApi from 'apis/warehouse';
import _ from 'lodash';
import { useDetailPallet } from '../context';
import clsx from 'clsx';

import LocationGrid from '../LocationGrid';
import Loading from 'app/components/Loading';
import EmptyData from 'app/components/EmptyData';
import PalletDetail from '../PalletDetail';

import './index.scss';

const ShelveItem = ({ shelve, areaName }) => {

    const [shelveItemData, setShelveItemData] = useState();
    const [loading, setLoading] = useState(false);
    const { showPallet } = useDetailPallet();

    useEffect(() => {
        if (shelve) {
            setLoading(true);
            warehouseApi.shelve.fetchShelve(shelve.id, { with: 'locations' })
                .then(res => {
                    setShelveItemData(res);
                })
                .finally(() => { setLoading(false) })
        }
    }, [shelve]);

    const groupFloor = useMemo(() => {
        return _.groupBy(shelveItemData?.locations || [], 'floor');
    }, [shelveItemData]);

    return (
        <div className={clsx("shelve-item-card position-relative", showPallet && 'pallet-content')}>
            <PalletDetail />
            <div className="shelve-head position-relative">
                <div className="shelve-name"><span className="shelve-prefix">Shelve</span><span className="shelve-id">{shelve.id}</span></div>
                <div className="extends-data">
                    <div className="shelve-position">
                        F{shelve.floor} . R{shelve.row} . C{shelve.column}
                    </div>
                    <div className="area-name">{areaName}</div>
                </div>
            </div>
            <div className="position-relative shelve-content">
                {loading && <Loading local />}
                {Object.entries(groupFloor).map(([floor, floorLocations], lIdx) => (
                    <div key={`grid-location-${lIdx}`} className="shelve-floor">
                        <div className="floor-name">F.{floor}</div>
                        <LocationGrid locations={floorLocations} />
                    </div>
                ))}
                {!Object.keys(groupFloor).length && <EmptyData />}
            </div>
        </div>
    );
};

ShelveItem.propTypes = {
    shelve: PropTypes.any,
    areaName: PropTypes.string,
};

export default ShelveItem;