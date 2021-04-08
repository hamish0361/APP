import React from 'react';

import useTrans from 'helper/useTrans';

import { Card, CardBody, CardHeader, CardHeaderToolbar } from '_metronic/_partials/controls';
import TableGoodsDeliveryBoxes from 'app/modules/Warehouse/components/Table/TableGoodsDeliveryBoxes';
import useGoodsDeliveryDetail from '../hooks/useGoodsDeliveryDetail';
import { Route, useHistory, useRouteMatch } from 'react-router';
import AddBoxToGoodsDelivery from './AddBoxToGoodsDelivery';
import NeedPermission from 'app/components/NeedPermission';

const GoodsDeliveryBoxes = props => {

    const [trans] = useTrans();
    const getGoodsDeliveryDetail = useGoodsDeliveryDetail();
    const history = useHistory();
    const match = useRouteMatch();

    const openModalAddBox = () => {
        history.push(`${match.url}/add-box-to-goods-delivery`);
    }

    return (
        <>
            <NeedPermission need={['goods-deliveries.update']}>
                <Route path={`${match.path}/add-box-to-goods-delivery`}>
                    {({ match }) => (
                        <AddBoxToGoodsDelivery
                            show={match !== null}
                            onSuccess={getGoodsDeliveryDetail}
                        />
                    )}
                </Route>
            </NeedPermission>

            <Card>
                <CardHeader title={trans("warehouse.sku.list.title")}>
                    <NeedPermission need={['goods-deliveries.update']}>
                        <CardHeaderToolbar>
                            <button className="btn btn-primary" onClick={openModalAddBox}>
                                {trans("warehouse.goods_delivery.pivot.box_lading_bill.create.title")}
                            </button>
                        </CardHeaderToolbar>
                    </NeedPermission>
                </CardHeader>

                <CardBody>
                    <TableGoodsDeliveryBoxes onRefresh={getGoodsDeliveryDetail} />
                </CardBody>
            </Card>
        </>
    );
};

GoodsDeliveryBoxes.propTypes = {

};

export default GoodsDeliveryBoxes;