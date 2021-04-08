import DialogNotify from 'app/components/DialogNotify';
import React, { Suspense, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect, Switch } from 'react-router-dom';
import { ContentRoute, LayoutSplashScreen } from '../../../../_metronic/layout';
import { fetchAgencies } from '../warehouse-redux/agencySlice';
import { fetchShipmentMethods } from '../warehouse-redux/shipmentMethodSlice';
import CheckSFAPage from './CheckSFA';
import ClassifyBoxPage from './ClassifyBox';
import WHDashboard from './Dashboard';
import DownContainer from './DownContainer';
import GoodsDelivery from './GoodsDelivery';
import InboundPlanPage from './InboundPlan';
import InvoicePage from './Invoice';
import LadingBillPage from './LadingBill';
import LoadUpContainerPage from './LoadUpContainer';
import OutBoundPicker from './OutBoundPicker';
import PackPage from './Pack';
import PerformEntryPage from './PerformEntry';
import SettingsPage from './Settings';
import StorageSFAPage from './StorageSFA';
import WarehouseModelPage from './WarehouseModel';
import ErrorPage from 'app/modules/Error/ErrorPage';
import InventoryPage from './Inventory';

export default function WarehousePage() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAgencies());
        dispatch(fetchShipmentMethods());
    }, []); // eslint-disable-line

    return (
        <div>
            <DialogNotify
                variant="default"
                size="large"
                position={{ vertical: 'top', horizontal: 'right' }}
            />
            <Suspense fallback={<LayoutSplashScreen />}>
                <Switch>
                    <Redirect exact={true} from="/warehouse" to="/warehouse/dashboard" />
                    <ContentRoute path="/warehouse/dashboard" component={WHDashboard} need={['sfas']} />

                    {/* Kiểm tra tồn kho */}
                    <ContentRoute path="/warehouse/inventory" component={InventoryPage} need={['sfas']} />

                    {/* Dự kiến nhận hàng */}
                    <ContentRoute path="/warehouse/wh-plan" component={InboundPlanPage} need={['sfas']} />

                    {/* Nhập kho */}
                    <ContentRoute path="/warehouse/inbound" component={PerformEntryPage} need={['boxes.index']} />

                    {/* Kiểm hàng */}
                    <ContentRoute path="/warehouse/check-sfas" component={CheckSFAPage} need={['boxes.index']} permissionJoin='and' />

                    {/* Lưu hàng */}
                    <ContentRoute path="/warehouse/storage-sfas" component={StorageSFAPage} need={['boxes.update', 'pallets.create', 'pallets.update']} permissionJoin='and' />

                    {/* Phân hàng */}
                    <ContentRoute path="/warehouse/classify-box" component={ClassifyBoxPage} need={'owning-boxes.index'} />
                    
                    {/* Đóng gói */}
                    <ContentRoute path="/warehouse/pack-box" component={PackPage} need={['boxes.create', 'boxes.update']} permissionJoin='and' />

                    {/* Vận đơn */}
                    <ContentRoute path="/warehouse/lading-bills" component={LadingBillPage} need={['lading-bills.index']} />

                    {/* Invoice */}
                    <ContentRoute path="/warehouse/container" component={InvoicePage} need={['containers.index']} />

                    {/* Đóng cont JP */}
                    <ContentRoute path="/warehouse/load-up-container" component={LoadUpContainerPage} need={['in-container-pickers.index']} permissionJoin='and' />

                    {/* Xuống cont VN */}
                    <ContentRoute path="/warehouse/down-container" component={DownContainer} need={['out-container-pickers.index']} />

                    {/* Yêu cầu xuất kho VN */}
                    <ContentRoute path="/warehouse/goods-delivery" component={GoodsDelivery} need={['delivery-partners.index', 'goods-deliveries.index']} />

                    {/* Xuất kho VN */}
                    <ContentRoute path="/warehouse/outbound-picker" component={OutBoundPicker} need={['outbound-pickers.index']} />

                    {/* Mô hình kho */}
                    <ContentRoute path="/warehouse/model" component={WarehouseModelPage} need={['sfas']} />

                    {/* Cài đặt */}
                    <ContentRoute path="/warehouse/settings" component={SettingsPage} need={['sfas']} />

                    <ContentRoute component={ErrorPage} />
                </Switch>
            </Suspense>
        </div>
    );
}
