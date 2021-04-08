import { fetchProduct } from "app/modules/Product/product-redux/productSlice";
import { useDispatch } from "react-redux"

export default function useFetchData() {
    const dispatch = useDispatch();

    const f5Data = (params) => {
        dispatch(fetchProduct({ orderBy: 'created_at', sortedBy: 'desc', ...params }));
    }

    return { f5Data };
}