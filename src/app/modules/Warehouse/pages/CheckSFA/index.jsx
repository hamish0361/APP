import useTrans from 'helper/useTrans';
import React from 'react';
import Layout from '../../components/Layout';
import TableSFAs from './TableSFAs';

const CheckSFAPage = props => {

    const [trans] = useTrans();

    return (
        <Layout title={trans("MENU.WAREHOUSE.CHECKING_GOODS")}>
            <TableSFAs />
        </Layout>
    );
};

CheckSFAPage.propTypes = {
    
};

export default CheckSFAPage;