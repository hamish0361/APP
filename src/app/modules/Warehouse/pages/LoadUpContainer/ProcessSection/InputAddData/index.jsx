import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useTrans from 'helper/useTrans';
import useLoadUp from '../../hooks/useLoadUp';

import { loadUpPallet } from 'app/modules/Warehouse/warehouse-redux/loadUpContainerSlice';
import { isPalletCode, useScanBarcode } from 'helper/useScanBarcode';
import getCurrentContainer from 'app/modules/Warehouse/selector/LoadUpContainer/getCurrentContainer';
import isContainerCutOff from 'helper/isContainerCutOff';
import ModalSelectPallet from '../ModalSelectPallet';

import './index.scss';
import usePermission from 'app/components/NeedPermission/usePermission';

const InputAddData = props => {

    const currentContainer = useSelector(getCurrentContainer);
    const [trans] = useTrans();
    const modalSelectPalletRef = useRef();
    const inputRef = useRef();

    const dispatch = useDispatch();
    const { loadUpBox } = useLoadUp(modalSelectPalletRef);
    const canLoadUpContainer = usePermission(['in-container-pickers.create'])

    useScanBarcode({
        condition: (v) => canLoadUpContainer,
        onEnter: (v) => handleScanEnter(v),
    });

    const handleScanEnter = (value) => {

        setTimeout(() => {
            inputRef.current.value = '';
        }, 100);

        if (!value || !value?.length) return;
        if (!currentContainer) return;
        if (isContainerCutOff(currentContainer)) return;

        if (isPalletCode(value)) {
            dispatch(loadUpPallet({ id: value }));
        } else {
            loadUpBox(value);
        }
    }

    const handleEnterInput = (e) => {
        if (e.charCode === 13) {
            handleScanEnter(e.target.value);
        }
    }

    return (
        <>
            <ModalSelectPallet ref={modalSelectPalletRef} />
            <div className="input-add-data">
                <input
                    className="form-control"
                    placeholder={!isContainerCutOff(currentContainer) ? trans("warehouse.container.input.barcode") : trans("warehouse.container.closed_container")}
                    ref={inputRef}
                    onKeyPress={handleEnterInput}
                    disabled={isContainerCutOff(currentContainer) || !canLoadUpContainer}
                />
            </div>
        </>
    );
};

InputAddData.propTypes = {

};

export default InputAddData;