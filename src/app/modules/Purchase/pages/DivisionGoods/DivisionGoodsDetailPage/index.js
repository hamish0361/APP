import { dialog } from 'app/components/DialogNotify';
import { fetchOrderItem } from 'app/modules/Order/order-redux/orderItemSlice';
import { createPurchaseItem } from 'app/modules/Order/order-redux/purchaseItemSlice';
import { fetchProduct } from 'app/modules/Product/product-redux/productSlice';
import { fetchPurchaseById } from 'app/modules/Purchase/redux/purchaseSlice';
import { fetchTracking } from 'app/modules/Purchase/redux/trackingSlice';
import React, { useEffect } from 'react';
import { injectIntl } from 'react-intl';
import { connect, useDispatch } from 'react-redux';
import { Route, useHistory, useParams, useRouteMatch } from 'react-router';
import DevisionGoodsDetial from './DevisionGoodsDetail';
import DialogNewPurchaseItem from './DialogNewPurchaseItem';

function DivisionGoodsDetailPage({ intl }) {
    const history = useHistory();
    const dispatch = useDispatch();
    const { id } = useParams();
    const match = useRouteMatch();

    useEffect(() => {
        dispatch(fetchPurchaseById({ id })).then(res => {
            if (res.payload?.items?.length > 0) {
                history.replace(
                    `${match.url}/chi-tiet/${res.payload?.items[0]?.id}`
                );
            } else {
                history.push(`${match.url}/tao-moi`);
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // product
    const handleSearchProduct = ({ value, type }) => {
        const params = {
            search: value,
            searchFields: `${type}:like`
        };
        dispatch(fetchProduct(params));
    };

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
                    history.push(`${match.url}/chi-tiet/${res.payload?.id}`);
                } else {
                    dialog.error(
                        intl.formatMessage({ id: 'PURCHASE.CREATE.ITEM.FAIL' })
                    );
                }
            });
        }
    };

    return (
        <>
            <Route path={`${match.path}/tao-moi`}>
                {({ match }) => (
                    <DialogNewPurchaseItem
                        show={match !== null}
                        onHide={() => history.push('/mua-hang/phan-hang')}
                        onSearchProductAll={handleSearchProduct}
                        onSearchProduct={handleSearchOrderItem}
                        onSearchTracking={handleSearchTracking}
                        onSubmitNew={handleNewSubmit}
                    />
                )}
            </Route>
            <Route
                path={`${match.path}/chi-tiet/:itemId`}
                component={DevisionGoodsDetial}
            />
        </>
    );
}

export default injectIntl(connect(null, null)(DivisionGoodsDetailPage));
