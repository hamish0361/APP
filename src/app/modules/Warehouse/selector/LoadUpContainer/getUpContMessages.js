import getCurrentContainer from "./getCurrentContainer";
const { createSelector } = require("reselect");

const getAllMessage = state => state.warehouse.loadUpContainer.process.message;

const getUpContMessages = createSelector(
    [getCurrentContainer, getAllMessage],
    (currentContainer, allMessages) => {

        if (!currentContainer || !allMessages.length) return [];

        return allMessages.filter(m => m.container.id === currentContainer.id);
    }
)

export default getUpContMessages;