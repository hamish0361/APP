import Loading from 'app/components/Loading';
import 'assets/css/order.scss';
import { IMAGES } from 'constant/Images';
import formatNumber from 'helper/formatNumber';
import PropTypes from 'prop-types';
import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { Card, CardBody, CardHeader } from '_metronic/_partials/controls';
import ItemTable from './ItemTable';

ItemCard.prototype = {
    onEdit: PropTypes.func,
    onPageChange: PropTypes.func,
    page: PropTypes.number
};

function ItemCard({ onEdit, onPageChange, intl }) {
    const { itemList, pagination, isActionLoading, isLoading } = useSelector(
        ({ order }) => ({
            itemList: order.item.itemList,
            pagination: order.item.pagination,
            isActionLoading: order.item.isActionLoading,
            isLoading: order.item.isLoading
        }),
        shallowEqual
    );

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
                number: formatNumber(item?.product?.package?.quantity),
                property: item.properties ? item.properties : '-',
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
                            {formatNumber(item.balance)}
                        </p>
                    </div>
                ),
                note: item.note || '-'
            };
        });

    return (
        <Card>
            {(isActionLoading || isLoading) && <Loading />}
            <CardHeader title={intl.formatMessage({ id: 'ORDER.ITEM' })} />
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
    );
}

export default ItemCard;
