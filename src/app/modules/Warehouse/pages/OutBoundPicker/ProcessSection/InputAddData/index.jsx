import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useTrans from 'helper/useTrans';

import { isSKUCode, useScanBarcode } from 'helper/useScanBarcode';
import { pickBox } from 'app/modules/Warehouse/warehouse-redux/outBoundPickerSlice';

import './index.scss';
import usePermission from 'app/components/NeedPermission/usePermission';

const InputAddData = props => {

    const inputRef = useRef();
    const dispatch = useDispatch();
    const goodsDelivery = useSelector(state => state.warehouse.outBoundPicker.goodsDelivery.data);
    const [trans] = useTrans();
    const canOutboundVN = usePermission(['outbound-pickers.create'])

    useScanBarcode({
        condition: () => canOutboundVN,
        onEnter: (v) => handleScanEnter(v),
    });

    const handleScanEnter = (value) => {

        setTimeout(() => {
            inputRef.current.value = '';
        }, 100);

        if (!value || !value?.length) return;
        if (!goodsDelivery) return;

        if (isSKUCode(value)) dispatch(pickBox(value));
    }

    const handleEnterInput = (e) => {
        if (e.charCode === 13) {
            handleScanEnter(e.target.value);
        }
    }

    return (
        <div className="input-add-data">
            <input
                className="form-control"
                placeholder={trans("warehouse.sku.title") }
                ref={inputRef}
                onKeyPress={handleEnterInput}
                disabled={!goodsDelivery || !canOutboundVN}
            />
        </div>
    );
};

InputAddData.propTypes = {

};

export default InputAddData;