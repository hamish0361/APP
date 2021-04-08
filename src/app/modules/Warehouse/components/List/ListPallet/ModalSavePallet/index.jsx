import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import CustomModal from 'app/components/CustomModal';
import FormSelectLocation from './FormSelectLocation';
import FormCreateLocation from './FormCreateLocation';

import './index.scss';
import clsx from 'clsx';
import useTrans from 'helper/useTrans';

const ModalSavePallet = ({ show, onSuccess, id, onHide }) => {

    const [formSelected, setFormSelected] = useState('select-location')
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const formSelectLocationRef = useRef();
    const [trans] = useTrans();

    const toggleFormSelected = (e) => {
        e && e.preventDefault();
        setFormSelected(formSelected === 'select-location' ? 'create-location' : 'select-location');
    }

    const closeModal = () => {
        setFormSelected('select-location');

        if(!onHide) {
            history.goBack();
        } else {
            onHide();
        }
    }

    const onCreateLocationSuccess = (data) => {
        formSelectLocationRef.current.setValues({ 'location_id': data.id });
        toggleFormSelected();
    }

    return (
        <CustomModal
            show={show}
            onHide={closeModal}
            title={trans("warehouse.pallet.save.title")}
            actionsLoading={loading}
        >
            <div className={clsx(formSelected !== 'select-location' && 'd-none')}>
                <FormSelectLocation
                    setLoading={setLoading}
                    onSuccess={onSuccess}
                    closeModal={closeModal}
                    id={id}
                    toggleFormSelected={toggleFormSelected}
                    ref={formSelectLocationRef}
                />
            </div>

            <div className={clsx(formSelected === 'select-location' && 'd-none')}>
                <FormCreateLocation
                    setLoading={setLoading}
                    onSuccess={onCreateLocationSuccess}
                    toggleFormSelected={toggleFormSelected}
                />
            </div>
        </CustomModal>
    );
};

ModalSavePallet.propTypes = {
    id: PropTypes.any,
    show: PropTypes.bool,
    onSuccess: PropTypes.func
};

export default ModalSavePallet;