import React from 'react';

import FilterList from './FilterList';
import TableSKU from './TableSKU';
import FilterExtraData from './FilterExtraData';
import SFACreatedToday from './SFACreatedToday';
import BoxCreatedToday from './BoxCreatedToday';
import TrackingWillComingToday from './TrackingWillComingToday';
import RequestPackingBox from './RequestPackingBox';
import JobCheckingList from './JobCheckingList';

import './index.scss';

const WHDashboard = props => {
    return (
        <div className="p-4 wh-dashboard">
            <div className="row">
                <div className="col-lg-4 com-sm-12">
                    <SFACreatedToday />
                </div>
                <div className="col-lg-4 com-sm-12">
                    <BoxCreatedToday />
                </div>
                <div className="col-lg-4 com-sm-12">
                    <TrackingWillComingToday />
                </div>
            </div>

            <div className="row">
                <div className="col-lg-6 col-sm-12">
                    <RequestPackingBox />
                </div>
                <div className="col-lg-6 col-sm-12">
                    <JobCheckingList />
                </div>
            </div>

            <FilterList />
            <FilterExtraData />
            <TableSKU />
        </div>
    );
};

WHDashboard.propTypes = {

};

export default WHDashboard;