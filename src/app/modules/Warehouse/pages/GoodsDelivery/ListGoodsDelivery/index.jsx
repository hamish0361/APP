import React, { useRef } from 'react';
import { useSelector } from 'react-redux';

import useTrans from 'helper/useTrans';
import useGoodsDeliveryList from '../hooks/useGoodsDeliveryList';

import { Card, CardBody, CardHeader, CardHeaderToolbar } from '_metronic/_partials/controls';
import Loading from 'app/components/Loading';
import TableGoodsDeliveries from 'app/modules/Warehouse/components/Table/TableGoodsDeliveries';
import GoodsDeliveryFilter from 'app/modules/Warehouse/components/Filter/GoodsDeliveryFilter';
import { Route, useHistory, useRouteMatch } from 'react-router';
import CreateGoodsDelivery from './CreateGoodsDelivery';
import NeedPermission from 'app/components/NeedPermission';

const ListGoodsDelivery = props => {

    const { loading } = useSelector(state => state.warehouse.goodsDelivery.list)
    const [trans] = useTrans();
    const filterRef = useRef();
    const getDataGoodsDelivery = useGoodsDeliveryList();
    const history = useHistory();
    const match = useRouteMatch();

    const handleSearchSubmit = search => {
        getDataGoodsDelivery(search);
    };

    const openCreateModal = () => {
        history.push(`${match.url}/create-goods-delivery`)
    }

    const createLadingBillSuccess = (data) => {
        getDataGoodsDelivery();

        history.push(`/warehouse/goods-delivery/detail/${data.id}`)
    }

    return (
        <>
            <NeedPermission need={["goods-deliveries.create"]}>
                <Route path={`${match.path}/create-goods-delivery`}>
                    {({ match }) => (
                        <CreateGoodsDelivery
                            show={match !== null}
                            onSuccess={createLadingBillSuccess}
                        />
                    )}
                </Route>
            </NeedPermission>

            <Card>
                <CardHeader title={trans("warehouse.goods_delivery.list.title")}>
                    <NeedPermission need={["goods-deliveries.create"]}>
                        <CardHeaderToolbar>
                            <button className="btn btn-primary" onClick={openCreateModal}>
                                {trans("warehouse.goods_delivery.create.title")}
                            </button>
                        </CardHeaderToolbar>
                    </NeedPermission>
                </CardHeader>
                <CardBody className="position-relative">
                    {loading && <Loading local />}

                    <GoodsDeliveryFilter ref={filterRef} onSearch={handleSearchSubmit} />
                    <TableGoodsDeliveries onRefresh={getDataGoodsDelivery} />
                </CardBody>
            </Card>
        </>
    );
};

ListGoodsDelivery.propTypes = {

};

export default ListGoodsDelivery;