import React from 'react';

import useTrans from 'helper/useTrans';

import Layout from '../../components/Layout';
import SimpleTabs, { TabPanel } from 'app/components/Tabs/Simple';
import TableSFAs from './TableSFAs';
import DirectStorage from './DirectStorage';
import NeedPermission from 'app/components/NeedPermission';

const StorageSFAPage = props => {

    const [trans] = useTrans();

    return (
        <Layout title={trans("warehouse.storage_goods")}>
            <SimpleTabs labels={[
                trans("warehouse.storage_sfa.direct_storage.title"),
                trans("warehouse.sfa.list")
            ]}>
                <TabPanel>
                    <NeedPermission need={['pallets.update']}>
                        <DirectStorage />
                    </NeedPermission>
                </TabPanel>
                <TabPanel>
                    <TableSFAs />
                </TabPanel>
            </SimpleTabs>
        </Layout>
    );
};

StorageSFAPage.propTypes = {

};

export default StorageSFAPage;