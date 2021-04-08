import React, { useRef } from 'react';

import moment from 'moment';
import { toAbsoluteUrl } from '_metronic/_helpers';
import clsx from 'clsx';
import useTrans from 'helper/useTrans';

import SVG from 'react-inlinesvg';
import DatePicker from "react-datepicker";
import ModalConfirm from 'app/modules/Warehouse/components/ModalConfirm';

import './index.scss';
import usePermission from 'app/components/NeedPermission/usePermission';
import NeedPermission from 'app/components/NeedPermission';

const formatMoment = "DD-MM-YYYY";

const ListBoxItems = ({ data = [], currentBox, onUpdate, onDelete, className }) => {

    const [trans] = useTrans();
    const modalConfirmRef = useRef();
    const canUpdateBoxItems = usePermission('box-items');

    const handleChangeQuantity = (e, rowIdx) => {
        onUpdate && onUpdate('quantity', rowIdx, e.target.value);
    }

    const handleChangeExpiryDate = (dateObj, rowIdx) => {
        onUpdate && onUpdate('expiry_date', rowIdx, moment(dateObj).format(formatMoment));
    }

    const handleDeleteItem = ({ row, rowIdx }) => {
        onDelete && onDelete(row, rowIdx);
    }

    const confirmDelete = (row, rowIdx) => {
        modalConfirmRef.current.open({
            title: trans("warehouse.box_item.delete.title"),
            row,
            rowIdx
        });
    }

    return (
        <div className={clsx("list-box-items", className)}>
            <ModalConfirm ref={modalConfirmRef} onOk={handleDeleteItem} centered />
            {data.map((row, rowIdx) => (
                <div className="box-items" key={`box-item-${rowIdx}`}>
                    <div className="box-items__info">
                        <div className="box-items__jancode">{row.product_id}</div>
                        <div className="box-items__name">{row?.product?.name || '---'}</div>
                    </div>

                    <div className="box-items__updateable">
                        <div className="box-items__quantity updateable-item">
                            <label htmlFor="">{trans("common.quantity")}</label>
                            <input
                                className="form-control quantity_input"
                                value={row.quantity}
                                onChange={(e) => handleChangeQuantity(e, rowIdx)}
                                type="number"
                                min={0}
                                disabled={!canUpdateBoxItems}
                            />
                        </div>

                        <div className="box-items__expiry_date updateable-item">
                            <label htmlFor="">{trans("common.expiry_date")}</label>
                            <DatePicker
                                style={{ width: "100%" }}
                                selected={row.expiry_date ? moment(row.expiry_date, formatMoment).toDate() : null}
                                onChange={(dateObj) => handleChangeExpiryDate(dateObj, rowIdx)}
                                disabled={!canUpdateBoxItems}
                            />
                        </div>
                    </div>

                    <div className="box-items__actions">
                        <NeedPermission need={"box-items"}>
                            <span className="svg-icon svg-icon-danger svg-icon-2x cursor-pointer" onClick={() => confirmDelete(row, rowIdx)}>
                                <SVG
                                    src={toAbsoluteUrl(
                                        '/media/svg/icons/General/Trash.svg'
                                    )}
                                ></SVG>
                            </span>
                        </NeedPermission>
                    </div>
                </div>
            ))}
        </div>
    );
};

ListBoxItems.propTypes = {

};

export default ListBoxItems;