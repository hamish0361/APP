import { dialog } from 'app/components/DialogNotify';
import Loading from 'app/components/Loading';
import TopHeader from 'app/modules/Order/components/TopHeader';
import { fetchOrderItem } from 'app/modules/Order/order-redux/orderItemSlice';
import {
    deletePurchaseDivisionItem,
    fetchPurchaseItemById,
    updatePurchaseDivisionItem
} from 'app/modules/Order/order-redux/purchaseItemSlice';
import {
    createPurchaseItemOrder,
    updatePurchaseItem
} from 'app/modules/Purchase/redux/purchaseItemSlice';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect, shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import DialogDivision from './DialogDivision';
import DialogEdit from './DialogEdit';
import DivisionItemCard from './DivisionItemCard';
import InfoCard from './InfoCard';

function PurchaseItemDetail({ intl }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { itemId } = useParams();

    const [show, setShow] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [divisionItem, setDivisionItem] = useState(null);
    const [quantityItem, setQuantityItem] = useState(0);

    const { purchaseItem, isLoading, isActionLoading } = useSelector(
        ({ order }) => ({
            purchaseItem: order.purchaseItem.purchaseItemDetail,
            isLoading: order.purchaseItem.isLoading,
            isActionLoading: order.purchaseItem.isActionLoading
        }),
        shallowEqual
    );

    const params = {
        with: 'orderItems;tracking;orderProductPurchases'
    };
    useEffect(() => {
        dispatch(fetchPurchaseItemById({ id: itemId, params }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // customer
    const handleSearchOrderProduct = ({ value, type }) => {
        const params = {
            search: value,
            searchFields: `${type}:like`
        };
        dispatch(fetchOrderItem(params));
    };

    const handleDivisionItemUser = object => {
        dispatch(createPurchaseItemOrder(object)).then(res => {
            if (res.type.includes('fulfilled')) {
                dialog.success(
                    intl.formatMessage({
                        id: 'PURCHASE.DIVISION.ITEM.SUCCESSFUL.DIALOG'
                    })
                );
                setShow(false);
                dispatch(fetchPurchaseItemById({ id: itemId, params }));
            } else {
                dialog.error(
                    intl.formatMessage({
                        id: 'PURCHASE.DIVISION.ITEM.ERROR.DIALOG'
                    })
                );
            }
        });
    };

    const handleUpdateInfo = body => {
        const params = {
            id: itemId,
            body
        };
        dispatch(updatePurchaseItem(params)).then(res => {
            if (res.type.includes('fulfilled')) {
                dialog.success(
                    intl.formatMessage({ id: 'PURCHASE.UPDATE.ITEM.SUCCESS' })
                );
                dispatch(fetchPurchaseItemById({ id: itemId, params }));
            } else {
                dialog.error(
                    intl.formatMessage({ id: 'PURCHASE.UPDATE.ITEM.FAIL' })
                );
            }
        });
    };

    const handleDeleteDivisionItem = id => {
        dispatch(deletePurchaseDivisionItem(id)).then(res => {
            if (res.type.includes('fulfilled')) {
                dialog.success(
                    intl.formatMessage({
                        id: 'PURCHASE.DIVISION.ITEM.DELETE.SUCCESS'
                    })
                );
                dispatch(fetchPurchaseItemById({ id: itemId, params }));
            } else {
                dialog.error(
                    intl.formatMessage({
                        id: 'PURCHASE.DIVISION.ITEM.DELETE.FAIL'
                    })
                );
            }
        });
    };

    const handleViewItemClick = itemId => {
        const index = purchaseItem?.order_product_purchases?.findIndex(
            x => x.id === itemId
        );
        if (index !== -1) {
            setDivisionItem(purchaseItem?.order_product_purchases[index]);
            setQuantityItem(purchaseItem?.order_items[index]?.quantity);
        }
        setShowEdit(true);
    };

    const handleUpdateDivisionItem = paramsItem => {
        dispatch(updatePurchaseDivisionItem(paramsItem)).then(res => {
            if (res.type.includes('fulfilled')) {
                dialog.success(
                    intl.formatMessage({
                        id: 'PURCHASE.DIVISION.ITEM.UPDATE.SUCCESS'
                    })
                );
                setShowEdit(false);
                dispatch(fetchPurchaseItemById({ id: itemId, params }));
            } else {
                dialog.error(
                    intl.formatMessage({
                        id: 'PURCHASE.DIVISION.ITEM.UPDATE.FAIL'
                    })
                );
            }
        });
    };

    return (
        <>
            <>
                {(isLoading || isActionLoading) && <Loading />}

                <TopHeader
                    title={intl.formatMessage({
                        id: 'PURCHASE.ITEM.DETAIL.TITLE'
                    })}
                >
                    <Button
                        className="btn btn-light ml-2"
                        onClick={() => history.goBack()}
                    >
                        <i className="fa fa-arrow-left"></i>
                        <FormattedMessage id="GLOBAL.BUTTON.BACK" />
                    </Button>
                </TopHeader>

                <div className="px-8 pb-8">
                    <InfoCard
                        intl={intl}
                        purchase={purchaseItem}
                        onUpdate={handleUpdateInfo}
                    />
                    <DivisionItemCard
                        intl={intl}
                        onDivisionClick={() => setShow(true)}
                        items={purchaseItem?.order_product_purchases}
                        onDelete={handleDeleteDivisionItem}
                        onViewEdit={handleViewItemClick}
                    />
                </div>
            </>

            <DialogDivision
                intl={intl}
                show={show}
                onHide={() => setShow(false)}
                onSearchOrderProduct={handleSearchOrderProduct}
                onDivision={handleDivisionItemUser}
                itemId={itemId}
            />
            <DialogEdit
                intl={intl}
                quantity={quantityItem}
                show={showEdit}
                onHide={() => setShowEdit(false)}
                itemDetail={divisionItem}
                onUpdate={handleUpdateDivisionItem}
            />
        </>
    );
}

export default injectIntl(connect(null, null)(PurchaseItemDetail));
