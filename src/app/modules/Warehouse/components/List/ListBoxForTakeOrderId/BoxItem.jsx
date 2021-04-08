import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';

import warehouseApi from 'apis/warehouse';

import { dialog } from 'app/components/DialogNotify';
import Checkbox from '@material-ui/core/Checkbox';
import './BoxItem.scss';

const BoxItem = ({ box }, ref) => {

    const [checked, setChecked] = useState(false);
    const inputRef = useRef();
    const boxRef = useRef();

    useEffect(() => {
        if (inputRef.current && inputRef.current.value != box.order_id) inputRef.current.value = box.order_id; // eslint-disable-line
    }, [box]);

    useImperativeHandle(ref, () => ({
        checked: () => {
            setChecked(true);
        },
        unChecked: () => {
            setChecked(false);
        },
        getChecked: () => {
            return { ...box, checked };
        }
    }))

    const handleSaveOrder = () => {
        const order_id = inputRef.current.value;

        if (!order_id || order_id == box.order_id) return; // eslint-disable-line

        boxRef.current.style.background = '#e6f7ff';
        warehouseApi.box.update(box.id, { order_id })
            .then(() => {
                boxRef.current.style.background = '#d9f7be';
                dialog.success(`Update order success!`);
            })
            .catch(() => {
                boxRef.current.style.background = '#fff1f0';
                dialog.error(`Update order failure!`);
            })
    }

    const handleToggleCheckbox = () => {
        setChecked(!checked);
    }

    const handleKeyPress = (e) => {
        if (e.charCode === 13) handleSaveOrder();
    }

    return (
        <div className="box-item-for-take-order" ref={boxRef}>
            <div className="item-identify">
                <Checkbox
                    checked={checked}
                    edge="start"
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': box.id }}
                    onChange={handleToggleCheckbox}
                />
                <div className="sku">{box.id}</div>
            </div>
            <div className="box-info w1024-hidden">
                <div className="box-size custom-prop-box">
                    <span className="title">Volume</span>
                    <span className="value">{box.volume}</span>
                    <span className="extra">({box.width} × {box.height} × {box.length})</span>
                </div>
                <div className="duplicate custom-prop-box">
                    <span className="title">SL nhân bản</span>
                    <span className="value">{box.duplicate}</span>
                </div>
            </div>
            <div className="take-order-section">
                <div className="cur-order">
                    <div className="cur-order__title">Mã đơn đặt hàng</div>
                    <div className="update-order">
                        <input placeholder="Mã đơn đặt hàng" type="text" onKeyPress={handleKeyPress} className="form-control" defaultValue={box.order_id} ref={inputRef} />
                    </div>
                </div>
                <div className="save-update">
                    <button className="btn btn-primary btn-save p-0" onClick={handleSaveOrder}>Lưu</button>
                </div>
            </div>
        </div>
    );
};

export default React.forwardRef(BoxItem);