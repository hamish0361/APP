import ItemTable from 'app/modules/Purchase/components/ItemTable';
import formatNumber from 'helper/formatNumber';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Button } from 'reactstrap';
import {
    Card,
    CardHeader,
    CardHeaderToolbar
} from '_metronic/_partials/controls';

DivisionItemCard.propTypes = {
    onDivisionClick: PropTypes.func,
    onDelete: PropTypes.func,
    onViewEdit: PropTypes.func,

    items: PropTypes.array
};

function DivisionItemCard({
    intl,
    onDivisionClick,
    items,
    onDelete,
    onViewEdit
}) {
    const columns = [
        {
            id: 'id',
            title: intl.formatMessage({ id: 'ORDER.ID' })
        },
        {
            id: 'order_product_id',
            title: intl.formatMessage({ id: 'ORDER.ID' })
        },
        { id: 'price', title: intl.formatMessage({ id: 'ORDER.PRICE' }) },
        { id: 'quantity', title: intl.formatMessage({ id: 'ORDER.QUANTITY' }) }
    ];

    const rows = items?.map(item => {
        return {
            id: item.id,
            order_product_id: item.order_product_id,
            price: formatNumber(item.price),
            quantity: formatNumber(item.quantity)
        };
    });

    return (
        <Card className="h-100">
            <CardHeader
                title={intl.formatMessage({
                    id: 'PURCHASE.ITEM.DIVISION_GOODS'
                })}
            >
                <CardHeaderToolbar>
                    <Button color="primary" onClick={onDivisionClick}>
                        <FormattedMessage id="GLOBAL.BUTTON.DIVISION" />
                    </Button>
                </CardHeaderToolbar>
            </CardHeader>
            <div className="px-8 pb-8">
                <ItemTable
                    columns={columns}
                    rows={rows}
                    onDelete={onDelete}
                    onViewEdit={onViewEdit}
                    isPagination={false}
                />
            </div>
        </Card>
    );
}

export default DivisionItemCard;
