import { dialog } from 'app/components/DialogNotify';
import Loading from 'app/components/Loading';
import { fetchTransactions } from 'app/modules/Accounting/redux/transactionSlice';
import { create, fetchLogs } from 'app/modules/Notification/redux/logSlice';
import TopHeader from 'app/modules/Order/components/TopHeader';
import {
    fetchOrderById,
    resetOrderDetail,
    updateOrder
} from 'app/modules/Order/order-redux/orderSlice';
import { fetchShipmentInfo } from 'app/modules/Order/order-redux/shipmentInfoSlice';
import {
    createTracking,
    createTrackingForOrder,
    updateTracking
} from 'app/modules/Purchase/redux/trackingSlice';
import { fetchBoxs } from 'app/modules/Warehouse/warehouse-redux/boxSlice';
import { fetchLadingBills } from 'app/modules/Warehouse/warehouse-redux/ladingBillSlice';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect, shallowEqual, useDispatch, useSelector } from 'react-redux';
import BoxCard from './BoxCard';
import DialogNewEditTracking from './DialogNewEditTracking';
import InfoCard from './InfoCard';
import LandingBillCard from './LandingBillCard';
import LogCard from './LogCard';
import ShipmentInfoCard from './ShipmentInfoCard';
import ShipmentMethodCard from './ShipmentMethodCard';
import TrackingCard from './TrackingCard';

function ShipmentPartnerDetailPage({
    history,
    intl,
    match: {
        params: { id }
    }
}) {
    const dispatch = useDispatch();

    // store
    const {
        orderDetail,
        isLoadingDetail,
        isActionLoadingDetail,
        isActionLoadingCost,
        statusList
    } = useSelector(
        ({ order, home }) => ({
            orderDetail: order.list.orderDetail,
            isLoadingDetail: order.list.isLoading,
            isActionLoadingDetail: order.list.isActionLoading,
            isActionLoadingCost: order.cost.isActionLoading,
            statusList: home.home.statusList
        }),
        shallowEqual
    );

    const paramDetail = {
        id: id,
        params: {
            with: 'items.trackings;trackings;shipmentInfor',
            appends: 'customer;shipmentMethod'
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

    const paramTransaction = {
        search: `receipts.receiptable_id:${id};receipts.receiptable_type:App\\Entities\\Order`
    };

    const paramsLog = {
        search: `logable_type:App\\\\Entities\\\\Order;logable_id:${id}`
    };

    useEffect(() => {
        dispatch(resetOrderDetail());
        dispatch(fetchOrderById(paramDetail)).then(res => {
            if (res.type.includes('fulfilled')) {
                const params = {
                    search: `user_id:${res.payload.customer_id}`
                };
                dispatch(fetchShipmentInfo(params));
            }
        });
        dispatch(fetchBoxs(paramBoxs));
        dispatch(fetchLadingBills(paramLadingBill));
        dispatch(fetchTransactions(paramTransaction));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // info
    const handleUpdateInfo = note => {
        const params = {
            id: id,
            body: {
                note
            }
        };
        dispatch(updateOrder(params)).then(res => {
            if (res.type.includes('fulfilled')) {
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
                dispatch(fetchLogs(paramsLog));
                dialog.success(
                    intl.formatMessage({ id: 'ORDER.UPDATE.LOG.SUCCESS' })
                );
            } else {
                dialog.error(
                    intl.formatMessage({ id: 'ORDER.UPDATE.LOG.FAIL' })
                );
            }
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

    // tracking
    const [showTracking, setShowTracking] = useState(false);
    const [isNewTracking, setNewTracking] = useState(false);
    const handleNewTracking = ({ code, checked }) => {
        const body = {
            code,
            checked
        };
        dispatch(createTracking(body)).then(res => {
            if (res.type.includes('fulfilled')) {
                const body = {
                    id: res.payload?.id,
                    body: {
                        action: 'attach',
                        params: `["orders","${id}"]`
                    }
                };
                dispatch(createTrackingForOrder(body)).then(res => {
                    if (res.type.includes('fulfilled')) {
                        dispatch(fetchOrderById(paramDetail));
                        dialog.success(
                            intl.formatMessage({
                                id: 'ORDER.CREATE.TRACKING.SUCCESS'
                            })
                        );
                    } else {
                        dialog.error(
                            intl.formatMessage({
                                id: 'ORDER.CREATE.TRACKING.FAIL'
                            })
                        );
                    }
                });
            } else {
                dialog.error(
                    intl.formatMessage({ id: 'ORDER.CREATE.TRACKING.FAIL' })
                );
            }
            setShowTracking(false);
        });
    };
    const handleNewTrackingFast = () => {
        dispatch(createTracking()).then(res => {
            if (res.type.includes('fulfilled')) {
                const body = {
                    id: res.payload?.id,
                    body: {
                        action: 'attach',
                        params: `["orders","${id}"]`
                    }
                };
                dispatch(createTrackingForOrder(body)).then(res => {
                    if (res.type.includes('fulfilled')) {
                        dispatch(fetchOrderById(paramDetail));
                        dialog.success(
                            intl.formatMessage({
                                id: 'ORDER.CREATE.TRACKING.SUCCESS'
                            })
                        );
                    } else {
                        dialog.error(
                            intl.formatMessage({
                                id: 'ORDER.CREATE.TRACKING.FAIL'
                            })
                        );
                    }
                });
            } else {
                dialog.error(
                    intl.formatMessage({ id: 'ORDER.CREATE.TRACKING.FAIL' })
                );
            }
        });
    };

    const [trackingDetail, setTrackingDetail] = useState(null);
    const handleViewTrackingClick = trackingId => {
        const index = orderDetail?.trackings?.findIndex(
            x => x.id === trackingId
        );
        if (index !== -1) {
            setShowTracking(true);
            setNewTracking(false);
            const trackingDetail = orderDetail?.trackings[index];
            setTrackingDetail(trackingDetail);
        }
    };

    const handleUpdateTracking = params => {
        const body = {
            id: params.id,
            params: {
                code: params.code,
                checked: params.checked
            }
        };
        dispatch(updateTracking(body)).then(res => {
            if (res.type.includes('fulfilled')) {
                dispatch(fetchOrderById(paramDetail));
                dialog.success(
                    intl.formatMessage({ id: 'ORDER.UPDATE.TRACKING.SUCCESS' })
                );
            } else {
                dialog.error(
                    intl.formatMessage({ id: 'ORDER.UPDATE.TRACKING.FAIL' })
                );
            }
        });
        setShowTracking(false);
        setNewTracking(false);
    };

    // delete
    const handleDeleteTracking = id => {
        const params = {
            id: id,
            body: {
                action: 'detach',
                params: `["orders",${orderDetail.id}]`
            }
        };
        dispatch(createTrackingForOrder(params)).then(res => {
            if (res.type.includes('fulfilled')) {
                dispatch(fetchOrderById(paramDetail));
                dialog.success(
                    intl.formatMessage({ id: 'ORDER.DELETE.TRACKING.SUCCESS' })
                );
            } else {
                dialog.error(
                    intl.formatMessage({ id: 'ORDER.DELETE.TRACKING.FAIL' })
                );
            }
            setShowTracking(false);
        });
    };

    // steps
    const stepList = stepRes || orderDetail.steps || [];
    const steps = stepList.map(value => {
        const statusObj = statusList.find(x => x.id === value);
        return statusObj;
    });

    const loading =
        isLoadingDetail || isActionLoadingDetail || isActionLoadingCost;

    return (
        <>
            {loading && <Loading />}

            <>
                <TopHeader
                    title={intl.formatMessage({
                        id: 'ORDER.SHIPMENT.DETAIL.TITLE'
                    })}
                >
                    <Button
                        className="btn btn-light ml-2"
                        onClick={() =>
                            history.push('/ban-hang/don-van-chuyen-ho')
                        }
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
                            <div className="col-md-6">
                                <InfoCard
                                    statusRes={statusRes}
                                    order={orderDetail}
                                    onUpdate={handleUpdateInfo}
                                    intl={intl}
                                />
                            </div>
                            <div className="col-md-6">
                                <div className="h-100">
                                    <ShipmentInfoCard
                                        shipmentInfoRes={shipmentInfoRes}
                                        shipment={orderDetail.shipment_infor}
                                        onUpdate={handleUpdateShipmentInfo}
                                        intl={intl}
                                    />
                                    <ShipmentMethodCard
                                        methodRes={methodRes}
                                        shipment={orderDetail.shipment_method}
                                        onUpdate={handleUpdateShipmentMethod}
                                        intl={intl}
                                    />
                                </div>
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
                                <TrackingCard
                                    trackingList={orderDetail.trackings}
                                    onNewCick={() => {
                                        setShowTracking(true);
                                        setNewTracking(true);
                                        setTrackingDetail(null);
                                    }}
                                    onViewClick={handleViewTrackingClick}
                                    intl={intl}
                                    onCreate={handleNewTrackingFast}
                                />
                            </div>
                            <div className="col-md-6">
                                <LogCard onLog={handleNewLog} intl={intl} />
                            </div>
                        </div>
                    </>
                </div>

                <DialogNewEditTracking
                    trackingDetail={trackingDetail}
                    show={showTracking}
                    isNew={isNewTracking}
                    onHide={() => setShowTracking(false)}
                    onDelete={handleDeleteTracking}
                    onUpdate={handleUpdateTracking}
                    onNew={handleNewTracking}
                />
            </>
        </>
    );
}

export default injectIntl(connect(null, null)(ShipmentPartnerDetailPage));
