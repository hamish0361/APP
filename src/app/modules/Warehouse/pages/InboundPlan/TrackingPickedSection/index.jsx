import React, { useCallback, useRef, useState, useMemo } from 'react';

import warehouseApi from 'apis/warehouse';
import { useScanBarcode } from 'helper/useScanBarcode';
import { useSelector } from 'react-redux';
import useTrans from 'helper/useTrans';
import _ from 'lodash';
import moment from 'moment';
import convertObjectDateToString from 'helper/convertObjectDateToString';

import { dialog } from 'app/components/DialogNotify';
import { Card, CardBody } from '_metronic/_partials/controls';
import FormCreateSFA from 'app/modules/Warehouse/components/Form/FormCreateSFA';
import Loading from 'app/components/Loading';
import handleApiError from 'helper/handleApiError';
import Button from 'app/components/Button';

import './index.scss';
import usePermission from 'app/components/NeedPermission/usePermission';

const TrackingPickedSection = props => {

    const [loading, setLoading] = useState(false);
    const trackingList = useSelector(state => state.purchase.tracking.trackingList); // eslint-disable-line
    const [trackingPickedCount, setTrackingPickedCount] = useState(0);
    const [trans] = useTrans();
    const [sfa, setSfa] = useState();
    const formRef = useRef();
    const trackingCode = useRef('');
    const canEditSFA = usePermission(['sfas.update']);
    const canCreateSFA = usePermission(['sfas.create']);

    useScanBarcode({
        condition: () => trackingList.length,
        onEnter: (barcode) => handleReceiveTracking(barcode)
    });

    const handleReceiveTracking = (barcode) => {
        trackingCode.current = barcode;

        if (sfa) {
            if (sfa.tracking === barcode) {
                setTrackingPickedCount(trackingPickedCount + 1);

                debounceUpdateSFA(sfa, trackingPickedCount + 1);
            } else {
                updateSFA(sfa, trackingPickedCount);

                setTrackingPickedCount(1);

                getOrCreateSFA(barcode, 1);
            }
        } else {
            getOrCreateSFA(barcode, trackingPickedCount + 1);

            setTrackingPickedCount(trackingPickedCount + 1);
        }
    }

    const getOrCreateSFA = (tracking, quantity) => {
        setLoading(true);
        warehouseApi.SFA.fetchSFAs({
            search: `tracking:${tracking}`,
            searchFields: `tracking:=`
        }).then((res) => {
            if (res.data.length) {
                setSfa(res.data[0]);
                setTrackingPickedCount(res.data[0].quantity + 1);

                debounceUpdateSFA(res.data[0], res.data[0].quantity + 1);
            } else {

                if (!canCreateSFA) {
                    dialog.error(trans("warehouse.sfa.create.need_permission"));
                    return;
                }

                return warehouseApi.SFA.create({
                    quantity,
                    tracking,
                }).then((res) => {
                    setSfa(res);

                    dialog.success(trans("warehouse.sfa.create.success"))
                }).catch(() => {
                    dialog.error(trans("warehouse.sfa.create.failure"))
                })
            }
        }).finally(() => {
            setLoading(false);
        });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debounceUpdateSFA = useCallback(_.debounce((currentSFA, quantity) => {
        updateSFA(currentSFA, quantity);
    }, 2000), []);

    const updateSFA = (currentSFA, quantity) => {

        if (!canEditSFA) {
            dialog.error(trans("warehouse.sfa.update.need_permission"));

            return;
        }

        setLoading(true);
        warehouseApi.SFA.update(currentSFA.id, {
            quantity
        }).then((res) => {
            if (res.tracking === trackingCode.current) setSfa(res);

            dialog.success(trans("warehouse.sfa.update.success"))
        }).catch(() => {
            dialog.error(trans("warehouse.sfa.update.failure"))
        }).finally(() => {
            setLoading(false);
        })
    }

    const triggerFormSFA = () => {
        formRef.submitForm();
    }

    const handleUpdateSFA = (values, form) => {
        setLoading(true);

        const body = convertObjectDateToString(values);

        warehouseApi.SFA.update(values.id, body).then((res) => {
            setSfa(res);
            setTrackingPickedCount(res.quantity);

            dialog.success(trans("warehouse.sfa.update.success"))
        }).catch((err) => {
            dialog.error(trans("warehouse.sfa.update.failure"))
            handleApiError(err, form);
        }).finally(() => {
            setLoading(false);
        })
    }

    const initialValues = useMemo(() => {
        if (!sfa) return undefined;

        return {
            ...sfa,
            arrival_date: moment(sfa.arrival_date, 'DD-MM-YYYY HH:mm').toDate()
        }
    }, [sfa]);

    return (
        <div className="tracking-picked-section">
            {!!trackingPickedCount && (
                <Card>
                    <CardBody>
                        <div className="d-flex tracking-picked-section--content">
                            <div className="picked-count">
                                <div className="picked-count--title">{trackingCode.current}</div>
                                <div className="picked-count--value">{trackingPickedCount}</div>
                            </div>

                            <div className="sfa-info position-relative">
                                <div className="sfa-info--title">SFA: {sfa?.id}</div>
                                {loading && <Loading local />}
                                <FormCreateSFA
                                    editMode
                                    initialValues={initialValues}
                                    autoFocus={false}
                                    formItemClass="col-lg-4 col-sm-6"
                                    ref={formRef}
                                    onSubmit={handleUpdateSFA}
                                />
                                <div className="actions text-right">
                                    <Button type="primary" loading={loading} onClick={triggerFormSFA}>
                                        {trans("common.edit")}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            )}
        </div>
    );
};

TrackingPickedSection.propTypes = {

};

export default TrackingPickedSection;