import React from 'react';
import { useSelector } from 'react-redux';

import ListInboundPlan from '../../components/List/ListInboundPlan';

const ListTracking = props => {

    const { isLoading, trackingList } = useSelector(state => state.purchase.tracking); // eslint-disable-line

    return (
        <ListInboundPlan
            data={trackingList}
            loading={isLoading}
        />
    );
};

ListTracking.propTypes = {

};

export default ListTracking;