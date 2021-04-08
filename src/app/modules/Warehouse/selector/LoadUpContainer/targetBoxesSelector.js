import getCurrentContainer from "./getCurrentContainer";

const { createSelector } = require("reselect");

const getTargetBoxes = createSelector(
    [getCurrentContainer],
    (currentContainer) => {
        let targetBoxes = {};

        if (!currentContainer) return targetBoxes;

        currentContainer.lading_bills.forEach(ladingBill => {
            targetBoxes = ladingBill.box_lading_bills.reduce((prevV, curV) => {
                if (prevV[curV.owning_box.box_id]) prevV[curV.owning_box.box_id].quantity += curV.quantity;
                else prevV[curV.owning_box.box_id] = {
                    quantity: curV.quantity,
                    count: 0
                }

                return prevV;
            }, { ...targetBoxes });
        });

        targetBoxes = currentContainer.in_pickers.reduce((prevV, curV) => {
            if (prevV[curV.box_id]) prevV[curV.box_id].count += curV.quantity;
            else prevV[curV.box_id] = {
                count: curV.quantity,
                quantity: 0
            }

            return prevV;
        }, { ...targetBoxes });

        return targetBoxes;
    }
)

export default getTargetBoxes;