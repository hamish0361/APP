import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import useCRUDReceipt from './useCRUDReceipt';
import { fetchSFA } from 'app/modules/Warehouse/warehouse-redux/sfaSlice';

import FormAddReceipt from 'app/modules/Warehouse/components/Form/FormAddReceipt';
import Loading from 'app/components/Loading';
import EmptyData from 'app/components/EmptyData';
import {
    Button,
} from '@material-ui/core';
import ModalConfirm from 'app/modules/Warehouse/components/ModalConfirm';

import './EditReceipt.scss';
import useTrans from 'helper/useTrans';
import NeedPermission from 'app/components/NeedPermission';

const EditReceipt = ({ closeSection }) => {

    const sfa = useSelector(state => state.warehouse.sfa.detail.data);
    const dispatch = useDispatch();
    const [loading, createReceipt, deleteReceipt] = useCRUDReceipt({
        onRefresh: () => {
            dispatch(fetchSFA({ id: sfa.id, with: 'boxes;agency;receipts' }))
        }
    });
    const modalConfirmRef = useRef();
    const [trans] = useTrans();

    const handleCreateReceipt = (values, form) => {

        if (!values.file) return;

        createReceipt({ sfaId: sfa.id, file: values.file }, form);
    }

    const handleDeleteReceipt = ({ receiptId }) => {
        deleteReceipt(receiptId);
    }

    const confirmDeleteReceipt = (receipt) => {
        modalConfirmRef.current.open({
            title: trans("warehouse.receipt.confirm_delete"),
            receiptId: receipt.id,
        });
    }

    const handleDownload = (receipt) => {
        window.open(`${process.env.REACT_APP_API_URL_WAREHOUSE}/files/${receipt.path_file}`, '_blank');
    }

    return (
        <div className="edit-receipt">
            <ModalConfirm ref={modalConfirmRef} onOk={handleDeleteReceipt} />
            <div className="d-flex">
                <div className="form-edit-receipt position-relative">
                    {loading && <Loading local />}
                    <FormAddReceipt initialValues={{ file: '' }} onSubmit={handleCreateReceipt} closeSection={closeSection} />
                </div>

                <div className="receipt-list">
                    {!sfa?.receipts?.length && <EmptyData emptyText="Không có receipt nào." />}
                    {sfa && (sfa.receipts || []).map((receipt, rIdx) => (
                        <div className="receipt-item" key={`receipt-item-${rIdx}`}>
                            <div className="receipt-info">
                                <div className="receipt-path">{trans("common.file_path")}: <span className="font-weight-bold">{receipt.path_file}</span></div>
                                <div className="receipt-time-create">{trans("common.created_at")}: <span className="font-weight-bold">{receipt.created_at}</span></div>
                            </div>

                            <div className="receipt-actions">
                                <NeedPermission need={["receipts.index"]}>
                                    <Button
                                        color="primary"
                                        size="small"
                                        onClick={() => handleDownload(receipt)}
                                    >
                                        {trans("common.download")}
                                    </Button>
                                </NeedPermission>

                                <NeedPermission need={["receipts.delete"]}>
                                    <Button
                                        size="small"
                                        onClick={() => confirmDeleteReceipt(receipt)}
                                    >
                                        {trans("warehouse.receipt.delete.title")}
                                    </Button>
                                </NeedPermission>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

EditReceipt.propTypes = {
    closeSection: PropTypes.func
};

export default EditReceipt;