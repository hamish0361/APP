import React, { useEffect } from 'react';
import { useHistory, useParams, useRouteMatch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { fetchSFA } from 'app/modules/Warehouse/warehouse-redux/sfaSlice';

import Layout from 'app/modules/Warehouse/components/Layout';
import EmptyDataContent from '../../PerformEntry/Step2_CheckTheGoods/EmptyDataContent';
import CreateNewBox from 'app/modules/Warehouse/components/PerformEntry/CreateNewBox';
import ClassifyBox from './ClassifyBox';
import useTrans from 'helper/useTrans';
import NeedPermission from 'app/components/NeedPermission';

const ClassifyDetail = props => {
    const sfa = useSelector(state => state.warehouse.sfa.detail.data);
    const loading = useSelector(state => state.warehouse.box.detail.loading);
    const dispatch = useDispatch();
    const params = useParams();
    const history = useHistory();
    const match = useRouteMatch();
    const [trans] = useTrans();

    useEffect(() => {
        if (params?.sfa_id) f5DataSFA().then(res => {
            if (res.payload?.boxes?.length && !params?.box_id) {
                history.replace(`${match.url}/${res.payload?.boxes?.[0].id}`);
            } else if (!res.payload?.boxes?.length) {
                history.push(`${match.url}/create-new-box`);
            }
        });
    }, []); // eslint-disable-line

    const f5DataSFA = () => {
        return dispatch(fetchSFA({ id: params.sfa_id, with: 'boxes.childs.items;boxes.items' }))
    }

    const handleSelectBox = (box) => {
        history.push(`/warehouse/classify-box/${params?.sfa_id}/${box.id}`);
    }

    const focusModalCreateBox = () => {
        history.push(`${match.url}/create-new-box`);
    }

    const createBoxSuccess = (res) => {
        handleSelectBox(res);
        f5DataSFA();
    }

    if (!loading && !sfa?.boxes?.length)
        return (
            <Layout title={`${trans("MENU.WAREHOUSE.ASSIGN_BOXES")} - SFA: ${params?.sfa_id}`}>
                <EmptyDataContent focusModalCreateBox={focusModalCreateBox} />

                <NeedPermission need={['boxes.create']}>
                    <Route path={`${match.path}/create-new-box`}>
                        {({ match }) => (
                            <CreateNewBox
                                show={match !== null}
                                onSuccess={createBoxSuccess}
                            />
                        )}
                    </Route>
                </NeedPermission>
            </Layout>
        )

    return (
        <Route path={`${match.path}/:box_id`}>
            <ClassifyBox f5DataSFA={f5DataSFA} />
        </Route>
    );
};

ClassifyDetail.propTypes = {

};

export default ClassifyDetail;
