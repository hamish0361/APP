import React, { useState } from 'react';

import { useField, useFormikContext } from "formik";
import SelectOrderForm from 'app/components/Select/SelectOrder/SelectOrderForm';
import SelectCustomer from 'app/components/Select/SelectCustomer';

const SelectObjValue = ({ name, showLabel = true, ...props }) => {

    const [customerId, setCustomerId] = useState();
    const [field, meta, helper] = useField(name); // eslint-disable-line
    const { values } = useFormikContext();

    const handleSelectCustomer = (v) => {
        setCustomerId(v);
        helper.setValue('');
    }

    if (values?.objectable_type === 'user')
        return <></>

    return (
        <div>

            <SelectCustomer
                value={customerId}
                onChange={handleSelectCustomer}
            />

            <SelectOrderForm
                name={name}
                defaultParams={{
                    search: `customer_id:${customerId}`,
                    searchFields: `customer_id:=`,
                    searchJoin: 'and'
                }}
                disabled={!customerId}
                className="mt-3"
            />
        </div>
    );
};

SelectObjValue.propTypes = {

};

export default SelectObjValue;