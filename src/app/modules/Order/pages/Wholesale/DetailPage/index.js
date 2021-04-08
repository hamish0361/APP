import { dialog } from 'app/components/DialogNotify';
import Loading from 'app/components/Loading';
import {
    create,
    fetchLogs,
    resetLog
} from 'app/modules/Notification/redux/logSlice';
import BoxCard from 'app/modules/Order/components/cards/BoxCard';
import InfoCard from 'app/modules/Order/components/cards/InfoCard';
import ItemCard from 'app/modules/Order/components/cards/ItemCard';
import LandingBillCard from 'app/modules/Order/components/cards/LandingBillCard';
import LogCard from 'app/modules/Order/components/cards/LogCard';
import ShipmentInfoCard from 'app/modules/Order/components/cards/ShipmentInfoCard';
import ShipmentMethodCard from 'app/modules/Order/components/cards/ShipmentMethodCard';
import TrackingOrder from 'app/modules/Order/components/cards/TrackingOrder';
import TransactionCard from 'app/modules/Order/components/cards/TransactionCard';
import DialogUpdateItem from 'app/modules/Order/components/DialogUpdateItem';
import TopHeader from 'app/modules/Order/components/TopHeader';
import {
    fetchOrderItem,
    resetOrderItem,
    updateOrderItem
} from 'app/modules/Order/order-redux/orderItemSlice';
import {
    fetchOrderById,
    updateOrder
} from 'app/modules/Order/order-redux/orderSlice';
import { fetchShipmentInfo } from 'app/modules/Order/order-redux/shipmentInfoSlice';
import { fetchBoxs } from 'app/modules/Warehouse/warehouse-redux/boxSlice';
import { fetchLadingBills } from 'app/modules/Warehouse/warehouse-redux/ladingBillSlice';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect, shallowEqual, useDispatch, useSelector } from 'react-redux';

function WholesaleDetailPage({
    history,
    intl,
    match: {
        params: { id }
    }
}) {
    const dispatch = useDispatch();
    const [paramItems, setParamItems] = useState({
        page: 1,
        appends: 'product.unit;product.package;supplier',
        with: 'orderItemPurchases',
        search: `order_id:${id}`
    });
    const [dataOrder, setDataOrder] = useState(null);

    // store
    const {
        orderDetail,
        isLoadingDetail,
        isActionLoadingDetail,
        statusList,
        itemList
    } = useSelector(
        ({ order, home }) => ({
            orderDetail: order.list.orderDetail,
            isLoadingDetail: order.list.isLoading,
            isActionLoadingDetail: order.list.isActionLoading,
            statusList: home.home.statusList,
            itemList: order.item.itemList
        }),
        shallowEqual
    );

    const paramDetail = {
        id: id,
        params: {
            with: 'shipmentInfor;items.orderItemPurchases',
            appends: 'customer;shipmentMethod;transactions;logs;trackings'
        }
    };

    const paramBoxs = {
        search: `owners.objectable_type:order;owners.objectable_id:${id}`,
        searchFields: 'owners.objectable_type:=;owners.objectable_id:=',
        searchJoin: 'and'
    };

    const paramLadingBill = {
        search: `owningBoxes.objectable_type:order;owningBoxes.objectable_id:${id}`,
        searchFields:
            'owningBoxes.objectable_type:=;owningBoxes.objectable_id:=',
        searchJoin: 'and'
    };

    const paramsLog = {
        search: `logable_type:App\\\\Entities\\\\Order;logable_id:${id}`,
        orderBy: 'created_at',
        sortedBy: 'desc'
    };

    useEffect(() => {
        dispatch(resetOrderItem());
        dispatch(fetchOrderById(paramDetail)).then(res => {
            if (res.type.includes('fulfilled')) {
                const pramsShipmentInfo = {
                    search: `user_id:${res.payload.customer_id}`
                };
                dispatch(fetchShipmentInfo(pramsShipmentInfo));
            }
        });
        dispatch(fetchBoxs(paramBoxs));
        dispatch(fetchLadingBills(paramLadingBill));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        dispatch(fetchOrderItem(paramItems));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [paramItems]);

    // info
    const handleUpdateInfo = body => {
        const params = {
            id: id,
            body
        };
        dispatch(updateOrder(params)).then(res => {
            if (res.type.includes('fulfilled')) {
                setDataOrder(res.payload);
                dialog.success(
                    intl.formatMessage({ id: 'ORDER.UPDATE.INFO.SUCCESS' })
                );
            } else {
                dialog.error(
                    intl.formatMessage({ id: 'ORDER.UPDATE.INFO.FAIL' })
                );
            }
        });
    };

    // shipment info
    const [shipmentInfoRes, setShipmentInfoRes] = useState(null);
    const handleUpdateShipmentInfo = shipmentId => {
        const params = {
            id: id,
            body: {
                shipment_infor_id: shipmentId
            }
        };
        dispatch(updateOrder(params)).then(res => {
            if (res.type.includes('fulfilled')) {
                dialog.success(
                    intl.formatMessage({
                        id: 'ORDER.UPDATE.SHIPMENT_INFO.SUCCESS'
                    })
                );
                setShipmentInfoRes(res.payload?.shipment_infor_id);
            } else {
                dialog.error(
                    intl.formatMessage({
                        id: 'ORDER.UPDATE.SHIPMENT_INFO.FAIL'
                    })
                );
                setShipmentInfoRes(null);
            }
        });
    };

    // shipment method
    const [methodRes, setMethodRes] = useState(null);
    const handleUpdateShipmentMethod = mothodId => {
        const params = {
            id: id,
            body: {
                shipment_method_id: mothodId
            }
        };
        dispatch(updateOrder(params)).then(res => {
            if (res.type.includes('fulfilled')) {
                dialog.success(
                    intl.formatMessage({
                        id: 'ORDER.UPDATE.SHIPMENT_METHOD.SUCCESS'
                    })
                );
                setMethodRes(res.payload?.shipment_method_id);
            } else {
                dialog.error(
                    intl.formatMessage({
                        id: 'ORDER.UPDATE.SHIPMENT_METHOD.FAIL'
                    })
                );
                setMethodRes(null);
            }
        });
    };

    // log
    useEffect(() => {
        dispatch(resetLog());
        dispatch(fetchLogs(paramsLog));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleNewLog = content => {
        const body = {
            content,
            logable_id: id,
            logable_type: 'AppEntitiesOrder'
        };
        dispatch(create(body)).then(res => {
            if (res.type.includes('fulfilled')) {
                dialog.success(
                    intl.formatMessage({ id: 'ORDER.UPDATE.LOG.SUCCESS' })
                );
                dispatch(fetchLogs(paramsLog));
            } else {
                dialog.error(
                    intl.formatMessage({ id: 'ORDER.UPDATE.LOG.FAIL' })
                );
            }
        });
    };

    //item
    const [isShowItem, setShowItem] = useState(false);
    const [itemDetail, setItemDetail] = useState(false);

    const handleEditItem = id => {
        const index = itemList.findIndex(x => x.id === id);
        if (index !== -1) {
            const item = itemList[index];
            setItemDetail(item);
        }
        setShowItem(true);
    };

    const handleUpdateItem = ({
        price,
        quantity,
        box,
        property,
        note,
        tax_percent,
        discount_tax_per_tax_percent
    }) => {
        const params = {
            id: itemDetail.id,
            body: {
                price,
                quantity,
                note,
                properties: property,
                is_box: box,
                tax_percent,
                discount_tax_per_tax_percent
            }
        };
        setShowItem(false);
        dispatch(updateOrderItem(params)).then(res => {
            if (res.type.includes('fulfilled')) {
                dialog.success(
                    intl.formatMessage({ id: 'ORDER.UPDATE.ITEM.SUCCESS' })
                );
                dispatch(fetchOrderItem(paramItems));
                dispatch(fetchOrderById(paramDetail));
            } else {
                dialog.error(
                    intl.formatMessage({ id: 'ORDER.UPDATE.ITEM.FAIL' })
                );
            }
        });
    };

    //tracking table
    const columns = [
        {
            id: 'id',
            title: intl.formatMessage({ id: 'TRACKING.CODE_TRACKING' })
        },
        {
            id: 'checked',
            title: intl.formatMessage({ id: 'TRACKING.STATUS' })
        }
    ];
    // const rows = trackingList.map(tracking => {
    //     return {
    //         id: tracking.id || '-',
    //         checked: (
    //             <span
    //                 className={`label font-weight-bold label-lg label-inline mr-2 ${
    //                     tracking.checked
    //                         ? 'label-light-success'
    //                         : 'label-light-danger'
    //                 }`}
    //             >
    //                 {tracking.checked
    //                     ? `${intl.formatMessage({ id: 'TRACKING.IN_STOCK' })}`
    //                     : `${intl.formatMessage({ id: 'TRACKING.OUT_STOCK' })}`}
    //             </span>
    //         )
    //     };
    // });
    const rows = [];

    const handleItemPageChange = newPage => {
        setParamItems({
            ...paramItems,
            page: newPage
        });
    };

    // lading bill
    const handleViewLanding = id => {
        history.push(`/warehouse/lading-bills/${id}`);
    };

    // status
    const [statusRes, setStatusRes] = useState(null);
    const [stepRes, setStepRes] = useState(null);
    const handleUpdateStatus = status => {
        const params = {
            id,
            body: {
                status
            }
        };
        dispatch(updateOrder(params)).then(res => {
            if (res.type.includes('fulfilled')) {
                dialog.success(
                    intl.formatMessage({ id: 'ORDER.UPDATE.STATUS.SUCCESS' })
                );
                setStatusRes(res.payload?.status);
                setStepRes(res.payload?.steps);
                dispatch(fetchLogs(paramsLog));
            } else {
                dialog.error(
                    intl.formatMessage({ id: 'ORDER.UPDATE.STATUS.FAIL' })
                );
            }
        });
    };

    // steps
    const stepList = stepRes || orderDetail.steps || [];
    const steps = stepList.map(value => {
        const statusObj = statusList.find(x => x.id === value);
        return statusObj;
    });

    const loading = isLoadingDetail || isActionLoadingDetail;

    return (
        <>
            {loading && <Loading />}

            <>
                <TopHeader
                    title={intl.formatMessage({
                        id: 'ORDER.WHOLESALE.DETAIL.TITLE'
                    })}
                >
                    <Button
                        className="btn btn-light ml-2"
                        onClick={() => history.push('/ban-hang/don-si')}
                    >
                        <i className="fa fa-arrow-left"></i>
                        <FormattedMessage id="GLOBAL.BUTTON.BACK" />
                    </Button>
                    {steps?.length > 0
                        ? steps?.map((step, index) => (
                              <Button
                                  key={index}
                                  className="btn btn-primary ml-2"
                                  onClick={() => handleUpdateStatus(step?.id)}
                              >
                                  {step?.name}
                              </Button>
                          ))
                        : null}
                </TopHeader>

                <div className="px-8 pb-8">
                    <>
                        <div className="form-group row">
                            <div className="col-12">
                                <InfoCard
                                    statusRes={statusRes}
                                    order={dataOrder || orderDetail}
                                    onUpdate={handleUpdateInfo}
                                    intl={intl}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-12">
                                {/* <Card>
                                    <CardHeader
                                        title={intl.formatMessage({
                                            id: 'ORDER.ITEM.TRACKING_LIST'
                                        })}
                                    />
                                    <CardBody>
                                        <TrackingTable
                                            columns={columns}
                                            rows={rows}
                                            isAction={false}
                                        />
                                    </CardBody>
                                </Card> */}
                                <TrackingOrder
                                    columns={columns}
                                    rows={rows}
                                    intl={intl}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-12">
                                <ItemCard
                                    onEdit={handleEditItem}
                                    onPageChange={handleItemPageChange}
                                    intl={intl}
                                />
                            </div>
                        </div>

                        <div className="form-group row">
                            <div className="col-md-6">
                                <ShipmentMethodCard
                                    methodRes={methodRes}
                                    shipment={orderDetail.shipment_method}
                                    onUpdate={handleUpdateShipmentMethod}
                                    intl={intl}
                                />
                            </div>
                            <div className="col-md-6">
                                <ShipmentInfoCard
                                    shipmentInfoRes={shipmentInfoRes}
                                    shipment={orderDetail.shipment_infor}
                                    onUpdate={handleUpdateShipmentInfo}
                                    intl={intl}
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-md-6">
                                <BoxCard intl={intl} />
                            </div>
                            <div className="col-md-6">
                                <LandingBillCard
                                    onView={handleViewLanding}
                                    intl={intl}
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-md-6">
                                <TransactionCard
                                    transactions={
                                        orderDetail.transactions || []
                                    }
                                    intl={intl}
                                />
                            </div>
                            <div className="col-md-6">
                                <LogCard onLog={handleNewLog} intl={intl} />
                            </div>
                        </div>
                    </>
                </div>
            </>
            <DialogUpdateItem
                item={itemDetail || {}}
                open={isShowItem}
                onHide={() => setShowItem(false)}
                onUpdate={handleUpdateItem}
            />
        </>
    );
}

export default injectIntl(connect(null, null)(WholesaleDetailPage));
