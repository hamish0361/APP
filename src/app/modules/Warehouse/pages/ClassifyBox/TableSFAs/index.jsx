import React from 'react';
import { useHistory } from 'react-router-dom';

import ListSFAForInbound from '../../../components/List/ListSFAForInbound';
import Layout from 'app/modules/Warehouse/components/Layout';
import useTrans from 'helper/useTrans';

const TableSFAs = props => {
    const history = useHistory();
    const [trans] = useTrans();

    const gotoDetail = (sfaID) => {
        history.push(`/warehouse/classify-box/${sfaID}`)
    }

    return (
        <Layout title={trans("MENU.WAREHOUSE.ASSIGN_BOXES")}>
            <ListSFAForInbound onViewEdit={gotoDetail} type="order" showShipmentMethod />
        </Layout>
    );
};

TableSFAs.propTypes = {

};

export default TableSFAs;