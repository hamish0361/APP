/**
 * Lấy list máy in
 * --> Chọn máy in
 * --> Gửi data tới máy in
 * --> Printer running
 * --> Notify result
 */

/** Data máy in sẽ nhận được */

import moment from 'moment';

const DATE_FORMAT = "DD-MM-YYYY";

const TEMPLATE_DATA = {
    type: "",
    palletId: "undefined",
    sfaId: "undefined",
    locationId: "undefined",
    tracking: "undefined",
    jancode: "undefined",
    sku: "undefined",

    quantity: "1",
    startIndex: "1",

    itemQuantity: "0",
    sfaQuantity: "0",

    region: "Tokyo",
    floor: "undefined",
    row: "undefined",
    column: "undefined",
    createdDate: "undefined",
}

const getTemplateData = (type, data) => {

    console.log({
        ...applyDataToTemplate(data),
        type,
    }, 'templateData')

    return JSON.stringify({
        ...applyDataToTemplate(data),
        type,
    });
}

const applyDataToTemplate = (obj) => {
    let newObj = { ...TEMPLATE_DATA };
    Object.entries(obj).forEach(([k, v]) => {
        if (newObj[k] && v !== undefined && v !== null) newObj[k] = v.toString();
    });

    return newObj;
}

/**
 * Reference:
 * 1: https://stackoverflow.com/questions/37744569/how-nodejs-send-p-touch-template-command-to-ql-720nw
 * 2: https://github.com/KingWu/NodePrinterExample/blob/master/app.js
 */

export const printerTemplate = {
    sku: (box) => getTemplateData('SKU', {
        ...box,
        sfaId: box.sfa_id,
        tracking: box?.sfa?.tracking,
        sku: box.id,

        quantity: box.duplicate,
        startIndex: "1",

        itemQuantity: box.itemQuantity || (box?.items?.length ? box.items.reduce((p, c) => p + c.quantity, 0) : 0),
        sfaQuantity: box?.sfa?.quantity,

        region: box?.sfa?.agency?.name || box.region,
        createdDate: box.created_at
    }),
    sfa: (sfa) => getTemplateData('SFA', {
        ...sfa,
        sfaId: sfa.id,
        tracking: sfa.tracking,

        quantity: sfa.quantity,
        startIndex: "1",
        sfaQuantity: sfa.quantity,

        region: sfa?.agency?.name || sfa.region,
        createdDate: sfa.created_at
    }),
    tracking: (tracking) => getTemplateData('TRACKING', {
        tracking: tracking.id,

        quantity: 2,
        startIndex: "1",

        sfaQuantity: tracking.sfaQuantity,

        region: "Tokyo",
        createdDate: moment().format(DATE_FORMAT)
    }),
    pallet: (pallet) => getTemplateData('PALLET', {
        ...pallet,
        palletId: pallet.id,

        quantity: 2,
        startIndex: "1",

        floor: pallet.floor,
        row: pallet.row,
        column: pallet.column,
        createdDate: moment().format(DATE_FORMAT)
    }),
    location: (location) => getTemplateData('LOCATION', {
        ...location,
        locationId: location.id,

        quantity: "1",
        startIndex: "1",

        floor: location.floor,
        row: location.row,
        column: location.column,
        createdDate: moment().format(DATE_FORMAT)
    }),
}