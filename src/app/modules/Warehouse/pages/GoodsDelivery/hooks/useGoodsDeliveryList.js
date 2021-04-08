import { useEffect } from "react";
import { fetchGoodsDeliveries } from "app/modules/Warehouse/warehouse-redux/goodsDeliverySlice";
import { useDispatch, useSelector } from "react-redux";

export default function useGoodsDeliveryList() {

    const pagination = useSelector(state => state.warehouse.goodsDelivery.list.pagination);
    const dispatch = useDispatch();

    useEffect(() => {
        getDataGoodsDelivery();
    }, [pagination.page]); // eslint-disable-line

    const getDataGoodsDelivery = (params) => {
        dispatch(fetchGoodsDeliveries({ page: pagination.page, with: "deliveryPartner;goodsDeliveryStatus", ...params }));
    }

    return getDataGoodsDelivery;
}