import { useState } from "react";
import warehouseApi from 'apis/warehouse';
import { dialog } from "app/components/DialogNotify";
import handleApiError from "helper/handleApiError";
import useTrans from "helper/useTrans";

export default function useCRUDReceipt({onRefresh}) {
    const [loading, setLoading] = useState();
    const [trans] = useTrans();

    const createReceipt = ({ sfaId, file }, form) => {

        setLoading(true);
        let formData = new FormData();

        formData.set('file', file, file.name);

        return warehouseApi.receipt.create(sfaId, formData)
            .then((res) => {
                dialog.success(trans("warehouse.receipt.create.success"));

                onRefresh && onRefresh();

                form.resetForm();

                return res;
            })
            .catch(err => {
                dialog.error(trans("warehouse.receipt.create.failure"));

                handleApiError(err, form);
            })
            .finally(() => {
                setLoading(false)
            });
    }

    const deleteReceipt = (receiptId) => {
        setLoading(true);
        return warehouseApi.receipt.delete(receiptId)
        .then((res) => {
            dialog.success(trans("warehouse.receipt.delete.success"));
            
            onRefresh && onRefresh();

            return res;
        })
        .catch(() => {
            dialog.error(trans("warehouse.receipt.delete.failure"));
        })
        .finally(() => {
            setLoading(false);
        });
    }

    return [loading, createReceipt, deleteReceipt];
}