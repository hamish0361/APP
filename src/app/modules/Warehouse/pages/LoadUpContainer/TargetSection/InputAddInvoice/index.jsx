import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import _ from 'lodash';
import { addInvoice, loadUpContainerAction } from 'app/modules/Warehouse/warehouse-redux/loadUpContainerSlice';

import SelectInvoice from 'app/components/Select/SelectInvoice';

const InputAddInvoice = props => {

    const listInvoices = useSelector(state => state.warehouse.loadUpContainer.listInvoices.data);
    const dispatch = useDispatch();

    const handleSelectInvoice = (v) => {

        let matchedInvoice = _.find(listInvoices, ['id', v]);
        if(matchedInvoice) {
            dispatch(loadUpContainerAction.setCurrentContainer(matchedInvoice))
        } else {
            dispatch(addInvoice({ id: v }));
        }
    }

    return (
        <SelectInvoice onChange={handleSelectInvoice} showLabel={false} />
    );
};

InputAddInvoice.propTypes = {

};

export default InputAddInvoice;