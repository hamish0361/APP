import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { toAbsoluteUrl } from '_metronic/_helpers';
import warehouseApi from 'apis/warehouse';
import { useFormikContext } from 'formik';
import useTrans from 'helper/useTrans';
import { fetchAgencies } from 'app/modules/Warehouse/warehouse-redux/agencySlice';

import SVG from 'react-inlinesvg';
import Button from 'app/components/Button';
import Popover from '@material-ui/core/Popover';
import { dialog } from 'app/components/DialogNotify';
import CustomModal from 'app/components/CustomModal';
import FormAddAgency from '../FormAddAgency';
import { Modal } from 'react-bootstrap';
import handleApiError from 'helper/handleApiError';

const AgencyLabel = props => {

    const { setFieldValue } = useFormikContext();
    /** Popover props */
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    /** Modal props */
    const [showModal, setShowModal] = useState(false);
    const [loadingModal, setLoadingModal] = useState(false);
    const formRef = useRef();

    const [trans] = useTrans();
    const dispatch = useDispatch();

    const toggleModal = () => {
        setShowModal(!showModal);
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const triggerForm = () => {
        formRef.current.submitForm();
    }

    const handleCreateAgency = (values, form) => {
        setLoadingModal(true);
        warehouseApi.agency.create(values)
            .then((response) => {
                dialog.success(trans("warehouse.agency.create.success"));
                setFieldValue('agency_id', response.id);
                dispatch(fetchAgencies());
                
                setAnchorEl(null);
                toggleModal();
            })
            .catch((err) => {
                handleApiError(err, form)
                dialog.error(trans("warehouse.agency.create.failure"));
            })
            .finally(() => {
                setLoadingModal(false);
            })
    }

    const openModalCreate = () => {
        toggleModal();
        handleClose();
    }

    return (
        <div className="agency-label">
            {trans("warehouse.agency.title")}

            <Button type="link" onClick={handleClick} className="p-0">
                <SVG
                    src={toAbsoluteUrl(
                        '/media/svg/icons/Code/Info-circle.svg'
                    )}
                ></SVG>
            </Button>

            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
            >
                <div className="p-3">
                    {trans("warehouse.agency.empty")} <Button type="link" onClick={openModalCreate}>{trans("warehouse.agency.create.title")}</Button>
                </div>
            </Popover>

            <CustomModal
                show={showModal}
                title={trans("warehouse.agency.create.title")}
                onHide={toggleModal}
                actionsLoading={loadingModal}
            >
                <Modal.Body>
                    <FormAddAgency
                        ref={formRef}
                        onSubmit={handleCreateAgency}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button type="secondary" onClick={toggleModal}>{trans("common.cancel")}</Button>
                    <Button loading={loadingModal} type="primary" onClick={triggerForm}>{trans("common.save")}</Button>
                </Modal.Footer>
            </CustomModal>
        </div>
    );
};

AgencyLabel.propTypes = {

};

export default AgencyLabel;