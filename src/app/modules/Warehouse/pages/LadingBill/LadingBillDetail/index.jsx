import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import { fetchLadingBill } from 'app/modules/Warehouse/warehouse-redux/ladingBillSlice';
import useTrans from 'helper/useTrans';

import LadingBillInfo from './LadingBillInfo';
import LadingBillBox from './LadingBillBox';
import NotFound from 'app/components/NotFound';
import Layout from 'app/modules/Warehouse/components/Layout';
import LadingBillCostInfo from './LadingBillCostInfo';

const LadingBillDetail = props => {
    const { loading, data } = useSelector(
        state => state.warehouse.ladingBill.detail
    );
    const [trans] = useTrans();
    const params = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        if (params?.id) f5LadingBillDetail();
    }, [params?.id]); // eslint-disable-line

    const f5LadingBillDetail = () => {
        dispatch(fetchLadingBill({ id: params?.id, with: "boxLadingBills.owningBox.box.items" }));
    }

    if (!loading && !data) return <NotFound />;

    return (
        <Layout className="lading-bill-detail-page" title={`${trans("warehouse.lading_bill.title")} ${params?.id}`}>
            <div className="row">
                <div className="col-lg-6">
                    <LadingBillInfo />
                </div>
                <div className="col-lg-6">
                    <LadingBillCostInfo />
                </div>
            </div>
            <LadingBillBox onRefresh={f5LadingBillDetail} />
        </Layout>
    );
};

LadingBillDetail.propTypes = {};

export default LadingBillDetail;
