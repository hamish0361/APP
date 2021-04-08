import React, { useMemo, useRef, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import formatNumber from 'helper/formatNumber';
import { toAbsoluteUrl } from '_metronic/_helpers';
import warehouseApi from 'apis/warehouse';
import { performEntryAction } from 'app/modules/Warehouse/warehouse-redux/performEntrySlice';
import { fetchBox } from 'app/modules/Warehouse/warehouse-redux/boxSlice';
import _ from 'lodash';
import useTrans from 'helper/useTrans';
import useF5SFA from '../hooks/useF5SFA';
import { printerTemplate } from 'helper/printerTemplateData';
import { startPrinter } from 'app/components/PrinterModal';

import SVG from 'react-inlinesvg';
import CustomTable from 'app/components/CustomTable';
import { Card, CardBody } from '_metronic/_partials/controls';
import { dialog } from 'app/components/DialogNotify';
import ModalConfirm from 'app/modules/Warehouse/components/ModalConfirm';

import './index.scss';
import NeedPermission from 'app/components/NeedPermission';

const TableBoxChilds = () => {

    const currentBox = useSelector(state => state.warehouse.box.detail.data);
    const listTempBox = useSelector(state => state.warehouse.performEntry.packaging.childrens);
    const listAgency = useSelector(state => state.warehouse.agency.list);
    const dispatch = useDispatch();
    const inputQuantityRef = useRef([]);
    const modalConfirmRef = useRef([]);
    const [trans] = useTrans();
    const f5SFAData = useF5SFA();

    useEffect(() => {
        return () => {
            dispatch(performEntryAction.removeTempChildBox('all'))
        }
    }, []); // eslint-disable-line

    useEffect(() => {
        if (currentBox?.childs?.length) {
            currentBox.childs.forEach(b => {
                if (inputQuantityRef.current[b.id])
                    inputQuantityRef.current[b.id].value = b.child_quantity || b.duplicate;
            });
        }
    }, [currentBox]);

    useEffect(() => {
        if (listTempBox?.length) {
            listTempBox.forEach(b => {
                if (inputQuantityRef.current[b.id])
                    inputQuantityRef.current[b.id].value = b.child_quantity || b.duplicate;
            });
        }
    }, [listTempBox]);

    const columns = useMemo(() => ([
        {
            id: 'id', title: trans("warehouse.sfa.title"), render: (sku, row) => (
                <div>
                    <div className="sku">{sku}</div>
                    <div>
                        <small>Vol: {formatNumber(row.volume)}</small> <br />
                        <small className="text-primary">Size: {row.width} × {row.height} × {row.length}</small>
                    </div>
                </div>
            )
        },
        {
            id: 'duplicate',
            title: trans("common.quantity"),
            render: (duplicate, box) => (
                <NeedPermission
                    need={['boxes.create', 'boxes.update']}
                    permissionJoin="and"
                    fallback={<span>{duplicate}</span>}
                >
                    <input
                        className='form-control'
                        ref={r => inputQuantityRef.current[box.id] = r}
                        type="number"
                        min={0}
                        max={duplicate}
                        onKeyPress={(e) => { e.persist(); handleChangeChildQuantity(box, e); }}
                    />
                </NeedPermission>
            )
        },
        {
            id: 'sfa_id', title: '', render: (sfa_id, { id }) => (
                <div className="actions">
                    <NeedPermission
                        need={['boxes.delete', 'boxes.update']}
                        permissionJoin="and"
                    >
                        <button
                            className="btn btn-icon btn-light btn-hover-danger btn-sm"
                            onClick={() => handleRemoveBoxChild(id)}
                        >
                            <span className="svg-icon svg-icon-md svg-icon-danger">
                                <SVG
                                    src={toAbsoluteUrl(
                                        '/media/svg/icons/General/Trash.svg'
                                    )}
                                ></SVG>
                            </span>
                        </button>
                    </NeedPermission>
                </div>
            )
        }
    ]), [currentBox]); // eslint-disable-line

    const handleRemoveBoxChild = (childId) => {
        if (currentBox?.id) {
            callApiRemoveChildBox(childId);
        } else {
            dispatch(performEntryAction.removeTempChildBox(childId));
        }
    }

    const handleChangeChildQuantity = useCallback((box, evt) => {

        if (evt.charCode !== 13) return;

        const child_quantity = Number(inputQuantityRef.current[box.id].value) || 0;

        if (box.duplicate <= child_quantity) return;

        // Trường hợp đã có box_parent
        if (currentBox?.id) {
            warehouseApi.box.decouple(box.id, child_quantity)
                .then(res => {
                    askUserToPrintLabel(res.duplicated);

                    // Gỡ box cũ ra khỏi thùng
                    warehouseApi.box.update(box.id, { box_parent_id: '' })
                        .then(() => {

                            // Lấy lại dữ liệu của thùng cha
                            dispatch(fetchBox({ id: currentBox?.id, with: 'childs' }));

                            f5SFAData();
                        })
                })
                .catch((err) => {
                    let errMessage = trans("warehouse.sku.update.quantity.failure");

                    if (err?.response?.data?.errors?.message) errMessage = err.response.data.errors.message
                    dialog.error(errMessage);

                    evt.target.value = box?.duplicate || 1;
                });
        } else {
            // Trường hợp chưa có thùng cha
            warehouseApi.box.decouple(box.id, child_quantity)
                .then(res => {
                    askUserToPrintLabel(res.duplicated);

                    // Thêm box vừa tách ra vào list box dự phòng trong store
                    dispatch(performEntryAction.addTempChildBox(res.duplicated));
                    dispatch(performEntryAction.removeTempChildBox(res.id));

                    f5SFAData();
                })
                .catch((err) => {
                    let errMessage = trans("warehouse.sku.update.quantity.failure");

                    if (err?.response?.data?.errors?.message) errMessage = err.response.data.errors.message
                    dialog.error(errMessage);

                    evt.target.value = box?.duplicate || 1;
                });
        }
    }, [currentBox]); // eslint-disable-line

    const callApiRemoveChildBox = (childId) => {
        warehouseApi.box.update(childId, { box_parent_id: '' })
            .then(() => {
                f5SFAData();

                dispatch(fetchBox({ id: currentBox.id, with: 'childs;items' }))
                dialog.success(trans("warehouse.sku.child.remove.success"));
            })
            .catch(() => {
                dialog.error(trans("warehouse.sku.child.remove.failure"));
            })
    }

    const askUserToPrintLabel = (box) => {
        modalConfirmRef.current.open({
            title: trans("warehouse.sku.child.add.print_label.question", { box_id: box.id }),
            ...box,
        });
    }

    const printNewBoxLabel = (box) => {

        const matchedAgency = _.find(listAgency, ({ id }) => id == box?.sfa?.agency_id); // eslint-disable-line

        startPrinter(printerTemplate.sku(
            {
                ...box,
                region: matchedAgency?.name || 'Tokyo',
            }
        ));
    }

    return (
        <Card className="table-box-childs">
            <CardBody>
                <CustomTable
                    columns={columns}
                    rows={currentBox?.childs || listTempBox}
                    page={1}
                    lastpage={1}
                    isViewEdit={false}
                    isDelete={false}
                    isAction={false}
                    noSTT
                />

                <ModalConfirm
                    onOk={printNewBoxLabel}
                    ref={modalConfirmRef}
                />
            </CardBody>
        </Card>

    );
};

TableBoxChilds.propTypes = {

};

export default TableBoxChilds;
