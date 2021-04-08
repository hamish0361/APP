const { createSelector } = require("reselect");

const selectCurrentPalletIdx = state => state.warehouse.downContainer.currentPallet;
const selectListPallets = state => state.warehouse.downContainer.listPallets.data;

const getcurrentPallet = createSelector(
    [selectCurrentPalletIdx, selectListPallets],
    (currentPalletIdx, listPallets) => {
        const currentPallet = listPallets[currentPalletIdx];

        return currentPallet;
    }
)

export default getcurrentPallet;