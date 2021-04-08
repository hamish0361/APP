import Loading from 'app/components/Loading';
import 'assets/css/order.scss';
import { IMAGES } from 'constant/Images';
import formatNumber from 'helper/formatNumber';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import {
    Card,
    CardBody,
    CardHeader,
    CardHeaderToolbar
} from '_metronic/_partials/controls';
import ItemTable from '../../../components/cards/ItemTable';
import DialogAddItem from './DialogAddItem';
import { fetchProduct } from 'app/modules/Product/product-redux/productSlice';
import {
    createOrderItem,
    fetchOrderItem
} from 'app/modules/Order/order-redux/orderItemSlice';
import { dialog } from 'app/components/DialogNotify';
import { fetchOrderById } from 'app/modules/Order/order-redux/orderSlice';

ItemCard.prototype = {
    onEdit: PropTypes.func,
    onPageChange: PropTypes.func,
    idOrder: PropTypes.string,
    statusOrder: PropTypes.string
};

function ItemCard({ onEdit, onPageChange, intl, idOrder, statusOrder }) {
    const {
        itemList,
        isActionLoading,
        productList,
        taxList,
        pagination
    } = useSelector(
        ({ order, product, home }) => ({
            itemList: order.item.itemList,
            isActionLoading: order.item.isActionLoading,
            productList: product.list.productList,
            taxList: home.home.taxList,
            pagination: order.item.pagination
        }),
        shallowEqual
    );

    const dispatch = useDispatch();
    const [isShow, setShow] = useState(false);

    // product
    const handleSearchProduct = ({ value, type }) => {
        const params = {
            search: value,
            searchFields: `${type}:like`
        };
        dispatch(fetchProduct(params));
    };

    const columns = [
        { id: 'id', title: intl.formatMessage({ id: 'ORDER.ID' }) },
        { id: 'product', title: intl.formatMessage({ id: 'ORDER.PRODUCT' }) },
        { id: 'price', title: intl.formatMessage({ id: 'ORDER.PRICE' }) },
        { id: 'quantity', title: intl.formatMessage({ id: 'ORDER.QUANTITY' }) },
        { id: 'box', title: intl.formatMessage({ id: 'ORDER.FORMALITY' }) },
        {
            id: 'property',
            title: intl.formatMessage({ id: 'ORDER.PROPERTIES' })
        },
        { id: 'cost', title: intl.formatMessage({ id: 'ORDER.COST' }) },
        { id: 'purchase', title: intl.formatMessage({ id: 'PURCHASE.TITLE' }) },
        { id: 'note', title: intl.formatMessage({ id: 'ORDER.NOTE' }) },
        { id: 'number', title: intl.formatMessage({ id: 'ORDER.NUMBER_BOX' }) }
    ];

    const handleSubmitNew = values => {
        const paramItems = {
            page: 1,
            appends: 'product.unit;product.package;supplier',
            search: `order_id:${idOrder}`
        };
        const paramDetail = {
            id: idOrder,
            params: {
                with: 'shipmentInfor;attachments',
                appends: 'customer;shipmentMethod;transactions'
            }
        };

        dispatch(createOrderItem(values)).then(res => {
            if (res.type.includes('fulfilled')) {
                dialog.success(
                    intl.formatMessage({
                        id: 'ADD.ITEM.TITLE.SUCCESS'
                    })
                );
                setShow(false);
                dispatch(fetchOrderItem(paramItems));
                dispatch(fetchOrderById(paramDetail));
            } else {
                dialog.error(
                    intl.formatMessage({
                        id: 'ADD.ITEM.TITLE.FAIL'
                    })
                );
            }
        });
    };

    const rows =
        itemList &&
        itemList.map(item => {
            return {
                id: item.id || '',
                product: item.product ? (
                    <div className="item-card__product">
                        <div className="symbol symbol-85 mr-5">
                            <div className="symbol-label">
                                <img
                                    className="h-100 w-100"
                                    style={{ objectFit: 'cover' }}
                                    src={
                                        item.product.images?.url ||
                                        IMAGES.NOT_FOUND
                                    }
                                    alt="product"
                                />
                            </div>
                        </div>
                        <div className="item-card__product__name">
                            <p>{item.product.name || ''}</p>
                            <p>{item.product.id || ''}</p>
                        </div>
                    </div>
                ) : null,
                price: formatNumber(item.price) || 0,
                quantity: formatNumber(item.quantity) || 0,
                box: item.is_box ? 'Cái' : 'Thùng',
                property: item.properties ? item.properties : '-',
                cost: (
                    <div className="item-card">
                        <p>
                            {intl.formatMessage({ id: 'ORDER.MONEY_GOODS' })}:{' '}
                            {formatNumber(item.amount)}
                        </p>
                        <p>
                            {intl.formatMessage({ id: 'ORDER.TAX_PERCENT' })}:{' '}
                            {item.tax_percent}%
                        </p>
                        <p>
                            {intl.formatMessage({ id: 'ORDER.TAX_DISCOUNTS' })}:{' '}
                            {item.discount_tax_per_tax_percent}%
                        </p>
                        <p>
                            {intl.formatMessage({ id: 'ORDER.TAX_MONEY' })}:{' '}
                            {formatNumber(item.tax)}
                        </p>
                        <p>
                            <b>
                                {intl.formatMessage({
                                    id: 'ORDER.TOTAL_MONEY'
                                })}
                                :
                            </b>{' '}
                            <b>{formatNumber(item.balance)}</b>
                        </p>
                    </div>
                ),
                purchase: item.order_item_purchases?.map((item, index) => (
                    <div key={index}>
                        <p>
                            {intl.formatMessage({ id: 'ORDER.QUANTITY' })}:{' '}
                            {formatNumber(item.quantity)}
                        </p>
                        <p>
                            {intl.formatMessage({ id: 'ORDER.PRICE' })}:{' '}
                            {formatNumber(item.price)}
                        </p>
                    </div>
                )),
                note: item.note || '-',
                number: formatNumber(item?.product?.package?.quantity)
            };
        });
    return (
        <>
            <Card>
                {isActionLoading && <Loading local={true} />}
                <CardHeader title={intl.formatMessage({ id: 'ORDER.ITEM' })}>
                    <CardHeaderToolbar>
                        {' '}
                        {statusOrder === 'Pending' ? (
                            <button
                                style={{ minWidth: '100px' }}
                                type="button"
                                className="btn btn-primary"
                                onClick={() => setShow(true)}
                            >
                                <FormattedMessage id="BUTTON.ADD.ITEM" />
                            </button>
                        ) : (
                            ''
                        )}
                    </CardHeaderToolbar>
                </CardHeader>
                <CardBody>
                    <ItemTable
                        columns={columns}
                        rows={rows}
                        isDelete={false}
                        onViewEdit={onEdit}
                        onPageChange={onPageChange}
                        page={pagination.currentPage}
                        lastpage={pagination.lastPage}
                    />
                </CardBody>
            </Card>
            <DialogAddItem
                show={isShow}
                onHide={() => setShow(false)}
                intl={intl}
                productList={productList}
                onSearchProduct={handleSearchProduct}
                taxList={taxList}
                onAddItem={handleSubmitNew}
                idOrder={idOrder}
            ></DialogAddItem>
        </>
    );
}

export default ItemCard;
