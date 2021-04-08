const { createSelector } = require("reselect");

const selectCurrentContainerIdx = state => state.warehouse.loadUpContainer.currentContainer;
const selectListInvoices = state => state.warehouse.loadUpContainer.listInvoices.data;

const getCurrentContainer = createSelector(
    [selectCurrentContainerIdx, selectListInvoices],
    (currentContainerIdx, listInvoices) => {
        const currentContainer = listInvoices[currentContainerIdx];

        return currentContainer;
    }
)

export default getCurrentContainer;