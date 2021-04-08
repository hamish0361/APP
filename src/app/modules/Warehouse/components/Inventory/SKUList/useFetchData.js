import { fetchBoxs } from "app/modules/Warehouse/warehouse-redux/boxSlice";
import { useDispatch } from "react-redux"

export default function useFetchData() {
    const dispatch = useDispatch();

    const f5Data = (params) => {
        dispatch(fetchBoxs({ with: 'items', orderBy: 'created_at', sortedBy: 'desc', ...params }));
    }

    return { f5Data };
}