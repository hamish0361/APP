import React from 'react';

import warehouseApi from 'apis/warehouse';
import handleApiError from 'helper/handleApiError';

import { Form, Formik } from 'formik';
import { Button, Modal } from 'react-bootstrap';
import * as Yup from 'yup';
import SelectLocationForm from 'app/components/Select/SelectLocation/SelectLocationForm';
import useTrans from 'helper/useTrans';

export const savePalletSchema = Yup.object().shape({
    location_id: Yup.string().required('Required')
});

const FormSelectLocation = ({ setLoading, closeModal, onSuccess, id, toggleFormSelected }, ref) => {

    const [trans] = useTrans();

    const handleSavePallet = (values, form) => {
        setLoading(true);
        warehouseApi.pallet.update(id, values)
            .then((res) => {
                onSuccess && onSuccess(res);
                closeModal();
            })
            .catch((err) => {
                handleApiError(err, form);
            })
            .finally(() => {
                setLoading(false);
            })
    }

    return (
        <Formik
            initialValues={{
                location_id: ''
            }}
            enableReinitialize
            validationSchema={savePalletSchema}
            onSubmit={handleSavePallet}
            innerRef={ref}
        >
            {({ handleSubmit }) => (
                <div className="modal-save-pallet">
                    <Modal.Body>
                        <Form>
                            <SelectLocationForm name="location_id" defaultQuery={{ criteria: 'PalletEmpty' }} />
                            <small>{trans("warehouse.location.no_have_position")} ? <button className="btn btn-link" onClick={toggleFormSelected}>{trans("warehouse.location.create.title")}</button></small>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeModal} className="btn-large">{trans("common.cancel")}</Button>
                        <Button variant="primary" onClick={handleSubmit} className="btn-large">{trans("common.save")}</Button>
                    </Modal.Footer>
                </div>
            )}
        </Formik>
    );
};

export default React.forwardRef(FormSelectLocation);