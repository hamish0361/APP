import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import InboundPlanItem from './InboundPlanItem';
import Loading from 'app/components/Loading';
import EmptyData from 'app/components/EmptyData';

import './index.scss';

const ListInboundPlan = ({ data, loading }) => {

    const checkedData = useMemo(() => {
        return data.filter(d => d.id);
    }, [data]);

    return (
        <div className="list-inbound-plan position-relative">
            {loading && <Loading local />}
            {!data?.length ? (
                <EmptyData />
            ) : ''}
            {checkedData.map((trackingItem, idx) => (
                <div className="col-lg-6 col-sm-12" key={`tracking-item-${idx}`}>
                    <InboundPlanItem data={trackingItem} />
                </div>
            ))}
        </div>
    );
};

ListInboundPlan.propTypes = {
    data: PropTypes.array,
    loading: PropTypes.bool,
};

export default ListInboundPlan;