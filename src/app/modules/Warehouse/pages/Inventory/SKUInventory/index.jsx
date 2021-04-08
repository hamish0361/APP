import React from 'react';

import SKUList from 'app/modules/Warehouse/components/Inventory/SKUList';
import SKUFilter from 'app/modules/Warehouse/components/Inventory/SKUFilter';

const SKUInventory = props => {
    return (
        <>
            <SKUFilter />

            <div className="row">
                <div className="col-lg-6 col-sm-12">
                    <SKUList />
                </div>
                <div className="col-lg-6 col-sm-12"></div>
            </div>
        </>
    )
};

export default SKUInventory;