import React, { forwardRef } from 'react';

import { toAbsoluteUrl } from '_metronic/_helpers';

import SVG from 'react-inlinesvg';

import './InputAddPallet.scss';
import useTrans from 'helper/useTrans';

const InputAddPallet = ({ onAdd, onAddNew }, ref) => {

    const [trans] = useTrans();

    const handleKeyPress = (e) => {
        if(e.charCode === 13) onAdd && onAdd();
    }

    return (
        <div className="input-add-pallet">
            <input className="form-control" ref={ref} placeholder={trans("warehouse.pallet.id")} onKeyPress={handleKeyPress}/>
            <span className="svg-icon svg-icon-primary custom-button" onClick={onAddNew}>
                <SVG src={toAbsoluteUrl(
                    '/media/svg/icons/Code/Plus.svg'
                )} />
            </span>
        </div>
    );
};

export default forwardRef(InputAddPallet);