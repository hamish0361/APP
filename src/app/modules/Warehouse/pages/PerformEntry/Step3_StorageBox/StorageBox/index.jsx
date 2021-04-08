import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getAllPalletIDFromBoxList, performEntryAction, updatePalletData } from 'app/modules/Warehouse/warehouse-redux/performEntrySlice';

import { Card, CardBody, CardHeader } from '_metronic/_partials/controls';
import ListPallet from 'app/modules/Warehouse/components/List/ListPallet';
import ListBoxOnPallet from 'app/modules/Warehouse/components/List/ListBoxOnPallet';

import './index.scss';
import useTrans from 'helper/useTrans';

const StorageBox = props => {

    const palletsPagination = useSelector(state => state.warehouse.performEntry.storage.pallets.pagination);
    const dispatch = useDispatch();
    const params = useParams();
    const [trans] = useTrans();

    useEffect(() => {
        if (params?.sfa_id) {
            dispatch(getAllPalletIDFromBoxList({ sfa_id: params?.sfa_id, page: palletsPagination.page }))
        }
    }, [params?.sfa_id, palletsPagination.page]); // eslint-disable-line

    const handleSelectPallet = (pallet) => {
        dispatch(performEntryAction.setCurrentPallet(pallet));
    }

    const handleAddPallet = (palletId) => {
        dispatch(updatePalletData({ palletId }))
    }

    const handlePagePalletsChange = (page) => {
        dispatch(performEntryAction.setListPalletsPage(page));
    }

    return (
        <Card className="position-relative storage-b-x-card">
            <CardHeader title={trans("MENU.WAREHOUSE.STORAGE_GOODS")}></CardHeader>
            <CardBody className="storage-box-container">
                <div className="row">
                    <div className="col-lg-4 col-md-4 col-sm-12">
                        <ListPallet onSelect={handleSelectPallet} onAddPallet={handleAddPallet} pagination={palletsPagination} onChangePage={handlePagePalletsChange} />
                    </div>
                    <div className="col-lg-8 col-md-8 col-sm-12">
                        <ListBoxOnPallet />
                    </div>
                </div>
            </CardBody>
        </Card>
    );
};

StorageBox.propTypes = {

};

export default StorageBox;