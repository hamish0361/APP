const { createSelector } = require("reselect");

const getGoodsDelivery = state => state.warehouse.outBoundPicker.goodsDelivery.data;

const getTargetBoxes = createSelector(
    [getGoodsDelivery],
    (goodsDelivery) => {
        let targetBoxes = {};

        if (!goodsDelivery) return targetBoxes;

        targetBoxes = goodsDelivery.pivot_boxes.reduce((prevV, curV) => {
            if(prevV[curV.box_lading_bill.owning_box.box_id]) prevV[curV.box_lading_bill.owning_box.box_id].quantity += curV.quantity;
            else prevV[curV.box_lading_bill.owning_box.box_id] = {
                quantity: curV.quantity,
                count: 0
            }

            return prevV;
        }, {...targetBoxes});

        targetBoxes = goodsDelivery.out_bound_pickers.reduce((prevV, curV) => {
            if(prevV[curV.box_id]) prevV[curV.box_id].count += curV.quantity;
            else prevV[curV.box_id] = {
                count: curV.quantity,
                quantity: 0
            }

            return prevV;
        }, {...targetBoxes});

        return targetBoxes;
    }
)

export default getTargetBoxes;