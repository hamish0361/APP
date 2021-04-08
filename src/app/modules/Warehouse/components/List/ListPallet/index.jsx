import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Route, useRouteMatch } from 'react-router-dom';

import _ from 'lodash';
import warehouseApi from 'apis/warehouse';
import { performEntryAction } from 'app/modules/Warehouse/warehouse-redux/performEntrySlice';
import { useScanBarcode, isPalletCode } from 'helper/useScanBarcode';
import { startPrinter } from 'app/components/PrinterModal';
import { printerTemplate } from 'helper/printerTemplateData';
import useTrans from 'helper/useTrans';
import { fetchPalletTypes } from 'app/modules/Warehouse/warehouse-redux/palletTypeSlice';

import Loading from 'app/components/Loading';
import PalletItem from './PalletItem';
import InputAddPallet from './InputAddPallet';
import { dialog } from 'app/components/DialogNotify';
import ModalSavePallet from './ModalSavePallet';
import { Pagination } from '@material-ui/lab';
import EmptyData from 'app/components/EmptyData';

import './index.scss';
import NeedPermission from 'app/components/NeedPermission';

const ListPallets = ({ onSelect, onAddPallet, pagination, onChangePage }) => {

    const { data: listPallets, loading } = useSelector(state => state.warehouse.performEntry.storage.pallets);
    const listPalletType = useSelector(state => state.warehouse.palletType.list.data);
    const inputRef = useRef();
    const match = useRouteMatch();
    const dispatch = useDispatch();
    const [trans] = useTrans();

    useEffect(() => {
        if (!listPalletType.length) {
            dispatch(fetchPalletTypes());
        }
    }, []); // eslint-disable-line

    useScanBarcode({
        condition: isPalletCode,
        onEnter: (v, e) => handleScanEnter(v)
    });

    const handleScanEnter = (v) => {
        inputRef.current.value = v;
        onAddPallet && onAddPallet(v);

        setTimeout(() => {
            inputRef.current.value = '';
        }, 200);
    }

    const handleAddPallet = () => {

        const palletId = inputRef.current.value;

        if (!palletId?.length) return;

        setTimeout(() => {
            inputRef.current.value = '';
            inputRef.current.blur();
        }, 200);

        let matchedPalletInList = _.find(listPallets, ({ id }) => palletId == id) // eslint-disable-line
        if (matchedPalletInList) {
            /** Set this pallet to selected pallet */
            onSelect && onSelect(matchedPalletInList);

            return;
        }

        onAddPallet && onAddPallet(palletId);
    }

    const handleSavePalletSuccess = (res) => {
        warehouseApi.pallet.fetchPallet(res.id, { with: 'location.shelve.area;pivotBoxes' })
            .then((palletData) => {
                const matchedPalletIdx = _.findIndex(listPallets, ({ id }) => palletData.id == id); // eslint-disable-line

                const newListPallets = [...listPallets];
                newListPallets[matchedPalletIdx] = palletData;

                dispatch(performEntryAction.setListPallets(newListPallets));
            }).catch(() => {
                dialog.error(trans("warehouse.pallet.add.failure"))
            })
    }

    const handlePageChange = (e, page) => {
        onChangePage && onChangePage(page);
    }

    const handleAddNewPallet = () => {
        warehouseApi.pallet.create({
            type_id: listPalletType?.[0]?.id
        })
            .then((res) => {
                startPrinter(printerTemplate.pallet(res));
                dispatch(performEntryAction.addPalletToList(res));
                dispatch(performEntryAction.setCurrentPallet(res));
            })
            .catch(() => {
                dialog.error(trans("warehouse.pallet.add.empty_pallet.failure"))
            })
    }

    return (
        <div className="list-pallet-wrapper position-relative">
            <NeedPermission need="pallets.update">
                <Route path={`${match.path}/save-pallet/:pallet_id`}>
                    {({ match }) => (
                        <ModalSavePallet
                            id={match?.params?.pallet_id}
                            show={match !== null}
                            onSuccess={handleSavePalletSuccess}
                        />
                    )}
                </Route>
            </NeedPermission>
            {loading && <Loading local />}
            <div className="title mb-2">{trans("warehouse.pallet.list.title")}</div>
            <InputAddPallet onAdd={handleAddPallet} ref={inputRef} onAddNew={handleAddNewPallet} />
            <div className="list-pallet">
                {!listPallets.length ? (
                    <EmptyData emptyText={trans("warehouse.pallet.empty")} />
                ) : ''}
                {listPallets.map((pallet, idx) => (
                    <PalletItem pallet={pallet} key={`pallet-${idx}`} onSelect={onSelect} />
                ))}
            </div>

            <div className="pagination mt-3 justify-content-end">
                <Pagination
                    count={pagination.lastPage}
                    page={pagination.page}
                    shape="rounded"
                    onChange={handlePageChange}
                />
            </div>
        </div>
    );
};

ListPallets.propTypes = {
    onCheck: PropTypes.func
};

export default ListPallets;