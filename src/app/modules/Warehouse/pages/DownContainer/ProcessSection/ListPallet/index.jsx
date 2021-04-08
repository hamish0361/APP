import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import clsx from 'clsx';
import { toAbsoluteUrl } from '_metronic/_helpers';
import useTrans from 'helper/useTrans';
import { downContainerAction } from 'app/modules/Warehouse/warehouse-redux/downContainerSlice';
import getCurrentContainer from 'app/modules/Warehouse/selector/DownContainer/getCurrentContainer';
import getcurrentPallet from 'app/modules/Warehouse/selector/DownContainer/getCurrentPallet';
import warehouseApi from 'apis/warehouse';

import SVG from 'react-inlinesvg';
import ModalSavePallet from 'app/modules/Warehouse/components/List/ListPallet/ModalSavePallet';
import SelectPalletType from 'app/components/Select/SelectPalletType';
import { ProgressBar } from 'react-bootstrap';

import './index.scss';
import { dialog } from 'app/components/DialogNotify';

const ListPallet = props => {

    const [modalSavePallet, setModalSavePallet] = useState({
        show: false,
        id: ''
    });
    const listPallets = useSelector(state => state.warehouse.downContainer.listPallets.data);
    const currentPallet = useSelector(getcurrentPallet);
    const currentContainer = useSelector(getCurrentContainer);
    const [trans] = useTrans();
    const dispatch = useDispatch();

    const savePallet = (pallet_id) => {
        setModalSavePallet({
            show: true,
            id: pallet_id
        });
    }

    const hideModalSavePallet = () => {
        setModalSavePallet({
            show: false,
            id: ''
        });
    }

    const handleChangePalletType = (type_id, pallet) => {
        warehouseApi.pallet.update(pallet.id, { type_id })
            .then(() => {
                dialog.success(trans("warehouse.pallet.update.success"));

                return warehouseApi.pallet
                    .fetchPallet(pallet.id, { with: 'location.shelve.area;pivotBoxes' })
            })
            .then(res => {
                dispatch(downContainerAction.addPallet(res));
            })
            .catch((err) => {
                console.error(err);

                dialog.error(trans("warehouse.pallet.update.failure"))
            })
    }

    if (!currentContainer || !listPallets.length) return <></>;

    return (
        <div className="container-load-down-pallets">
            <ModalSavePallet
                {...modalSavePallet}
                onHide={hideModalSavePallet}
            />

            <div className="list-pallet">
                {listPallets.map((pallet) => (
                    <div className={clsx("pallet-item", currentPallet?.id === pallet.id && "selected")} key={`pallet-item-${pallet.id}`}>
                        <div className="d-flex align-items-center">
                            <span onClick={() => savePallet(pallet.id)} className="save-location-icon">
                                <SVG
                                    src={toAbsoluteUrl(
                                        '/media/svg/icons/Navigation/Route.svg'
                                    )}
                                ></SVG>
                            </span>

                            <div className="pallet-item--info">
                                <div className="pallet-item--id">
                                    {pallet.id}
                                </div>
                                <div className="pallet-item--quantity_box">{trans("warehouse.sku.quantity")}: {pallet.quantity_boxes || 0}</div>
                            </div>

                            <SelectPalletType showLabel={false} value={pallet?.type_id} onChange={(type_id) => handleChangePalletType(type_id, pallet)} />

                        </div>
                        <div className="progress-pallet">
                            <div className="progress-pallet--item">
                                <span className="text-success">V: </span>
                                <ProgressBar variant="success" now={pallet?.boxes_volume} max={pallet?.type?.max_volume} />
                            </div>

                            <div className="progress-pallet--item">
                                <span className="text-primary">W: </span>
                                <ProgressBar variant="info" now={pallet?.boxes_weight} max={pallet?.type?.max_weight} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

ListPallet.propTypes = {

};

export default ListPallet;