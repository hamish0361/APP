import React from 'react';

import useTrans from 'helper/useTrans';

import Layout from '../../components/Layout';
import SimpleTabs, { TabPanel } from 'app/components/Tabs/Simple';
import DefaultAgency from './DefaultAgency';
import PrinterSettings from './PrinterSettings';
import LocationManagament from './LocationManagement';
import { Card, CardBody } from '_metronic/_partials/controls';
import PalletType from './PalletType';
import AreaManagement from './AreaManagement';
import ShelveManagement from './ShelveManagement';
import ShipmentMethodManagement from './ShipmentMethodManagement';
import NeedPermission from 'app/components/NeedPermission';
import NotHavePermission from 'app/components/NeedPermission/NotHavePermission';

const SettingPage = props => {

    const [trans] = useTrans();

    return (
        <Layout title={trans("MENU.WAREHOUSE.SETTINGS")}>
            <div className="settings-page">

                <SimpleTabs labels={[
                    trans("warehouse.settings.common.title"),
                    trans("warehouse.location.title"),
                    trans("warehouse.pallet_type.title"),
                    trans("warehouse.area.title"),
                    trans("warehouse.shelve.title"),
                    trans("warehouse.shipment_method.title")
                ]}>
                    <TabPanel>
                        <NeedPermission need={['sfas']} fallback={<NotHavePermission />}>
                            <Card>
                                <CardBody>
                                    <DefaultAgency />
                                    <PrinterSettings />
                                </CardBody>
                            </Card>
                        </NeedPermission>
                    </TabPanel>

                    <TabPanel>
                        <NeedPermission need={['locations.index']} fallback={<NotHavePermission />}>
                            <LocationManagament />
                        </NeedPermission>
                    </TabPanel>

                    <TabPanel>
                        <NeedPermission need={['pallet-types.index']} fallback={<NotHavePermission />}>
                            <PalletType />
                        </NeedPermission>
                    </TabPanel>

                    <TabPanel>
                        <NeedPermission need={['areas']} fallback={<NotHavePermission />}>
                            <AreaManagement />
                        </NeedPermission>
                    </TabPanel>

                    <TabPanel>
                        <NeedPermission need={['shelves']} fallback={<NotHavePermission />}>
                            <ShelveManagement />
                        </NeedPermission>
                    </TabPanel>

                    <TabPanel>
                        <NeedPermission need={['shipment-methods']} fallback={<NotHavePermission />}>
                            <ShipmentMethodManagement />
                        </NeedPermission>
                    </TabPanel>

                </SimpleTabs>

            </div>
        </Layout>
    );
};

SettingPage.propTypes = {};

export default SettingPage;
