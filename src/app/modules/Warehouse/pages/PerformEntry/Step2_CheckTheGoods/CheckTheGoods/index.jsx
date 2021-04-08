import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, useHistory, useParams, useRouteMatch } from 'react-router-dom';

import { fetchBox } from 'app/modules/Warehouse/warehouse-redux/boxSlice';
import useTrans from 'helper/useTrans';
import { fetchSFA } from 'app/modules/Warehouse/warehouse-redux/sfaSlice';
import { confirmStep2 } from 'app/modules/Warehouse/components/PerformEntry/ModalConfirmStep2';

import { Card, CardBody, CardHeader } from '_metronic/_partials/controls';
import NotFound from 'app/components/NotFound';
import Loading from 'app/components/Loading';
import CurrentBox from '../../../../components/PerformEntry/CurrentBox';
import AddBoxItem from './AddBoxItem';
import TableBoxItem from './TableBoxItem';
import CreateNewBox from '../../../../components/PerformEntry/CreateNewBox';
import Header from './Header';
import ListBox from 'app/modules/Warehouse/components/List/ListBox';
import NeedPermission from 'app/components/NeedPermission';

const CheckingBox = props => {

    const { data, loading } = useSelector(state => state.warehouse.box.detail);
    const sfa = useSelector(state => state.warehouse.sfa.detail.data);
    const params = useParams();
    const dispatch = useDispatch();
    const match = useRouteMatch();
    const history = useHistory();
    const [trans] = useTrans();
    const sfaRef = useRef();

    useEffect(() => {
        sfaRef.current = sfa;
    }, [sfa]);

    useEffect(() => {
        return () => {
            if (sfaRef.current?.boxes?.length && params.sfa_id === sfaRef.current.id) {
                let totalSku = sfaRef.current.boxes.reduce((prevV, curV) => prevV + curV.duplicate, 0);

                if (totalSku < sfaRef.current.quantity) {
                    confirmStep2({
                        totalSku,
                        quantity: sfaRef.current.quantity
                    });
                }
            }
        }
    }, []); // eslint-disable-line

    useEffect(() => {
        if (params?.box_id) f5BoxData();
    }, [params?.box_id]); // eslint-disable-line

    const f5BoxData = () => {
        dispatch(fetchBox({ id: params?.box_id, with: 'childs;items' }));
    }

    const updateBoxSuccess = () => {
        f5BoxData();
    }

    const createBoxSuccess = (res) => {
        history.push(`/warehouse/inbound/step-2/${params?.sfa_id}/${res.id}`);
        f5SFAData();
    }

    const f5SFAData = () => {
        dispatch(fetchSFA({ id: params?.sfa_id, with: 'boxes' }))
    }

    const handleSelectBox = (box) => {
        history.push(`/warehouse/inbound/step-2/${params?.sfa_id}/${box.id}`);
    }

    if (!data && !loading) return <NotFound />;

    return (
        <div className="checking-box position-relative">
            {loading && <Loading local />}

            <div className="row">
                <div className="col-lg-9 col-md-12 col-sm-12" style={{ height: '100%' }}>
                    <div className="row">
                        <div className="col-sm-12"><Header /></div>
                    </div>

                    <div className="row">
                        <div className="col-sm-12"><CurrentBox /></div>
                    </div>

                    <Card className="mb-0">
                        <CardHeader title={trans("warehouse.box_item.title")}></CardHeader>
                        <CardBody>
                            <AddBoxItem />
                            <TableBoxItem />
                        </CardBody>
                    </Card>
                </div>
                <div className="col-lg-3 col-md-12 col-sm-12 ipad-hidden">
                    <ListBox onSelectBox={handleSelectBox} showQuantity={(b) => b.duplicate} />
                </div>
            </div>

            <NeedPermission need={"boxes.create"}>
                <Route path={`${match.path}/create-box`}>
                    {({ match }) => (
                        <CreateNewBox
                            show={match !== null}
                            onSuccess={createBoxSuccess}
                        />
                    )}
                </Route>
            </NeedPermission>

            <NeedPermission need={"boxes.update"}>
                <Route path={`${match.path}/edit-box`}>
                    {({ match }) => (
                        <CreateNewBox
                            show={match !== null}
                            onSuccess={updateBoxSuccess}
                            initialValues={data}
                            isHaveDuplicate={false}
                        />
                    )}
                </Route>
            </NeedPermission>
        </div>
    );
};

CheckingBox.propTypes = {

};

export default React.memo(CheckingBox);