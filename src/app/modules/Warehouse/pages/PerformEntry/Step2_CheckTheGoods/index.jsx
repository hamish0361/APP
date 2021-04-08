import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, useHistory, useParams, useRouteMatch } from 'react-router-dom';

import { fetchSFA } from 'app/modules/Warehouse/warehouse-redux/sfaSlice';

import NotFound from 'app/components/NotFound';
import Loading from 'app/components/Loading';
import CheckTheGoods from './CheckTheGoods';
import CreateNewBox from '../../../components/PerformEntry/CreateNewBox';
import PerformStep from '../PerformStep';
import EmptyDataContent from './EmptyDataContent';
import NeedPermission from 'app/components/NeedPermission';

import './index.scss';

const CreateBoxSection = props => {

    const { data: sfa, loading } = useSelector(state => state.warehouse.sfa.detail);
    const dispatch = useDispatch();
    const params = useParams();
    const history = useHistory();
    const match = useRouteMatch();

    useEffect(() => {
        if (params?.sfa_id) {
            dispatch(fetchSFA({ id: params?.sfa_id, with: 'boxes;receipts' }))
                .then(res => {
                    if (res.payload?.boxes?.length && !params?.box_id) {
                        history.replace(`${match.url}/${res.payload?.boxes?.[0].id}`);
                    } else if (!res.payload?.boxes?.length) {
                        history.push(`/warehouse/inbound/step-2/${params?.sfa_id}/create-new-box`);
                    }
                })
        }
    }, [params?.sfa_id]); // eslint-disable-line

    const focusModalCreateBox = () => {
        history.push(`${match.url}/create-new-box`);
    }

    const createBoxSuccess = (res) => {
        history.push(`/warehouse/inbound/step-2/${params?.sfa_id}/${res.id}`);
        dispatch(fetchSFA({ id: params?.sfa_id, with: 'boxes' }));
    }

    if (!sfa && !loading) return <NotFound />

    return (
        <>
            <PerformStep />
            <div className="create-box step-2 position-relative">
                {loading && <Loading local />}

                {!sfa?.boxes?.length ? (
                    <EmptyDataContent focusModalCreateBox={focusModalCreateBox} />
                ) : (<CheckTheGoods />)}

                <NeedPermission need={"boxes.create"}>
                    <Route path={`${match.path}/create-new-box`}>
                        {({ match }) => (
                            <CreateNewBox
                                show={match !== null}
                                onSuccess={createBoxSuccess}
                            />
                        )}
                    </Route>
                </NeedPermission>
            </div>
        </>
    );
};

CreateBoxSection.propTypes = {

};

export default CreateBoxSection;