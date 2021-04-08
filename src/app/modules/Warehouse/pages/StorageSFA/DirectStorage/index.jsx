import React, { useRef, useState } from 'react';

import warehouseApi from 'apis/warehouse';
import useTrans from 'helper/useTrans';
import handleApiError from 'helper/handleApiError';

import { Card, CardBody } from '_metronic/_partials/controls';
import FormDirectStorage from 'app/modules/Warehouse/components/Form/FormDirectStorage';
import { dialog } from 'app/components/DialogNotify';
import Loading from 'app/components/Loading';

import './index.scss';
import usePermission from 'app/components/NeedPermission/usePermission';

const DirectStorage = props => {
    const [loading, setLoading] = useState(false);
    const [trans] = useTrans();
    const formRef = useRef();
    const canUpdatePallet = usePermission('pallets.update')

    const handleSubmit = (values, form) => {

        if(!canUpdatePallet) {
            dialog.error(trans("warehouse.pallet.update.need_permission"));

            return;
        }

        setLoading(true);
        warehouseApi.pallet.update(values.pallet_id, { location_id: values.location_id })
            .then((res) => {
                dialog.success(trans("warehouse.storage_sfa.direct_storage.success"))

                form.resetForm();
            })
            .catch((err) => {
                dialog.error(trans("warehouse.storage_sfa.direct_storage.failure"))
                handleApiError(err, form);
            })
            .finally(() => {
                setLoading(false);
            })
    }

    return (
        <Card className="direct-storage position-relative">
            <CardBody>
                {loading && <Loading local />}
                <FormDirectStorage onSubmit={handleSubmit} ref={formRef} />
            </CardBody>
        </Card>
    );
};

DirectStorage.propTypes = {

};

export default DirectStorage;