import NeedPermission from 'app/components/NeedPermission';
import useTrans from 'helper/useTrans';
import React from 'react';
import Layout from '../../components/Layout';
import ListTracking from './ListTracking';
import TrackingFilter from './TrackingFilter';
import TrackingPickedSection from './TrackingPickedSection';

const InboundPlanPage = props => {

    const [trans] = useTrans();

    return (
        <Layout title={trans("MENU.WAREHOUSE.SCHEDULE")}>
            <TrackingFilter />
            <NeedPermission need={['sfas.create', 'sfas.update']}>
                <TrackingPickedSection />
            </NeedPermission>
            <ListTracking />
        </Layout>
    );
};

InboundPlanPage.propTypes = {

};

export default InboundPlanPage;