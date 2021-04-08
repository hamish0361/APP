
import React from 'react';

import useTrans from 'helper/useTrans';

import Layout from '../../components/Layout';
import SimpleTabs, { TabPanel } from 'app/components/Tabs/Simple';
import SKUInventory from './SKUInventory';
import ProductInventory from './ProductInventory';

const InventoryPage = props => {

    const [trans] = useTrans();

    return (
        <Layout title={trans("warehouse.inventory.title")}>
            <SimpleTabs labels={[
                trans("warehouse.sku.title"),
                trans("GLOBAL.FILTER.PRODUCT")
            ]}>
                <TabPanel>
                    <SKUInventory />
                </TabPanel>

                <TabPanel>
                    <ProductInventory />
                </TabPanel>
            </SimpleTabs>
        </Layout>
    );
};

InventoryPage.propTypes = {

};

export default InventoryPage;