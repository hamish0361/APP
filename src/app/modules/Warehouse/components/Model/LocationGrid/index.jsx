import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';

import _ from 'lodash';

import LocationItem from '../LocationItem';

import './index.scss';

const LocationGrid = ({ locations }) => {

    const groupRow = useMemo(() => {
        return _.groupBy(locations, 'row');
    }, [locations]);

    const maxRow = useMemo(() => {
        return _.maxBy(locations, 'row').row;
    }, [locations]);

    const renderColumnLocation = useCallback((rowLocations, rowIdx) => {

        let maxColumn = _.maxBy(rowLocations, 'column').column;

        return (
            <div className="grid-location-row" key={`grid-location-row-${rowIdx}`}>
                {_.range(1, maxColumn + 1, 1).map((columnIdx) => {

                    let location = _.find(rowLocations, ['column', columnIdx]);

                    if (location) return <LocationItem location={location} key={`grid-location-col-${columnIdx}`} />

                    return <div className="location-item empty-location-item" key={`grid-location-col-${columnIdx}`}>C.{columnIdx}</div>
                })}
            </div>
        );
    }, []); // eslint-disable-line

    return (
        <div className="location-grid">
            <div className="grid-location-container">
                {_.range(1, maxRow + 1, 1).map((rowIdx) => {
                    if (groupRow[rowIdx]) {
                        return renderColumnLocation(groupRow[rowIdx], rowIdx)
                    }

                    return <div className="grid-location-row empty-row" key={`empty-grid-location-${rowIdx}`}>R.{rowIdx}</div>
                })}
            </div>
        </div>
    );
};

LocationGrid.propTypes = {
    locations: PropTypes.array,
};

export default LocationGrid;