import React from 'react';
import { useHistory } from 'react-router-dom';

import ListSFAForInbound from '../../components/List/ListSFAForInbound';

const TableSFAs = props => {
    const history = useHistory();

    const gotoDetail = (sfaID) => {
        history.push(`/warehouse/inbound/step-2/${sfaID}`)
    }

    return (
        <ListSFAForInbound onViewEdit={gotoDetail} type="box" />
    );
};

TableSFAs.propTypes = {

};

export default TableSFAs;