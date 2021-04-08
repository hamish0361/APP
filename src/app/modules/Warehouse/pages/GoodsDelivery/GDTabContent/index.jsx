import React from 'react';

import useTrans from 'helper/useTrans';

import Layout from 'app/modules/Warehouse/components/Layout';
import ListGoodsDelivery from '../ListGoodsDelivery';
import SimpleTabs, { TabPanel } from 'app/components/Tabs/Simple';
import DeliveryPartners from '../DeliveryPartners';
import NeedPermission from 'app/components/NeedPermission';
import PlaceOfDelivery from '../PlaceOfDelivery';

const GDTabContent = props => {

    const [trans] = useTrans();

    return (
        <Layout title={trans("MENU.WAREHOUSE.GOODS_DELIVERY")}>
            <SimpleTabs labels={[
                trans("MENU.WAREHOUSE.GOODS_DELIVERY"),
                trans("warehouse.delivery_partner.title"),
                trans("warehouse.place_of_delivery.title")
            ]}>
                <TabPanel>
                    <NeedPermission need={["goods-deliveries.index"]}>
                        <ListGoodsDelivery />
                    </NeedPermission>
                </TabPanel>

                <TabPanel>
                    <NeedPermission need={["delivery-partners.index"]}>
                        <DeliveryPartners />
                    </NeedPermission>
                </TabPanel>

                <TabPanel>
                    <NeedPermission need={["place-of-deliveries.index"]}>
                        <PlaceOfDelivery />
                    </NeedPermission>
                </TabPanel>
            </SimpleTabs>
        </Layout>
    );
};

GDTabContent.propTypes = {

};

export default GDTabContent;