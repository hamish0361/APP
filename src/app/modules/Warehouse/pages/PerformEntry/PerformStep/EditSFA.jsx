import React, { useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import warehouseApi from 'apis/warehouse';
import moment from 'moment';

import Button from 'app/components/Button';
import FormCreateSFA from 'app/modules/Warehouse/components/Form/FormCreateSFA';
import { dialog } from 'app/components/DialogNotify';
import handleApiError from 'helper/handleApiError';
import { fetchSFA } from 'app/modules/Warehouse/warehouse-redux/sfaSlice';
import useTrans from 'helper/useTrans';
import convertObjectDateToString from 'helper/convertObjectDateToString';

const EditSFA = ({ closeSection }) => {

    const { data: sfa } = useSelector(state => state.warehouse.sfa.detail);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const [trans] = useTrans();
    const formRef = useRef();

    const handleCOUSFA = (values, form) => {
        setLoading(true);

        const body = convertObjectDateToString(values);

        warehouseApi.SFA.update(sfa.id, body)
            .then((res) => {
                dialog.success(trans("warehouse.sfa.update.success"));
                closeSection && closeSection();
                dispatch(fetchSFA({ id: res.id, with: 'boxes;agency;receipts' }))
            })
            .catch(err => {
                console.error(err, 'err')
                dialog.error(trans("warehouse.sfa.update.failure"));

                handleApiError(err, form);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    const triggerSubmit = () => {
        formRef.current.submitForm();
    }

    const initialValues = useMemo(() => {
        if(!sfa) return undefined;

        return {
            ...sfa, 
            arrival_date: moment(sfa.arrival_date, 'DD-MM-YYYY HH:mm').toDate()
        }
    }, [sfa]);

    return (

        <>
            <FormCreateSFA
                formItemClass={'col-lg-4 col-md-6 col-sm-12'}
                editMode
                onSubmit={handleCOUSFA}
                initialValues={initialValues}
                ref={formRef}
            />

            <div className="step-actions text-right">
                <Button
                    type="secondary"
                    onClick={closeSection}
                    loading={loading}
                    className="btn-large"
                >
                    {trans("common.cancel")}
                </Button>

                <Button
                    type="primary"
                    onClick={triggerSubmit}
                    loading={loading}
                    className="btn-large ml-3"
                    htmlType="submit"
                    need={['sfas.update']}
                >
                    {trans("common.save")}
                </Button>
            </div>
        </>
    );
};

EditSFA.propTypes = {
    closeSection: PropTypes.func
};

export default EditSFA;