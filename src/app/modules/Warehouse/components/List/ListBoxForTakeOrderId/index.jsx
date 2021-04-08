import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';

import warehouseApi from 'apis/warehouse';

import BoxItem from './BoxItem';
import Loading from 'app/components/Loading';
import Checkbox from '@material-ui/core/Checkbox';

import './index.scss';
import { dialog } from 'app/components/DialogNotify';

const ListBoxForTakeOrderId = ({ boxes, loading, onRefresh }) => {

    const [localLoading, setLocalLoading] = useState(false);
    const listCheckRef = useRef([]);
    const inputRef = useRef();

    const handleToggleCheckbox = (e, checked) => {
        listCheckRef.current.forEach(c => {
            if (checked) c.checked()
            else c.unChecked();
        })
    }

    const handleSaveOrderForAll = () => {
        const boxChecked = getBoxChecked();
        const orderId = inputRef.current.value;

        if(!boxChecked.length) {
            dialog.warning(`Chưa chọn box!`);

            return;
        }

        if (!orderId?.length) {
            dialog.warning(`Chưa nhập order_id!`);

            return;
        }

        setLocalLoading(true);
        Promise.all(boxChecked.map(box => warehouseApi.box.update(box.id, { order_id: orderId })))
            .then(() => {
                dialog.success(`Update order_id for boxes success`);
                onRefresh && onRefresh();
            })
            .catch(err => {
                console.error(err);
                dialog.error(`Update order_id for boxes error`);
            })
            .finally(() => {
                setLocalLoading(false);
            })
    }

    const getBoxChecked = () => {
        const boxChecked = [];

        listCheckRef.current.forEach(c => {
            let tmp = c.getChecked();

            if (tmp.checked) boxChecked.push(tmp);
        });

        return boxChecked;
    }

    const handleKeyPress = (e) => {
        if(e.charCode === 13) handleSaveOrderForAll();
    }

    return (
        <div className="list-box-for-take-order position-relative">
            {(loading || localLoading) && <Loading local />}

            <div className="take-order-all">
                <div className="select-all">
                    <Checkbox
                        edge="start"
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': 'selectAll' }}
                        onChange={handleToggleCheckbox}
                    /> Chọn tất cả
                </div>
                <div className="input-order">
                    <div className="input-section">
                        <div className="cur-order__title">Mã đơn đặt hàng</div>
                        <div className="update-order">
                            <input placeholder="Mã đơn đặt hàng" type="text" className="form-control" ref={inputRef} onKeyPress={handleKeyPress} />
                        </div>
                    </div>
                    <button className="btn btn-success btn-save" onClick={handleSaveOrderForAll}>Lưu</button>
                </div>
            </div>

            {boxes.map((box, idx) => (
                <BoxItem box={box} key={`box-${idx}`} ref={ref => listCheckRef.current[idx] = ref} />
            ))}
        </div>
    );
};

ListBoxForTakeOrderId.propTypes = {
    boxes: PropTypes.array,
    onRefresh: PropTypes.func,
    loading: PropTypes.bool
};

export default ListBoxForTakeOrderId;