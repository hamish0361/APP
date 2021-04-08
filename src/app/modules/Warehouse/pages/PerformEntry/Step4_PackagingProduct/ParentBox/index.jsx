import React, { useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { boxAction, fetchBox } from 'app/modules/Warehouse/warehouse-redux/boxSlice';
import warehouseApi from 'apis/warehouse';
import { toAbsoluteUrl } from '_metronic/_helpers';
import formatNumber from 'helper/formatNumber';
import useTrans from 'helper/useTrans';
import { printerTemplate } from 'helper/printerTemplateData';
import { startPrinter } from 'app/components/PrinterModal';
import useF5SFA from '../hooks/useF5SFA';

import SVG from 'react-inlinesvg';
import { dialog } from 'app/components/DialogNotify';
import { Card, CardBody } from '_metronic/_partials/controls';
import { performEntryAction } from 'app/modules/Warehouse/warehouse-redux/performEntrySlice';
import { Button } from 'react-bootstrap';
import Barcode from 'react-barcode';
import ProgressBar from 'react-bootstrap/ProgressBar'
import CreateNewBox from 'app/modules/Warehouse/components/PerformEntry/CreateNewBox';

import './index.scss';
import usePermission from 'app/components/NeedPermission/usePermission';

const ParentBox = () => {

    const [showModalUpdateBox, setShowModalUpdateBox] = useState(false);
    const currentBox = useSelector(state => state.warehouse.box.detail.data);
    const listTempBox = useSelector(state => state.warehouse.performEntry.packaging.childrens);
    const agencyList = useSelector(state => state.warehouse.agency.list);
    const inputParentRef = useRef();
    const inputPackingCostRef = useRef();
    const dispatch = useDispatch();
    const params = useParams();
    const [trans] = useTrans();
    const f5SFAData = useF5SFA();
    const canMakeBoxRelative = usePermission(['boxes.create', 'boxes.update'], 'and');
    const canUpdateBox = usePermission(['boxes.update']);

    const toggleModalUpdateBox = () => { setShowModalUpdateBox(!showModalUpdateBox) };

    const handlePressInputParent = (e) => {
        if (e.charCode === 13) callApiGetParent();
    }

    const callApiGetParent = (isNewBox = false) => {

        if (!inputParentRef.current.value.length) return;

        dispatch(fetchBox({ id: inputParentRef.current.value, with: 'childs;items' }))
            .then((res) => {
                if (res.type.includes('fulfilled')) {
                    dialog.success(trans("warehouse.sku.get.success"));

                    mapTempChildToParentBox(res.payload.id, isNewBox)
                } else {
                    dialog.error(trans("warehouse.sku.get.failure"));
                }
            })
    }

    const mapTempChildToParentBox = (box_parent_id, isNewBox) => {

        if (!listTempBox?.length) return;

        Promise.all(listTempBox.map(b => {
            return warehouseApi.box.update(b.id, { box_parent_id })
        })).then(() => {
            dispatch(performEntryAction.removeTempChildBox('all'));
            dispatch(fetchBox({ id: box_parent_id, with: 'childs.items;items' })).then((res) => {
                if (isNewBox && res.type.includes('fulfilled')) {
                    let matchedAgency = _.find(agencyList, ({ id }) => id == res.payload?.sfa?.agency_id); // eslint-disable-line
                    const itemQuantity = res.payload.childs.reduce((prevQ, curBox) => {
                        let totalItems = curBox?.items ? curBox.items.reduce((p, c) => p + c.quantity, 0) : 0;

                        return prevQ + totalItems;
                    }, 0);

                    startPrinter(printerTemplate.sku({
                        ...res.payload,
                        region: matchedAgency?.name || 'Tokyo',
                        itemQuantity
                    }));
                }
            });

            f5SFAData();
        })
    }

    const handleCreateBoxSuccess = (box) => {
        dialog.success(trans("warehouse.sku.create.success"));
        inputParentRef.current.value = box.id;

        callApiGetParent(true);
    }

    const callApiCreateANewBox = () => {
        return warehouseApi.box.create({
            duplicate: 1,
            height: 1,
            length: 1,
            sfa_id: params?.sfa_id,
            weight_per_box: 1,
            width: 1,
        })
            .then(handleCreateBoxSuccess)
            .catch(() => {
                dialog.error(trans("warehouse.sku.create.failure"));
            })
    }

    const currentChildVolume = useMemo(() => {

        if (!currentBox || !currentBox?.childs?.length) return 0;

        return currentBox.childs.reduce((prevV, curV) => prevV + curV.volume, 0);
    }, [currentBox]);

    const updateBoxSuccess = () => {
        dispatch(fetchBox({ id: currentBox?.id, with: 'childs;items' }))
    }

    const handleClearData = () => {
        dispatch(boxAction.setBoxDetailData(undefined));
    }

    const handlePressInputPackingCost = (e) => {
        if (e.charCode === 13) {
            handleSavePackingCost();
        }
    }

    const handleSavePackingCost = () => {
        let value = inputPackingCostRef.current.value;

        if (!value || value === currentBox?.packing_cost_per_box) return;

        inputPackingCostRef.current.style.borderColor = '#fadb14';
        warehouseApi.box.update(currentBox?.id, { packing_cost_per_box: value })
            .then((res) => {
                dialog.success(trans("warehouse.sku.update.packing_cost.success"));
                inputPackingCostRef.current.style.borderColor = '#52c41a';
            })
            .catch((err) => {
                console.error(err);
                inputPackingCostRef.current.style.borderColor = '#f5222d';

                dialog.error(trans("warehouse.sku.update.packing_cost.failure"));
                inputPackingCostRef.current.value = currentBox?.packing_cost_per_box;
            });
    }

    return (
        <Card className="parent-box-container">
            <CardBody>
                {!currentBox && (
                    <div className="input-add-parent">
                        <input
                            className="form-control"
                            ref={inputParentRef}
                            onKeyPress={handlePressInputParent}
                            placeholder="Parent SKU"
                            disabled={!canMakeBoxRelative}
                        />
                        {canMakeBoxRelative && (
                            <>
                                {trans("warehouse.sku.not_have.sku")}?
                                <Button variant="link" onClick={callApiCreateANewBox}>{trans("warehouse.sku.create.title")}</Button>
                            </>
                        )}
                    </div>
                )}

                {currentBox && (
                    <div className="parent-box-section__content">
                        <div className="header-section">
                            <div className="title">
                                {trans("warehouse.sku.parent.title")}
                            </div>
                            <div className="extra-action">
                                <Button variant="link" onClick={handleClearData}>
                                    {trans("warehouse.sku.parent.other")}
                                </Button>
                            </div>
                        </div>
                        <div className="icon-section">
                            <SVG
                                src={toAbsoluteUrl(
                                    '/media/svg/icons/Shopping/open-box.svg'
                                )}
                            ></SVG>
                            <div className="bar-code">
                                <Barcode value={currentBox?.id || "0"} textPosition="top" height={40} />
                            </div>
                        </div>

                        <div className="volume-progress-section">
                            <ProgressBar
                                animated
                                max={currentBox?.volume_per_box}
                                now={currentChildVolume}
                                label={<span className="progress-label">{formatNumber(currentChildVolume)} / {formatNumber(currentBox?.volume_per_box)}</span>}
                                variant="success"
                            />
                        </div>

                        <div className="box-packing-cost form-group">
                            <label htmlFor="">{trans("warehouse.cost.packing")}</label>
                            <div className="d-flex align-items-center">
                                <input
                                    defaultValue={currentBox?.packing_cost_per_box || 0}
                                    placeholder={trans("warehouse.cost.packing")}
                                    className="form-control"
                                    onKeyPress={handlePressInputPackingCost}
                                    ref={inputPackingCostRef}
                                    disabled={!canUpdateBox}
                                />
                                <button disabled={!canUpdateBox} className="btn btn-success btn-large ml-3 btn-packing-cost" onClick={handleSavePackingCost}>{trans("common.save")}</button>
                            </div>
                        </div>

                        <div className="content-section">
                            <div className="box-info row">
                                <div className="col-lg-4 col-md-6 col-sm-6">
                                    <span className="title">{trans("common.volume")}:</span> {formatNumber(currentBox?.volume)}
                                </div>
                                <div className="col-lg-4 col-md-6 col-sm-6">
                                    <span className="title">{trans("warehouse.box_item.quantity")}:</span> {formatNumber(currentBox?.items?.length)}
                                </div>
                                <div className="col-lg-4 col-md-6 col-sm-6">
                                    <span className="title">{trans("warehouse.sku.duplicate")}:</span> {formatNumber(currentBox?.duplicate)}
                                </div>
                            </div>
                        </div>

                        <div className="action-section">
                            <button disabled={!canUpdateBox} className="btn btn-primary" onClick={toggleModalUpdateBox}>{trans("common.edit")}</button>
                        </div>
                    </div>
                )}

                <CreateNewBox
                    show={showModalUpdateBox}
                    onSuccess={updateBoxSuccess}
                    initialValues={currentBox}
                    onHide={toggleModalUpdateBox}
                    isHaveDuplicate={false}
                />
            </CardBody>
        </Card>
    );
};

ParentBox.propTypes = {

};

export default ParentBox;