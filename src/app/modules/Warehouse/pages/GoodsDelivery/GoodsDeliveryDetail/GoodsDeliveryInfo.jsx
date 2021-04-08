import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import useTrans from 'helper/useTrans';
import warehouseApi from 'apis/warehouse';
import _ from 'lodash';
import useGoodsDeliveryDetail from '../hooks/useGoodsDeliveryDetail';

import { Card, CardBody, CardHeader, CardHeaderToolbar } from '_metronic/_partials/controls';
import GrBtnEdit from 'app/modules/Warehouse/components/GrBtnEdit';
import FormAddGoodsDelivery from 'app/modules/Warehouse/components/Form/FormAddGoodsDelivery';
import Loading from 'app/components/Loading';
import { dialog } from 'app/components/DialogNotify';
import handleApiError from 'helper/handleApiError';
import NeedPermission from 'app/components/NeedPermission';

const GoodsDeliveryInfo = props => {

    const { data, loading } = useSelector(state => state.warehouse.goodsDelivery.detail)
    const [isEdit, setIsEdit] = useState(false);
    const [trans] = useTrans();
    const formRef = useRef();
    const getGoodsDeliveryDetail = useGoodsDeliveryDetail();

    const startEdit = () => {
        setIsEdit(true);
    }

    const handleCancel = () => {
        setIsEdit(false);

        formRef.current.resetForm();
    }

    const triggerSubmit = () => {
        formRef.current.submitForm();
    }

    const handleSaveUpdate = (values, form) => {
        warehouseApi.goodsDelivery.update(data.id, _.pick(values, ['partner_id', 'status_id', 'shipping_cost']))
            .then(() => {
                dialog.success(trans("warehouse.goods_delivery.update.success"));

                setIsEdit(false);
                getGoodsDeliveryDetail();
            })
            .catch((err) => {
                console.error(err);
                handleApiError(err, form);

                dialog.error(trans("warehouse.goods_delivery.update.failure"));
            })
    }

    return (
        <Card className="goods-delivery-info">
            <CardHeader title={trans("warehouse.goods_delivery.info.title")}>
                <NeedPermission need={['goods-deliveries.update']}>
                    <CardHeaderToolbar>
                        <GrBtnEdit
                            isEdit={isEdit}
                            onEdit={startEdit}
                            onSubmit={triggerSubmit}
                            onCancel={handleCancel}
                        />
                    </CardHeaderToolbar>
                </NeedPermission>
            </CardHeader>
            <CardBody className="position-relative">
                {loading && <Loading local />}
                <FormAddGoodsDelivery
                    ref={formRef}
                    onSubmit={handleSaveUpdate}
                    initialValues={data}
                    isEdit={isEdit}
                    formItemClassName="col-lg-4 col-sm-12"
                />
            </CardBody>
        </Card>
    );
};

GoodsDeliveryInfo.propTypes = {

};

export default GoodsDeliveryInfo;