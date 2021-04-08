import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import formatNumber from 'helper/formatNumber';
import { cutOffContainer, loadUpContainerAction } from 'app/modules/Warehouse/warehouse-redux/loadUpContainerSlice';
import { toAbsoluteUrl } from '_metronic/_helpers';
import _ from 'lodash';
import isContainerCutOff from 'helper/isContainerCutOff';
import getCurrentContainer from 'app/modules/Warehouse/selector/LoadUpContainer/getCurrentContainer';
import useTrans from 'helper/useTrans';

import SVG from 'react-inlinesvg';
import { Card, CardBody } from '_metronic/_partials/controls';
import ProgressBar from 'react-bootstrap/ProgressBar'
import Select from 'react-select';
import Button from 'app/components/Button';
import { dialog } from 'app/components/DialogNotify';

import './index.scss';

const makeOption = (c) => ({ value: c.id, label: `Invoice ${c.id}` });

const M3toCM3 = 1;
const TANtoKG = 1000;

const ContainerStatus = props => {

    const listInvoices = useSelector(state => state.warehouse.loadUpContainer.listInvoices.data);
    const currentContainer = useSelector(getCurrentContainer);
    const dispatch = useDispatch();
    const [trans] = useTrans();

    useEffect(() => {
        if (listInvoices.length && !currentContainer) {
            dispatch(loadUpContainerAction.setCurrentContainer(listInvoices[0]));
        }
    }, [listInvoices, currentContainer]); // eslint-disable-line

    const currentVolumeInContainer = useMemo(() => {
        if (!currentContainer) return 0;

        return currentContainer.in_pickers.reduce((prevV, curV) => {
            return prevV + curV.volume || 0;
        }, 0);
    }, [currentContainer]); // eslint-disable-line

    const currentWeightInContainer = useMemo(() => {
        if (!currentContainer) return 0;

        return currentContainer.in_pickers.reduce((prevV, curV) => {
            return prevV + (curV?.box?.weight_per_box || 0) * curV.quantity;
        }, 0);
    }, [currentContainer]); // eslint-disable-line

    const handleReset = () => {
        dispatch(loadUpContainerAction.resetSlice());
    }

    const handleSelectContainer = ({ value }) => {

        const selectedInvoice = _.find(listInvoices, ['id', value]);

        if (selectedInvoice)
            dispatch(loadUpContainerAction.setCurrentContainer(selectedInvoice));
    }

    const getValueSelect = useMemo(() => {
        return currentContainer ? makeOption(currentContainer) : '';
    }, [currentContainer]);

    const handleCutOff = () => {
        dispatch(cutOffContainer({ id: currentContainer.id }))
        .then((res) => {
            if (res.type.includes('fulfilled')) {
                dialog.success(trans("warehouse.container.closed_container"));
            } else {
                dialog.error(trans("warehouse.container.close_container_failure"));
            }
        })
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
                    {!isContainerCutOff(currentContainer) && (
                        <Button type="primary" className="ml-3" need={['containers.update']} onClick={handleCutOff}>
                            {trans("warehouse.container.close_container")}
                        </Button>
                    )}
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
                <div className="point-data">
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