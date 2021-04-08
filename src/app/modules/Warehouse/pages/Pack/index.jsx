import useTrans from 'helper/useTrans';
import React from 'react';
import Layout from '../../components/Layout';
import TableSFAs from './TableSFAs';

const PackPage = props => {

    const [trans] = useTrans();

    return (
        <Layout title={trans("warehouse.packing_goods")}>
            <TableSFAs />
        </Layout>
    );
};

PackPage.propTypes = {
    
};

export default PackPage;