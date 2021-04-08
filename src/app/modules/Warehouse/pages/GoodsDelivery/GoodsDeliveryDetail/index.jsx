import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';

import useTrans from 'helper/useTrans';
import useGoodsDeliveryDetail from '../hooks/useGoodsDeliveryDetail';

import Layout from 'app/modules/Warehouse/components/Layout';
import GoodsDeliveryInfo from './GoodsDeliveryInfo';
import NotFound from 'app/components/NotFound';
import GoodsDeliveryBoxes from './GoodsDeliveryBoxes';

const GoodsDeliveryDetail = props => {

    const { data, loading } = useSelector(state => state.warehouse.goodsDelivery.detail)
    const [trans] = useTrans();
    const params = useParams();
    const getGoodsDeliveryDetail = useGoodsDeliveryDetail();

    useEffect(() => {
        if (params?.id) {
            getGoodsDeliveryDetail();
        }
    }, [params?.id]); // eslint-disable-line

    if(!data && !loading) return <NotFound />

    return (
        <Layout title={`${trans("warehouse.goods_delivery.title")} - ${params.id}`}>
            <GoodsDeliveryInfo />
            <GoodsDeliveryBoxes />
        </Layout>
    );
};

GoodsDeliveryDetail.propTypes = {

};

export default GoodsDeliveryDetail;