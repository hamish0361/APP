import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import warehouseApi from 'apis/warehouse';
import handleApiError from 'helper/handleApiError';
import { fetchLocations } from 'app/modules/Warehouse/warehouse-redux/locationSlice';

import { Button, Modal } from 'react-bootstrap';
import FormAddLocation from '../../../Form/FormAddLocation';
import { startPrinter } from 'app/components/PrinterModal';
import { printerTemplate } from 'helper/printerTemplateData';
import useTrans from 'helper/useTrans';

const FormCreateLocation = ({ setLoading, onSuccess, toggleFormSelected }) => {

    const areaList = useSelector(state => state.warehouse.area.list);
    const dispatch = useDispatch();
    const formRef = useRef();
    const [trans] = useTrans();

    const handleSaveLocation = (values, form) => {
        setLoading(true);
        warehouseApi.location.create(values)
            .then((res) => {

                startPrinter(printerTemplate.location(res));

                dispatch(fetchLocations({ with: 'shelve.area', orderBy: 'updated_at', sortedBy: 'asc', })).then(() => {
                    onSuccess && onSuccess(res);
                });
            })
            .catch((err) => {
                handleApiError(err, form);
            })
            .finally(() => {
                setLoading(false);
            })
    }

    const triggerSubmit = () => {
        formRef.current.submitForm();
    }

    return (
        <div className="modal-create-location">
            <Modal.Body>
                <FormAddLocation
                    initialValues={{
                        area_id: areaList?.[0]?.id,
                        shelve_id: '',
                        floor: 1,
                        row: 1,
                        column: 1
                    }}
                    onSubmit={handleSaveLocation}
                    ref={formRef}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={toggleFormSelected} className="btn-large">{trans("common.back")}</Button>
                <Button variant="primary" onClick={triggerSubmit} className="btn-large">{trans("common.save")}</Button>
            </Modal.Footer>
        </div>
    );
};

FormCreateLocation.propTypes = {
    setLoading: PropTypes.func,
    onSuccess: PropTypes.func,
    toggleFormSelected: PropTypes.func
};

export default FormCreateLocation;