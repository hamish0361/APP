import React, { useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { performEntryAction, updatePalletData } from 'app/modules/Warehouse/warehouse-redux/performEntrySlice';
import warehouseApi from 'apis/warehouse';
import _ from 'lodash';
import { useScanBarcode, isSKUCode } from 'helper/useScanBarcode';
import useTrans from 'helper/useTrans';

import BoxItem from 'app/modules/Warehouse/components/List/ListBox/BoxItem';
import { dialog } from 'app/components/DialogNotify';
import Loading from 'app/components/Loading';
import EmptyData from 'app/components/EmptyData';
import SelectPalletType from 'app/components/Select/SelectPalletType';
import NeedPermission from 'app/components/NeedPermission';

import './index.scss';
import playAudio from 'helper/playAudio';

const ListBox = props => {

    const currentPallet = useSelector(state => state.warehouse.performEntry.storage.currentPallet);
    const loading = useSelector(state => state.warehouse.performEntry.storage.pallets.loading);
    // const { data: boxes, loading, pagination } = useSelector(state => state.warehouse.performEntry.storage.boxesInCurrentPallet);
    const dispatch = useDispatch();
    const inputAddSKURef = useRef();
    const inputChangePivotRef = useRef([]);
    const boxRef = useRef([]);
    const params = useParams();
    const [trans] = useTrans();

    useScanBarcode({
        condition: isSKUCode,
        onEnter: (v) => handleScanEnter(v)
    });

    const handleScanEnter = (v) => {
        createPalletBoxes(v);
    }

    useEffect(() => {
        return () => {
            dispatch(performEntryAction.resetStorage());
        }
    }, []); // eslint-disable-line

    useEffect(() => {
        if (currentPallet?.pivot_boxes) {
            currentPallet.pivot_boxes.forEach((b, bIdx) => {
                inputChangePivotRef.current[bIdx].value = b?.current_quantity || 0;
            });
        }
    }, [currentPallet])

    const handleKeyPress = (e) => {
        if (e.charCode === 13) addBoxToPallet();
    }

    const addBoxToPallet = () => {
        const boxID = inputAddSKURef.current.value;

        createPalletBoxes(boxID);
    }

    const createPalletBoxes = (box_id) => {

        if (!currentPallet || !box_id?.length) {
            playAudio("/media/audio/wrong-answer.mp3");

            return;
        }

        inputAddSKURef.current.value = '';
        let matchedBoxIdx = _.findIndex(currentPallet?.pivot_boxes || [], ({ boxId }) => boxId == box_id); // eslint-disable-line

        if (matchedBoxIdx !== -1) {
            dialog.error(trans("warehouse.sku.pivot.pallet.exist"));
            playAudio("/media/audio/wrong-answer.mp3");

            // Notify boxes on pallet
            boxRef.current[matchedBoxIdx].style.background = 'rgba(246, 78, 95, .1)';

            setTimeout(() => {
                boxRef.current[matchedBoxIdx].style.background = '';
            }, 3000);

            return;
        }

        warehouseApi.palletBoxes.create({
            box_id,
            pallet_id: currentPallet?.id,
            quantity: 1
        })
            .then(() => {
                // Xử lý khi cập nhật số lượng box trên pallet thành công
                dispatch(updatePalletData({ palletId: currentPallet?.id }));
                dialog.success(trans("warehouse.sku.pivot.pallet.create.success"));
                playAudio("/media/audio/worf.mp3");
            })
            .catch(() => {
                dialog.error(trans("warehouse.sku.pivot.pallet.create.failure"));
                playAudio("/media/audio/wrong-answer.mp3");
            })
    }

    const handleRemoveBoxOutPallet = (palletBox, idx) => {
        boxRef.current[idx].style.background = 'rgba(246, 78, 95, .1)';

        warehouseApi.palletBoxes.delete(palletBox.id)
            .then((res) => {
                dispatch(updatePalletData({ palletId: currentPallet?.id }));
                dialog.success(trans("warehouse.sku.pivot.pallet.delete.success"));
            })
            .catch((err) => {
                console.error(err);
                dialog.error(trans("warehouse.sku.pivot.pallet.delete.failure"));
            })
            .finally(() => {
                if (boxRef.current[idx]) boxRef.current[idx].style.background = '';
            })
    }

    const callApiChangePivot = (boxPallet, quantity, idx) => {

        boxRef.current[idx].style.background = 'rgba(246, 78, 95, .1)';

        warehouseApi.palletBoxes.update(boxPallet.id, {
            quantity
        })
            .then((res) => {
                // Xử lý khi cập nhật số lượng box trên pallet thành công
                dispatch(updatePalletData({ palletId: currentPallet?.id }));
                dialog.success(trans("warehouse.sku.pivot.pallet.update_quantity.success"));
            })
            .catch((err) => {
                console.error(err);
                dialog.error(trans("warehouse.sku.pivot.pallet.update_quantity.failure"));
                inputChangePivotRef.current[idx].value = getQuantityBoxWithCurrentPallet(boxPallet);
            })
            .finally(() => {
                if (boxRef.current[idx]) boxRef.current[idx].style.background = '';
            })
    }

    const getQuantityBoxWithCurrentPallet = useCallback((boxPallet) => {
        if (!currentPallet) return 0;

        return boxPallet.current_quantity || 0;

    }, [currentPallet]);

    const handlePressInputQuantity = (boxPallet, e, idx) => {
        if (e.charCode === 13) {
            callApiChangePivot(boxPallet, inputChangePivotRef.current[idx].value, idx);
        }
    }

    const handleChangePalletType = (type_id) => {
        warehouseApi.pallet.update(currentPallet.id, { type_id })
            .then(() => {
                dialog.success(trans("warehouse.pallet.update.success"));

                dispatch(performEntryAction.updateCurrentPallet({ type_id }))
            })
            .catch((err) => {
                console.erorr(err);

                dialog.error(trans("warehouse.pallet.update.failure"))
            })
    }

    return (
        <div className="list-box-in-pallet">
            <div className="head">
                <div className="d-flex flex-column">
                    <div className="title">{trans("warehouse.sku.pivot.pallet.title")}</div>
                    <NeedPermission need={['pallets.update']}>
                        <SelectPalletType
                            value={currentPallet?.type_id}
                            isDisabled={!currentPallet?.type_id}
                            onChange={handleChangePalletType}
                        />
                    </NeedPermission>
                </div>
                <div className="toolbar">
                    <NeedPermission need={['pallet-boxes.create']}>
                        <input
                            className="form-control"
                            disabled={!currentPallet}
                            placeholder={trans("warehouse.sku.pivot.pallet.create.title")}
                            ref={inputAddSKURef}
                            onKeyPress={handleKeyPress}
                        />
                    </NeedPermission>
                </div>
            </div>
            <div className="list-box position-relative">
                {loading && <Loading local />}
                <div className="list-box-items">
                    {!currentPallet?.pivot_boxes?.length ? (
                        <EmptyData emptyText={trans("warehouse.sku.pivot.pallet.empty")} />
                    ) : ''}
                    <NeedPermission need={'pallet-boxes.index'}>
                        {!!currentPallet?.pivot_boxes && currentPallet?.pivot_boxes.map((boxPallet, idx) => (
                            <div className="box-wrapper position-relative" key={`box-${idx}`} ref={ref => boxRef.current[idx] = ref}>
                                <BoxItem box={{ ...boxPallet.box, quantityOnPallet: boxPallet.current_quantity }} showQuantity={box => box.quantityOnPallet || 0} />
                                <div className="pivot-quantity">
                                    <label htmlFor="">{trans("common.quantity")}:</label>
                                    <NeedPermission need={'pallet-boxes.update'} fallback={(<span>{boxPallet.current_quantity}</span>)}>
                                        <input
                                            ref={ref => inputChangePivotRef.current[idx] = ref}
                                            className="input-change-pivot form-control"
                                            type="number"
                                            onKeyPress={e => handlePressInputQuantity(boxPallet, e, idx)}
                                        />
                                    </NeedPermission>
                                </div>
                                <span className="close-icon position-absolute" onClick={() => handleRemoveBoxOutPallet(boxPallet, idx)}>×</span>
                                {boxPallet?.box?.sfa_id !== params?.sfa_id && <span className="other-sfa">Other SFA</span>}
                            </div>
                        ))}
                    </NeedPermission>
                </div>
            </div>
        </div>
    );
};

ListBox.propTypes = {

};

export default ListBox;