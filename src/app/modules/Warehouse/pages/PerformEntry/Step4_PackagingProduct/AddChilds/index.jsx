import React, { useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import warehouseApi from 'apis/warehouse';
import handleApiError from 'helper/handleApiError';
import { performEntryAction } from 'app/modules/Warehouse/warehouse-redux/performEntrySlice';

import { dialog } from 'app/components/DialogNotify';
import FormAddChild from 'app/modules/Warehouse/components/Form/FormAddChild';
import Loading from 'app/components/Loading';
import ModalNotEnoughVolume from './ModalNotEnoughVolume';
import useTrans from 'helper/useTrans';
import useF5SFA from '../hooks/useF5SFA';

const AddChilds = ({ onSuccess }) => {

    const currentBox = useSelector(state => state.warehouse.box.detail.data);
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const modalRef = useRef();
    const formRef = useRef();
    const dispatch = useDispatch();
    const [trans] = useTrans();
    const f5SFAData = useF5SFA();

    const handleAddChild = async (values) => {
        try {
            setLoading(true);
            formRef.current.resetForm();

            const [checkedRes, box] = await isEnoughVolumeForNewBox(values.box_id);

            if (!checkedRes) {
                modalRef.current.toggle(box);

                setLoading(false);
                return;
            }

            addChild(box);
        } catch (err) {
            handleApiError(err, formRef.current);
            setLoading(false);
            dialog.error(trans("warehouse.sku.get.failure"));
        }
    }

    const addChild = (childBox) => {

        if (!currentBox?.id) {
            dispatch(performEntryAction.addTempChildBox(childBox));
            setLoading(false);

            return;
        }

        warehouseApi.box
            .update(childBox.id, { box_parent_id: currentBox?.id })
            .then(() => {
                f5SFAData();
                dialog.success(trans("warehouse.sku.child.add.success"));
                onSuccess && onSuccess();
            })
            .catch(err => {
                dialog.error(trans("warehouse.sku.child.add.failure"));
                handleApiError(err, formRef.current);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    const isEnoughVolumeForNewBox = (box_id) => {
        return warehouseApi.box.fetchBox(box_id)
            .then(box => {
                if (availableCurrentBoxVolume === -1) return [true, box];
                return [box.volume < availableCurrentBoxVolume, box];
            })
    }

    const availableCurrentBoxVolume = useMemo(() => {
        if (!currentBox) return -1;

        if (!currentBox?.childs?.length) return currentBox.volume;

        const boxChildsVolume = currentBox.childs.reduce((p, c) => p + c.volume, 0);

        return currentBox.volume - boxChildsVolume;
    }, [currentBox]);

    const forceAddChild = (box) => {
        addChild(box);
    }

    return (
        <>
            <ModalNotEnoughVolume ref={modalRef} onOk={forceAddChild} />
            <div className="position-relative">
                {loading && <Loading local />}
                <FormAddChild
                    onSubmit={handleAddChild}
                    ref={formRef}
                    initialValues={{ box_id: '', box_parent_id: params?.box_id }}
                />
            </div>
        </>
    );
};

AddChilds.propTypes = {
    onSuccess: PropTypes.func,
};

export default AddChilds;