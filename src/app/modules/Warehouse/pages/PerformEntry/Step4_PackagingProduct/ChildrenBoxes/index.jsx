import { fetchBox } from 'app/modules/Warehouse/warehouse-redux/boxSlice';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardBody } from '_metronic/_partials/controls';
import AddChilds from '../AddChilds';
import TableBoxChilds from '../TableBoxChilds';

import './index.scss';

const ChildrenBoxes = props => {

    const currentBox = useSelector(state => state.warehouse.box.detail.data);
    const dispatch = useDispatch();

    const f5DataBox = () => {
        dispatch(fetchBox({ id: currentBox?.id, with: 'childs' }))
    }

    return (
        <Card className="children-boxes">
            <CardBody>
                <AddChilds onSuccess={f5DataBox} />
                <TableBoxChilds onRefresh={f5DataBox} />
            </CardBody>
        </Card>
    );
};

ChildrenBoxes.propTypes = {

};

export default ChildrenBoxes;