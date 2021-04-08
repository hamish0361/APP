import { fetchGoodsDelivery } from "app/modules/Warehouse/warehouse-redux/goodsDeliverySlice";
import { useDispatch } from "react-redux"
import { useParams } from "react-router";

export default function useGoodsDeliveryDetail() {

    const dispatch = useDispatch();
    const params = useParams();

    const getGoodsDeliveryDetail = (data) => {
        dispatch(fetchGoodsDelivery({ id: params?.id, with: "pivotBoxes.boxLadingBill.owningBox", ...data }))
    }

    return getGoodsDeliveryDetail;
}