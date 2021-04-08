import React, { useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';
import useTrans from 'helper/useTrans';

import { isPalletCode, isSKUCode, useScanBarcode } from 'helper/useScanBarcode';
import getCurrentContainer from 'app/modules/Warehouse/selector/DownContainer/getCurrentContainer';
import useInputAdd from './useInputAdd';

import Button from 'app/components/Button';

import './index.scss';
import usePermission from 'app/components/NeedPermission/usePermission';

const InputAddData = props => {

    const inputRef = useRef();
    const currentContainer = useSelector(getCurrentContainer);
    const [trans] = useTrans();
    const canDownCont = usePermission(['out-container-pickers.create']);

    const { loadBox, addPallet, addNewPallet } = useInputAdd();

    useScanBarcode({
        condition: () => canDownCont,
        onEnter: (v) => handleScanEnter(v),
    });

    const handleScanEnter = (value) => {

        setTimeout(() => {
            inputRef.current.value = '';
        }, 100);

        if (!value || !value?.length) return;

        if (isSKUCode(value)) loadBox(value);
        else if (isPalletCode(value)) addPallet(value);
    }

    const handleEnterInput = (e) => {
        if (e.charCode === 13) {
            handleScanEnter(e.target.value);
        }
    }

    const isDisabledInput = useMemo(() => {
        return !currentContainer || !canDownCont;
    }, [currentContainer, canDownCont]);

    return (
        <div className="input-add-data">
            <input
                className="form-control"
                placeholder={trans("warehouse.container.input.barcode")}
                ref={inputRef}
                onKeyPress={handleEnterInput}
                disabled={isDisabledInput}
            />

            {!!currentContainer && (
                <div className="d-flex align-items-center justify-content-end">
                    {trans("warehouse.pallet.empty")}?
                    <Button type="link" onClick={addNewPallet} need={['pallets.create']}>{trans("warehouse.pallet.create.title")}</Button>
                </div>
            )}
        </div>
    );
};

InputAddData.propTypes = {

};

export default InputAddData;