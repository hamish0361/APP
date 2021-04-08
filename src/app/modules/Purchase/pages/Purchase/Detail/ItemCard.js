import Loading from 'app/components/Loading';
import ItemTable from '../../../components/ItemTable';
import formatNumber from 'helper/formatNumber';
import PropTypes from 'prop-types';
import React from 'react';
import {
    Card,
    CardBody,
    CardHeader,
    CardHeaderToolbar
} from '_metronic/_partials/controls';
import { Button } from 'reactstrap';
import { FormattedMessage } from 'react-intl';

ItemCard.prototype = {
    items: PropTypes.array,
    loading: PropTypes.bool,
    pagination: PropTypes.object,
    page: PropTypes.number,

    onEdit: PropTypes.func,
    onDivision: PropTypes.func,
    onPageChange: PropTypes.func,
    onNewItem: PropTypes.func,
    onDelete: PropTypes.func
};

function ItemCard({
    items,
    loading,
    page,
    pagination,
    onEdit,
    onDivision,
    onPageChange,
    onNewItem,
    onDelete,
    intl
}) {
    const columns = [
        { id: 'id', title: intl.formatMessage({ id: 'ORDER.ID' }) },

        { id: 'product', title: intl.formatMessage({ id: 'ORDER.PRODUCT' }) },
        { id: 'price', title: intl.formatMessage({ id: 'ORDER.PRICE' }) },
        { id: 'quantity', title: intl.formatMessage({ id: 'ORDER.QUANTITY' }) },
        {
            id: 'tax_percent',
            title: intl.formatMessage({ id: 'ORDER.TAX_PERCENT' })
        },
        { id: 'tax', title: intl.formatMessage({ id: 'TAX.TITLE' }) },
        { id: 'amount', title: intl.formatMessage({ id: 'ORDER.AMOUNT' }) },
        { id: 'balance', title: intl.formatMessage({ id: 'ORDER.BALANCE' }) },
        {
            id: 'note',
            title: intl.formatMessage({ id: 'ORDER.NOTE' }),
            width: '15%'
        },
        {
            id: 'trackings',
            title: intl.formatMessage({ id: 'ORDER.TRACKING' }),
            width: '15%'
        }
    ];

    const handleEdit = id => {
        onEdit(id);
    };

    const handleDivision = id => {
        onDivision(id);
    };
    const handleNewItem = () => {
        onNewItem();
    };

    const rows = items?.map(item => {
        return {
            id: item.id || '',
            product: (
                <div className="item-card__product">
                    <div className="item-card__product__name">
                        {item?.product_id || ''}
                    </div>
                </div>
            ),
            price: formatNumber(item.price),
            quantity: formatNumber(item.quantity),
            tax_percent: `${formatNumber(item.tax_percent)}%`,
            tax: formatNumber(item.tax),
            amount: formatNumber(item.amount),
            balance: formatNumber(item.balance),
            note: <div className="text-ellipsis">{item.note || '-'}</div>,
            trackings: item.tracking ? (
                <span
                    className={`label font-weight-bold label-lg label-inline m-2 ${
                        item.tracking?.checked
                            ? 'label-light-success'
                            : 'label-light-danger'
                    }`}
                >
                    {item.tracking?.id}
                </span>
            ) : null
        };
    });

    return (
        <Card>
            {loading && <Loading local={true} />}
            <CardHeader title={intl.formatMessage({ id: 'ORDER.ITEM' })}>
                <CardHeaderToolbar>
                    <Button color="primary" onClick={handleNewItem}>
                        <FormattedMessage id="GLOBAL.BUTTON.ADD" />
                    </Button>
                </CardHeaderToolbar>
            </CardHeader>
            <CardBody>
                <ItemTable
                    width="1500px"
                    columns={columns}
                    rows={rows}
                    page={page}
                    onViewEdit={handleEdit}
                    onDivision={handleDivision}
                    onPageChange={onPageChange}
                    lastpage={pagination.lastPage}
                    onDelete={onDelete}
                />
            </CardBody>
        </Card>
    );
}

export default ItemCard;
