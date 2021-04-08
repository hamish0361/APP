import { useEffect, useState } from "react";

import warehouseApi from 'apis/warehouse';
import useTrans from "helper/useTrans";

import { dialog } from "app/components/DialogNotify";

export default function useBoxLadingBill(ladingBillId) {
    const [boxes, setBoxes] = useState([]);
    const [pagination, setPagination] = useState({ page: 1, lastPage: 0 });
    const [loading, setLoading] = useState(false);
    const [trans] = useTrans();

    useEffect(() => {
        if (ladingBillId) {
            getBoxLadingBills();
        }
    }, [ladingBillId, pagination.page]); // eslint-disable-line

    const getBoxLadingBills = () => {
        setLoading(true);
        warehouseApi.boxLadingBill.fetchBoxLadingBills({
            search: `lading_bill_id:${ladingBillId}`,
            searchFields: `lading_bill_id:=`,
            page: pagination.page,
            with: "owningBox"
        }).then((res) => {
            setBoxes(res.data);
            setPagination({ page: 1, lastPage: res.last_page });
        }).catch((err) => {
            console.error(err);

            setBoxes([]);

            dialog.error(trans("common.fetch.failure"))
        }).finally(() => {
            setLoading(false);
        });
    }

    const setPage = (page) => {
        setPagination({
            ...pagination,
            page
        });
    }

    return { boxes, pagination, loading, setPage };
}