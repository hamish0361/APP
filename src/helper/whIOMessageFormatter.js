import moment from 'moment';

const boxMessageFormatter = ({
    type = "success",
    box_id,
    container,
    quantity = 1,
    created_at = moment().format("DD-MM-YYYY HH:mm"),
    messageId,
    palletId
}) => {
    return {
        type: 'BOX',
        box_id,
        status: type,
        time: created_at,
        container,
        quantity,
        id: messageId,
        palletId
    }
}

const palletMessageFormatter = ({
    pallet_id,
    type,
    created_at = moment().format("DD-MM-YYYY HH:mm"),
    container,
    quantity = 1,
    messageId
}) => {
    return {
        type: 'PALLET',
        pallet_id,
        status: type,
        time: created_at,
        container,
        quantity,
        id: messageId
    }
}

const notifyMessageFormatter = ({
    created_at = moment().format("DD-MM-YYYY HH:mm"),
    container,
    transObj,
    messageId
}) => {
    return {
        type: 'NOTIFY',
        time: created_at,
        container,
        transObj,
        box_id: transObj.value.box_id,
        quantity: transObj.value.quantity,
        id: messageId
    }
}

export { boxMessageFormatter, palletMessageFormatter, notifyMessageFormatter }