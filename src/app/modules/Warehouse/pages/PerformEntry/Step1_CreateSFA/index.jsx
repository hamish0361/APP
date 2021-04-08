import React, { useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import warehouseApi from 'apis/warehouse';
import handleApiError from 'helper/handleApiError';
import _ from 'lodash';
import useTrans from 'helper/useTrans';
import convertObjectDateToString from 'helper/convertObjectDateToString';
import trackingApi from 'apis/order/trackingApi';

import { Card, CardBody, CardHeader } from '_metronic/_partials/controls';
import FormCreateSFA from 'app/modules/Warehouse/components/Form/FormCreateSFA';
import { dialog } from 'app/components/DialogNotify';
import Button from 'app/components/Button';
import PerformStep from '../PerformStep';
import { startPrinter } from 'app/components/PrinterModal';
import { printerTemplate } from 'helper/printerTemplateData';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import './index.scss'

/**
 * STEP 1: Create an SFA
 *
 * @param {*} props
 */
const CreateSFA = props => {
    const [loading, setLoading] = useState(false);
    const [isCallPrinterPrint, setIsCallPrinter] = useState(false);
    const agencyList = useSelector(state => state.warehouse.agency.list);
    const history = useHistory();
    const [trans] = useTrans();
    const formRef = useRef();

    const handleCOUSFA = async (values, form) => {
        setLoading(true);

        const tracking = values.tracking;

        trackingApi.fetchTrackingById(tracking)
            .then(() => {
                return createSFA(values, form);
            })
            .catch(() => {
                trackingApi.createTracking({ id: tracking })
                    .then(() => {
                        return createSFA(values, form);
                    })
            }).finally(() => {
                setLoading(false);
            })
    };

    const createSFA = (values, form) => {
        return warehouseApi.SFA.create(convertObjectDateToString(values))
            .then(response => {
                dialog.success(trans("warehouse.sfa.create.success"));
                if (isCallPrinterPrint) printAndGoNext(response);
                else goToStep2(response);
            })
            .catch(err => {
                dialog.error(trans("warehouse.sfa.create.failure"));
                handleApiError(err, form);
            })
    }

    const initialValues = useMemo(
        () => {
            return {
                tracking: '',
                quantity: 1,
                shipping_inside: 0,
                coupon: '',
                agency_id: agencyList?.[0]?.id,
                arrival_date: new Date()
            }
        },
        [agencyList]
    );

    const goToStep2 = (response) => {
        history.push(`/warehouse/inbound/step-2/${response.id}`)
    }

    const printAndGoNext = (response) => {

        let agency_id = response.agency_id;

        const matchedAgency = _.find(agencyList, ({ id }) => id == agency_id); // eslint-disable-line

        startPrinter(printerTemplate.sfa({
            ...response,
            region: matchedAgency?.name || 'Tokyo',
        }));
        goToStep2(response);
    }

    const handleChangeSwitch = (e) => {
        setIsCallPrinter(e.target.checked);
    }

    const triggerSubmit = () => {
        formRef.current.submitForm();
    }

    return (
        <>
            <PerformStep />
            <Card className="perform-step-page step-1">
                <CardHeader title={trans("warehouse.sfa.create.title")}></CardHeader>
                <CardBody>
                    <div className="d-flex align-items-center justify-content-end">
                        <FormControlLabel
                            control={<Switch
                                checked={isCallPrinterPrint}
                                onChange={handleChangeSwitch}
                                color="primary"
                                name="checkedB"
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                            />}
                            label={trans("warehouse.sfa.create.and_print_label")}
                        />

                    </div>
                    <div className="step-1-form">
                        <FormCreateSFA
                            formItemClass={'col-lg-4 col-md-6 col-sm-12'}
                            onSubmit={handleCOUSFA}
                            initialValues={initialValues}
                            ref={formRef}
                        />

                        <div className="step-actions text-right">
                            <Button
                                type="primary"
                                onClick={triggerSubmit}
                                loading={loading}
                                className="btn-large"
                                htmlType="submit"
                                need={['sfas.create']}
                            >
                                {trans("common.create")}
                            </Button>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </>
    );
};

CreateSFA.propTypes = {};

export default CreateSFA;
