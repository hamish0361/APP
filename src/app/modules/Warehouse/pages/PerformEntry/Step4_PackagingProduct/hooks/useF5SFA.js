import { fetchSFA } from "app/modules/Warehouse/warehouse-redux/sfaSlice";
import { useDispatch } from "react-redux"
import { useParams } from "react-router";

export default function useF5SFA() {
    const dispatch = useDispatch();
    const params = useParams();

    const f5SFAData = () => {
        return dispatch(fetchSFA({ id: params?.sfa_id, with: 'boxes.childs.items;agency;receipts;boxes.items' }))
    }

    return f5SFAData;
}