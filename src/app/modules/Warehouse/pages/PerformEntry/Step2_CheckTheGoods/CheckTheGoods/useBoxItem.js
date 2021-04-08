import { useState } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import { fetchBox } from 'app/modules/Warehouse/warehouse-redux/boxSlice';
import usePermission from 'app/components/NeedPermission/usePermission';
import { fetchBoxItemsOfCurrentBox, performEntryAction } from 'app/modules/Warehouse/warehouse-redux/performEntrySlice';
import useTrans from 'helper/useTrans';
import _ from 'lodash';
import moment from 'moment';
import playAudio from 'helper/playAudio';
import productApi from 'apis/product-api/productApi';
import warehouseApi from 'apis/warehouse';
import { startPrinter } from 'app/components/PrinterModal';
import { printerTemplate } from 'helper/printerTemplateData';

import { dialog } from 'app/components/DialogNotify';

export default function useBoxItem(modalConfirmRef) {

    const agencyList = useSelector(state => state.warehouse.agency.list);
    const currentBox = useSelector(state => state.warehouse.box.detail.data);
    const listBoxItems = useSelector(state => state.warehouse.performEntry.checking_goods.box_items);
    const dispatch = useDispatch();
    const [trans] = useTrans();
    const [loading, setLoading] = useState(false);
    const canAddBoxItem = usePermission(['box-items']);
    const params = useParams();

    const addBoxItem = (params) => {
        dispatch(performEntryAction.addBoxItem(params))
    }

    const createOrUpdateBoxItem = (data, form) => {
        playAudio(`${process.env.PUBLIC_URL}/media/audio/worf.mp3`);

        addBoxItem(data, form);
    }

    const getProductInfo = (product_id) => {
        return productApi.fetchProductById({ id: product_id, params: { with: 'package' } })
            .catch(() => {
                dialog.error(trans("warehouse.sku.box_item.not_found", { id: product_id }));
                playAudio(`${process.env.PUBLIC_URL}/media/audio/wrong-answer.mp3`)
            });
    }

    const isBoxCanIncludeProduct = (product) => {
        let productVolume = product?.package?.volume || 0;

        if (currentBox.volume_per_box > productVolume) return true;

        return false;
    }

    const handleAddBoxItem = (values, form) => {

        if (!canAddBoxItem) {
            playAudio(`${process.env.PUBLIC_URL}/media/audio/wrong-answer.mp3`)
            dialog.error(trans("warehouse.box_item.create.need_permission"));

            return;
        }

        getProductInfo(values.product_id).then((product) => {

            if (!product) return;

            if (isBoxCanIncludeProduct(product)) createOrUpdateBoxItem({ ...values, box_id: currentBox.id, product }, form);
            else {
                playAudio(`${process.env.PUBLIC_URL}/media/audio/wrong-answer.mp3`)

                modalConfirmRef.current.open({
                    title: trans("warehouse.sku.confirm_box_over_volume.item"),
                    formData: { ...values, box_id: currentBox.id, product },
                    form
                });
            }
        })

        setTimeout(() => {
            form.resetForm();
        }, 200);
    }

    const continueAddProduct = ({ formData, form }) => {
        createOrUpdateBoxItem(formData, form)
    }

    const updateBoxItem = (key, rowIdx, newData) => {
        if (!canAddBoxItem) {
            playAudio(`${process.env.PUBLIC_URL}/media/audio/wrong-answer.mp3`)
            dialog.error(trans("warehouse.box_item.update.need_permission"));

            return;
        }

        switch (key) {
            case 'quantity':
                dispatch(performEntryAction.updateQuantityBoxItem({ rowIdx, quantity: newData }))
                break;

            case 'expiry_date':
                dispatch(performEntryAction.updateExpiryDateBoxItem({ rowIdx, expiry_date: newData }))
                break;

            default:
                return;
        }
    }

    const deleteBoxItem = (row, rowIdx) => {
        if (!canAddBoxItem) {
            playAudio(`${process.env.PUBLIC_URL}/media/audio/wrong-answer.mp3`)
            dialog.error(trans("warehouse.box_item.delete.need_permission"));

            return;
        }

        dispatch(performEntryAction.deleteBoxIem({ rowIdx, isRespectRedux: !row.id }));

        if (row.id) {
            warehouseApi.boxItem.delete(row.id)
                .then(() => {
                    dialog.success(trans("warehouse.box_item.delete.success"));
                })
                .catch(() => {
                    dialog.error(trans("warehouse.box_item.delete.failure"));
                    dispatch(performEntryAction.addBoxItem(row));
                });
        }
    }

    const closeBoxItems = () => {

        if (!canAddBoxItem) {
            playAudio(`${process.env.PUBLIC_URL}/media/audio/wrong-answer.mp3`)
            dialog.error(trans("warehouse.box_item.need_permission"));

            return;
        }

        let sumListBoxItems = [...listBoxItems].reduce((prevV, curV) => {
            if (prevV[curV.product_id]) {
                let expiry_date = prevV[curV.product_id].expiry_date || curV.expiry_date;

                if (expiry_date && moment(expiry_date, 'DD-MM-YYYY', true).isValid()) expiry_date = moment(expiry_date, 'DD-MM-YYYY').format("YYYY-MM-DD");

                prevV[curV.product_id] = {
                    ...prevV[curV.product_id],
                    id: prevV[curV.product_id].id || curV.id,
                    quantity: prevV[curV.product_id].quantity + Number(curV.quantity),
                    expiry_date
                }
            }
            else {
                prevV[curV.product_id] = {
                    ...curV,
                    quantity: Number(curV.quantity),
                    expiry_date: curV.expiry_date ? moment(curV.expiry_date, 'DD-MM-YYYY').format("YYYY-MM-DD") : null
                };
            }

            return prevV;
        }, {});

        setLoading(true);
        Promise.all(Object.values(sumListBoxItems).map((boxItem) => {
            if (boxItem.id) return warehouseApi.boxItem.update(boxItem.id, _.pick(boxItem, ["product_id", 'box_id', "quantity", 'expiry_date']));

            return warehouseApi.boxItem.create(_.pick(boxItem, ['quantity', 'box_id', 'product_id', 'expiry_date']));
        })).then(() => {
            dialog.success(trans("warehouse.sku.box_item.close.success"));

            dispatch(fetchBoxItemsOfCurrentBox());
            dispatch(fetchBox({ id: params?.box_id, with: 'childs;items' })).then((res) => {
                if (res.type.includes('fulfilled')) {
                    rePrintSKU(res.payload);
                }
            });
        }).catch((err) => {
            console.error(err);

            dialog.error(trans("warehouse.sku.box_item.close.failure"))
        }).finally(() => {
            setLoading(false);
        })
    }

    const rePrintSKU = (newDataBox) => {
        let matchedAgency = _.find(agencyList, ({ id }) => id == newDataBox?.sfa?.agency_id); // eslint-disable-line

        startPrinter(printerTemplate.sku({
            ...newDataBox,
            region: matchedAgency?.name || 'Tokyo'
        }));
    }

    return { handleAddBoxItem, continueAddProduct, updateBoxItem, deleteBoxItem, loading, closeBoxItems };
}