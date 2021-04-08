import formatNumber from 'helper/formatNumber';
import useTrans from 'helper/useTrans';

export default function useColumns() {

    const [trans] = useTrans();

    return [
        {
            id: ["delivery_partner", "name"],
            title: trans("warehouse.delivery_partner.title"),
            render: (partner_name) => partner_name || '---'
        },
        {
            id: ["goods_delivery_status", "name"],
            title: trans("warehouse.goods_delivery_status.title"),
        },
        {
            id: 'shipping_cost',
            title: trans("warehouse.cost.shipping"),
            render: (shipping_cost) => formatNumber(shipping_cost)
        },
        {
            id: "box_lading_bills",
            title: trans("warehouse.sku.quantity"),
            render: (box_lading_bills) => {
                let totalQuantity = 0;

                if (box_lading_bills) {
                    box_lading_bills.reduce((prevV, curV) => {
                        return prevV + (curV?.pivot?.quantity || 0);
                    }, 0);
                }

                return formatNumber(totalQuantity);
            }
        }
    ]
}