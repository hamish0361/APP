import { useEffect } from 'react';
import useTrans from 'helper/useTrans';
import { useDispatch, useSelector } from 'react-redux';

import getCurrentContainer from 'app/modules/Warehouse/selector/DownContainer/getCurrentContainer';
import getcurrentPallet from 'app/modules/Warehouse/selector/DownContainer/getCurrentPallet';
import {
    downContainerAction,
    loadUpBox
} from 'app/modules/Warehouse/warehouse-redux/downContainerSlice';

import warehouseApi from 'apis/warehouse';
import { startPrinter } from 'app/components/PrinterModal';
import { printerTemplate } from 'helper/printerTemplateData';

import { dialog } from 'app/components/DialogNotify';
import { fetchPalletTypes } from 'app/modules/Warehouse/warehouse-redux/palletTypeSlice';

export default function useInputAdd() {
    const listPalletType = useSelector(state => state.warehouse.palletType.list.data);
    const currentPallet = useSelector(getcurrentPallet);
    const currentContainer = useSelector(getCurrentContainer);
    const [trans] = useTrans();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!listPalletType?.length) dispatch(fetchPalletTypes());
    }, []); // eslint-disable-line

    const loadBox = box_id => {
        /** Nếu chưa có container --> WARNING */
        if (!currentContainer) {
            dialog.warning(trans('warehouse.container.warning.less_invoice'));

            return;
        }

        /** Chưa có pallet được chọn --> WARNING */
        if (!currentPallet) {
            dialog.warning(trans('warehouse.container.warning.less_pallet'));

            return;
        }

        /** Gọi api load-out box */
        dispatch(loadUpBox({ id: box_id, pallet_id: currentPallet.id })).then(res => {
            if (!res.type.includes('fulfilled')) {
                dialog.error(
                    trans('warehouse.container.add_box.failure', {
                        data: box_id
                    })
                );
            }
        });
    };

    // const addBoxToPallet = data => {
    //     dispatch(downContainerAction.addBoxToPalletBoxes(data.box_id));
    // };

    /** Pick chọn pallet ID */
    const addPallet = palletId => {
        warehouseApi.pallet
            .fetchPallet(palletId, { with: 'location.shelve.area;pivotBoxes;type' })
            .then(res => {
                dispatch(downContainerAction.addPallet(res));
                dialog.success(trans('warehouse.pallet.select.success'));
            })
            .catch(() => {
                dialog.error(trans('warehouse.pallet.add.failure'));
            });
    };

    /** Thêm mới pallet */
    const addNewPallet = (e) => {
        e && e.target.blur();

        warehouseApi.pallet
            .create({ type_id: listPalletType?.[0]?.id })
            .then(res => {
                startPrinter(
                    printerTemplate.pallet(res)
                );
                dialog.success(trans('warehouse.pallet.select.success'));

                addPallet(res.id);
            })
            .catch(() => {
                dialog.error(
                    trans('warehouse.pallet.add.empty_pallet.failure')
                );
            });
    };

    return { loadBox, addPallet, addNewPallet };
}
