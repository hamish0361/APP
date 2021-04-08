import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, useHistory, useRouteMatch } from 'react-router-dom';

import { fetchLadingBills } from '../../../warehouse-redux/ladingBillSlice';

import {
    Card,
    CardBody,
    CardHeader,
    CardHeaderToolbar
} from '_metronic/_partials/controls';
import TableLadingBillList from 'app/modules/Warehouse/components/Table/TableLadingBillList';
import CreateLadingBill from './CreateLadingBill';
import LadingBillFilter from 'app/modules/Warehouse/components/Filter/LadingBillFilter';
import Loading from 'app/components/Loading';
import Layout from 'app/modules/Warehouse/components/Layout';
import useTrans from 'helper/useTrans';
import NeedPermission from 'app/components/NeedPermission';

const LadingBillList = props => {
    const { pagination, loading } = useSelector(
        state => state.warehouse.ladingBill.list
    );
    const dispatch = useDispatch();
    const history = useHistory();
    const match = useRouteMatch();
    const filterRef = useRef();
    const [trans] = useTrans();

    const getLadingBillsData = (params) => {
        dispatch(fetchLadingBills({ page: pagination.page, ...params }));
    }

    useEffect(() => {
        getLadingBillsData();
    }, [pagination.page]); // eslint-disable-line

    const handleSearchSubmit = search => {
        getLadingBillsData(search);
    };

    const f5Table = () => {
        getLadingBillsData();

        filterRef.current && filterRef.current.reset();
    }

    const createLadingBillSuccess = (data) => {
        getLadingBillsData();

        history.push(`/warehouse/lading-bills/${data.id}`)
    }

    return (
        <Layout title={trans("warehouse.lading_bill.title")}>
            <NeedPermission need={['lading-bills.create']}>
                <Route path={`${match.path}/create-lading-bill`}>
                    {({ match }) => (
                        <CreateLadingBill
                            show={match !== null}
                            onSuccess={createLadingBillSuccess}
                        />
                    )}
                </Route>
            </NeedPermission>
            <Card>
                <CardHeader title={trans("warehouse.lading_bill.list.title")}>
                    <NeedPermission need={['lading-bills.create']}>
                        <CardHeaderToolbar>
                            <button
                                className="btn btn-primary"
                                onClick={() =>
                                    history.push(`${match.url}/create-lading-bill`)
                                }
                            >
                                {trans("warehouse.lading_bill.create.title")}
                            </button>
                        </CardHeaderToolbar>
                    </NeedPermission>
                </CardHeader>
                <CardBody className="position-relative">
                    {loading && <Loading local />}
                    <NeedPermission need={['lading-bills.index']}>
                        <LadingBillFilter ref={filterRef} onSearch={handleSearchSubmit} />
                        <TableLadingBillList
                            onRefresh={f5Table}
                        />
                    </NeedPermission>
                </CardBody>
            </Card>
        </Layout>
    );
};

LadingBillList.propTypes = {};

export default LadingBillList;
