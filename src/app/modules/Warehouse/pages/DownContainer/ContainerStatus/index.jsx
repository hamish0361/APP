import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import formatNumber from 'helper/formatNumber';
import { downContainerAction } from 'app/modules/Warehouse/warehouse-redux/downContainerSlice';
import { toAbsoluteUrl } from '_metronic/_helpers';
import _ from 'lodash';
import getCurrentContainer from 'app/modules/Warehouse/selector/DownContainer/getCurrentContainer';
import useTrans from 'helper/useTrans';
import warehouseApi from 'apis/warehouse';

import SVG from 'react-inlinesvg';
import { Card, CardBody } from '_metronic/_partials/controls';
import ProgressBar from 'react-bootstrap/ProgressBar'
import Select from 'react-select';
import Button from 'app/components/Button';

import './index.scss';

const makeOption = (c) => ({ value: c.id, label: `Invoice ${c.id}` });

const M3toCM3 = 1;
const TANtoKG = 1000;

const ContainerStatus = props => {

    const listInvoices = useSelector(state => state.warehouse.downContainer.listInvoices.data);
    const listPallets = useSelector(state => state.warehouse.downContainer.listPallets.data);
    const currentContainer = useSelector(getCurrentContainer);
    const dispatch = useDispatch();
    const [trans] = useTrans();

    useEffect(() => {
        if (listInvoices.length && !currentContainer) {
            dispatch(downContainerAction.setCurrentContainer(listInvoices[0]));
        }
    }, [listInvoices, currentContainer]); // eslint-disable-line

    /** Thể tích container khi đóng cont */
    const cutOffVolumeInContainer = useMemo(() => {
        if (!currentContainer) return 0;

        return currentContainer.in_pickers.reduce((prevV, curV) => {
            return prevV + curV.volume || 0;
        }, 0);
    }, [currentContainer]); // eslint-disable-line

    /** Trọng lượng container khi đóng cont */
    const cutOffWeightInContainer = useMemo(() => {
        if (!currentContainer) return 0;

        return currentContainer.in_pickers.reduce((prevV, curV) => {
            return prevV + (curV?.box?.weight_per_box || 0) * curV.quantity;
        }, 0);
    }, [currentContainer]);  // eslint-disable-line

    /** Thể tích container hiện tại */
    const currentVolumeInContainer = useMemo(() => {
        if (!currentContainer) return 0;

        let outVolume = currentContainer.out_pickers.reduce((prevV, curV) => {
            return prevV + curV?.volume || 0;
        }, 0);

        return cutOffVolumeInContainer - outVolume;
    }, [currentContainer, cutOffVolumeInContainer]); // eslint-disable-line

    /** Trọng lượng container hiện tại */
    const currentWeightInContainer = useMemo(() => {
        if (!currentContainer) return 0;

        let outWeight = currentContainer.out_pickers.reduce((prevV, curV) => {
            return prevV + (curV?.box?.weight_per_box || 0) * curV.quantity;
        }, 0);

        return cutOffWeightInContainer - outWeight;
    }, [currentContainer, cutOffWeightInContainer]); // eslint-disable-line

    const handleReset = () => {
        dispatch(downContainerAction.resetSlice());
    }

    const handleSelectContainer = ({ value }) => {

        const selectedInvoice = _.find(listInvoices, ['id', value]);

        if (selectedInvoice)
            dispatch(downContainerAction.setCurrentContainer(selectedInvoice));
    }

    const getValueSelect = useMemo(() => {
        return currentContainer ? makeOption(currentContainer) : '';
    }, [currentContainer]);

    const handleCutOff = useCallback((e) => {
        e.target.style.display = 'none';
        listPallets.forEach((pallet) => {
            pallet.pivot_boxes.forEach((pivotBox) => {
                if (pivotBox.id) updatePivotBox(pivotBox);
                else createPivotBox({ ...pivotBox, pallet_id: pallet.id });
            })
        });
    }, [listPallets]);

    const updatePivotBox = (pivotBox) => {
        warehouseApi.palletBoxes.update(pivotBox.id, { quantity: pivotBox.quantity });
    }

    const createPivotBox = (pivotBox) => {
        warehouseApi.palletBoxes.create(pivotBox);
    }

    if (!listInvoices.length) return <></>;

    return (
        <Card className="container-status">

            <div className="container-status-head card-header">
                <div className="d-flex align-items-center">
                    <div className="select-current-container">
                        <Select
                            value={getValueSelect}
                            options={listInvoices.map(v => makeOption(v))}
                            onChange={handleSelectContainer}
                        />
                    </div>

                    <Button type="primary" className="ml-3" need={['out-container-pickers.create', 'out-container-pickers.update']} permissionJoin="and" onClick={handleCutOff}>
                        {trans("warehouse.container.close_container")}
                    </Button>
                </div>

                <button className="btn btn-link" onClick={handleReset}>
                    <SVG
                        src={toAbsoluteUrl(
                            '/media/svg/icons/Media/Shuffle.svg'
                        )}
                        className="mr-3"
                    ></SVG>
                    {trans("warehouse.container.reset_data")}
                </button>
            </div>

            <CardBody>

                <div className="point-data d-flex">
                    <div className="invoice-data">
                        <div className="d-flex">
                            <div className="progress-section-title">{trans("warehouse.container.theoretical_volume")}: </div>
                            <div className="invoice-volume invoice-value">{formatNumber(currentContainer?.volume)}</div>
                        </div>

                        <div className="d-flex">
                            <div className="progress-section-title">{trans("warehouse.container.theoretical_weight")}: </div>
                            <div className="invoice-weight invoice-value">{formatNumber(currentContainer?.weight)}</div>
                        </div>
                    </div>

                    <div className="load-up-cont-data">
                        <div className="d-flex">
                            <div className="progress-section-title">{trans("warehouse.container.cut_off_volume")}: </div>
                            <div className="invoice-volume invoice-value">{formatNumber(cutOffVolumeInContainer)}</div>
                        </div>

                        <div className="d-flex">
                            <div className="progress-section-title">{trans("warehouse.container.cut_off_weight")}: </div>
                            <div className="invoice-weight invoice-value">{formatNumber(cutOffWeightInContainer)}</div>
                        </div>
                    </div>
                </div>

                <div className="container-status-progress">
                    <div className="progress-section">
                        <div className="progress-section-title mt-5">{trans("warehouse.container.current_volume")}: </div>
                        <div className="status-percent">
                            <ProgressBar
                                animated
                                max={currentContainer?.max_volume * M3toCM3}
                                now={currentVolumeInContainer}
                                label={<div className="progress-lable">{formatNumber(currentVolumeInContainer)} / {formatNumber(currentContainer?.max_volume * M3toCM3)}</div>}
                                variant="primary"
                            />
                        </div>
                    </div>

                    <div className="progress-section">
                        <div className="progress-section-title mt-5">{trans("warehouse.container.current_weight")}: </div>
                        <div className="status-percent">
                            <ProgressBar
                                animated
                                max={currentContainer?.max_weight * TANtoKG}
                                now={currentWeightInContainer}
                                label={<div className="progress-lable">{formatNumber(currentWeightInContainer)} / {formatNumber(currentContainer?.max_weight * TANtoKG)}</div>}
                                variant="primary"
                            />
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
};

ContainerStatus.propTypes = {

};

export default ContainerStatus;