import React from 'react';
import { useDispatch } from 'react-redux';

import { addInvoice } from 'app/modules/Warehouse/warehouse-redux/downContainerSlice';
import SelectInvoice from 'app/components/Select/SelectInvoice';

const InputAddInvoice = props => {

    const dispatch = useDispatch();

    const handleSelectInvoice = (v) => {
        dispatch(addInvoice({ id: v }));
    }

    return (
        <SelectInvoice onChange={handleSelectInvoice} showLabel={false} />
    );
};

InputAddInvoice.propTypes = {

};

export default InputAddInvoice;