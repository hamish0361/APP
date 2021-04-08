import { dialog } from 'app/components/DialogNotify';
import Loading from 'app/components/Loading';
import TopHeader from 'app/modules/Order/components/TopHeader';
import { fetchOrderItem } from 'app/modules/Order/order-redux/orderItemSlice';
import {
    createPurchaseItem,
    deletePurchaseItem
} from 'app/modules/Order/order-redux/purchaseItemSlice';
import { fetchProduct } from 'app/modules/Product/product-redux/productSlice';
import {
    fetchPurchaseItem,
    resetPurchaseItem
} from 'app/modules/Purchase/redux/purchaseItemSlice';
import {
    fetchPurchaseById,
    updatePurchase,
    uploadPurchaseFile
} from 'app/modules/Purchase/redux/purchaseSlice';
import { fetchTracking } from 'app/modules/Purchase/redux/trackingSlice';
import 'assets/css/order.scss';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect, shallowEqual, useDispatch, useSelector } from 'react-redux';
import DialogNewItem from './DialogNewItem';
import './index.scss';
import InfoCard from './InfoCard';
import ItemCard from './ItemCard';
import SupplierCard from './SupplierCard';

function PurchaseDetailPage({
    history,
    intl,
    match: {
        params: { id }
    }
}) {
    const dispatch = useDispatch();
    const purchase = useSelector(state => state.purchase.list);
    const { purchaseDetail, isActionLoading, isLoading } = purchase;
    // store
    const {
        statusList,
        itemList,
        pagination,
        trackings,
        orderItems,
        isActionLoadingItem,
        isLoadingItem
    } = useSelector(
        ({ home, purchase, order }) => ({
            statusList: home.home.statusList,
            itemList: purchase.purchaseItem.list,
            pagination: purchase.purchaseItem.pagination,
            trackings: purchase.tracking.trackingList,
            orderItems: order.item.itemList,
            isActionLoadingItem: purchase.purchaseItem.isActionLoading,
            isLoadingItem: purchase.purchaseItem.isLoading
        }),
        shallowEqual
    );
    // product
    const handleSearchProduct = ({ value, type }) => {
        const params = {
            search: value,
            searchFields: `${type}:like`
        };
        dispatch(fetchProduct(params));
    };

    const paramsDetail = {
        id: id,
        params: {
            appends: 'supplier;buyer'
        }
    };

    useEffect(() => {
        dispatch(resetPurchaseItem());
        dispatch(fetchPurchaseById(paramsDetail));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // items
    const [paramItems, setParamItems] = useState({
        page: 1,
        with: 'tracking;orderProductPurchases',
        search: `purchase_id:${id}`
    });

    useEffect(() => {
        dispatch(fetchPurchaseItem(paramItems));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [paramItems]);

    const handleItemPageChange = newPage => {
        setParamItems({
            ...paramItems,
            page: newPage
        });
    };

    const handleEditItem = itemId => {
        history.push(`/mua-hang/don-mua-hang/${id}/chi-tiet/${itemId}`);
    };

    const handleUpdateStatus = step => {
        const params = {
            id: id,
            body: {
                status: step
            }
        };
        dispatch(updatePurchase(params)).then(res => {
            if (res.type.includes('fulfilled')) {
                dialog.success(
                    intl.formatMessage({ id: 'ORDER.UPDATE.STATUS.SUCCESS' })
                );
                dispatch(fetchPurchaseById(paramsDetail));
            } else {
                dialog.error(
                    intl.formatMessage({ id: 'ORDER.UPDATE.STATUS.FAIL' })
                );
            }
        });
    };

    const [isShowNewItem, setShowNewItem] = useState(false);

    // new item
    const handleSearchOrderItem = value => {
        const params = {
            search: `product_id:${value}`,
            searchFields: 'product_id:like'
        };
        dispatch(fetchOrderItem(params));
    };

    const handleSearchTracking = value => {
        const params = {
            search: value,
            searchFields: `id:like`
        };
        dispatch(fetchTracking(params));
    };

    const handleNewSubmit = ({
        productId,
        trackingId,
        price,
        quantity,
        amount,
        order_product_id,
        tax
    }) => {
        const body = {
            product_id: productId,
            tracking_id: trackingId,
            purchase_id: id,
            price,
            quantity,
            amount,
            order_product_id,
            tax_percent: tax
        };
        if (!productId) {
            dialog.warning(
                intl.formatMessage({ id: 'PURCHASE.CREATE.ITEM.WARNING1' })
            );
        } else if (quantity <= 0) {
            dialog.warning(
                intl.formatMessage({ id: 'PURCHASE.CREATE.ITEM.WARNING2' })
            );
        } else {
            dispatch(createPurchaseItem(body)).then(res => {
                if (res.type.includes('fulfilled')) {
                    dialog.success(
                        intl.formatMessage({
                            id: 'PURCHASE.CREATE.ITEM.SUCCESS'
                        })
                    );
                    setShowNewItem(false);
                    dispatch(fetchPurchaseItem(paramItems));
                } else {
                    dialog.error(
                        intl.formatMessage({ id: 'PURCHASE.CREATE.ITEM.FAIL' })
                    );
                }
            });
        }
    };
    const handleFileUpload = e => {
        const files = e.target.files;
        const formData = new FormData();
        formData.set('', files[0], files.name);
        const body = {
            id: id,
            data: formData
        };
        dispatch(uploadPurchaseFile(body)).then(res => {
            if (res.type.includes('fulfilled')) {
                dialog.success(
                    `${intl.formatMessage({
                        id: 'ACCOUNTING.RECEIPT.UPDATE.FILE.SUCCESS'
                    })}`
                );
            } else {
                dialog.error(
                    `${intl.formatMessage({
                        id: 'ACCOUNTING.RECEIPT.UPDATE.FILE.ERROR'
                    })}`
                );
            }
        });
    };

    const handleDeletePurchaseItem = itemId => {
        dispatch(deletePurchaseItem(itemId)).then(res => {
            if (res.type.includes('fulfilled')) {
                dialog.success(
                    intl.formatMessage({
                        id: 'PURCHASE.DIVISION.ITEM.DELETE.SUCCESS'
                    })
                );
                dispatch(
                    fetchPurchaseItem({
                        page: 1,
                        with: 'tracking;orderProductPurchases',
                        search: `purchase_id:${id}`
                    })
                );
            } else {
                dialog.error(
                    intl.formatMessage({
                        id: 'PURCHASE.DIVISION.ITEM.DELETE.FAIL'
                    })
                );
            }
        });
    };

    const handleUpdatePuschaseItem = item => {
        const body = {
            id: id,
            params: { additional_cost: item?.replace(/\D/g, '') }
        };
        console.log('body', body);
        dispatch(updatePurchase(body)).then(res => {
            if (res.type.includes('fulfilled')) {
                dialog.success(
                    intl.formatMessage({ id: 'ORDER.UPDATE.STATUS.SUCCESS' })
                );
                dispatch(fetchPurchaseById(paramsDetail));
            } else {
                dialog.error(
                    intl.formatMessage({ id: 'ORDER.UPDATE.STATUS.FAIL' })
                );
            }
        });
    };
    // steps
    const steps = purchaseDetail?.steps?.map(value => {
        const statusObj = statusList.find(x => x.id === value);
        return statusObj;
    });

    const loading =
        isLoading || isActionLoading || isActionLoadingItem || isLoadingItem;

    return (
        <>
            {loading && <Loading />}
            <>
                <TopHeader
                    title={intl.formatMessage({ id: 'PURCHASE.DETAIL.TITLE' })}
                >
                    <Button
                        className="btn btn-light ml-2"
                        onClick={() => history.push('/mua-hang/don-mua-hang')}
                    >
                        <i className="fa fa-arrow-left"></i>
                        <FormattedMessage id="GLOBAL.BUTTON.BACK" />
                    </Button>
                    <input
                        name="file"
                        className="input-flie"
                        id="contained-button-file"
                        type="file"
                        onChange={handleFileUpload}
                    />
                    <label
                        htmlFor="contained-button-file"
                        className="btn btn-danger ml-2 btn btn-primary button-uploadFlie"
                    >
                        <i className="fa fa-upload"></i>
                        <FormattedMessage id="GLOBAL.BUTTON.UPLOAD" />
                    </label>

                    {steps?.map((step, index) => (
                        <Button
                            key={index}
                            className="btn btn-primary ml-2"
                            onClick={() => handleUpdateStatus(step.id)}
                        >
                            {step.name}
                        </Button>
                    ))}
                </TopHeader>

                <div className="px-8 pb-8">
                    <>
                        <div className="form-group row">
                            <div className="col-6">
                                <InfoCard
                                    purchase={purchaseDetail}
                                    intl={intl}
                                    onUpdatePurchaseInfo={
                                        handleUpdatePuschaseItem
                                    }
                                />
                            </div>
                            <div className="col-6">
                                <SupplierCard
                                    supplier={purchaseDetail?.supplier || {}}
                                    intl={intl}
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-12">
                                <ItemCard
                                    items={itemList}
                                    pagination={pagination}
                                    page={paramItems.page}
                                    onEdit={handleEditItem}
                                    onPageChange={handleItemPageChange}
                                    onNewItem={() => setShowNewItem(true)}
                                    intl={intl}
                                    onDelete={handleDeletePurchaseItem}
                                />
                            </div>
                        </div>
                    </>
                </div>
            </>
            <DialogNewItem
                intl={intl}
                onSearchProductAll={handleSearchProduct}
                show={isShowNewItem}
                onHide={() => setShowNewItem(false)}
                orderItems={orderItems}
                trackings={trackings}
                onSearchProduct={handleSearchOrderItem}
                onSearchTracking={handleSearchTracking}
                onSubmitNew={handleNewSubmit}
            />
        </>
    );
}

export default injectIntl(connect(null, null)(PurchaseDetailPage));
