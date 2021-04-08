import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, useHistory, useRouteMatch } from 'react-router';

import useTrans from 'helper/useTrans';
import useColumns from './useColumns';
import { goodsDeliveryAction } from 'app/modules/Warehouse/warehouse-redux/goodsDeliverySlice';
import warehouseApi from 'apis/warehouse';

import CustomTable from 'app/components/CustomTable';
import EmptyData from 'app/components/EmptyData';
import { dialog } from 'app/components/DialogNotify';
import ModalConfirmDelete from '../../ModalConfirmDelete';

import './index.scss';

const TableGoodsDeliveries = ({ onRefresh }) => {
    const { data: dataTable, pagination } = useSelector(
        state => state.warehouse.goodsDelivery.list
    );
    const columns = useColumns();
    const [trans] = useTrans();
    const history = useHistory();
    const match = useRouteMatch();
    const dispatch = useDispatch();

    const handleConfirmDelete = (id) => {
        history.push(`${match.url}/delete-goods-delivery/${id}`);
    }

    const handleViewEditRow = (id) => {
        history.push(`/warehouse/goods-delivery/detail/${id}`);
    }

    const handleChangePage = (page) => {
        dispatch(goodsDeliveryAction.setPage(page));
    }

    const handleDelete = (id) => {
        warehouseApi.goodsDelivery.delete(id)
            .then(() => {
                onRefresh && onRefresh();

                dialog.success(trans("warehouse.goods_delivery.delete.success"));
            })
            .catch((err) => {
                console.error(err);

                dialog.error(trans("warehouse.goods_delivery.delete.failure"));
            })
    }

    if (!dataTable.length) return <EmptyData emptyText={trans("warehouse.goods_delivery.list.empty")} />;

    return (
        <div className="table-goods-deliveries">

            <Route path={`${match.path}/delete-goods-delivery/:goods_delivery_id`}>
                {({ history, match }) => (
                    <ModalConfirmDelete
                        id={match?.params?.goods_delivery_id}
                        show={match != null}
                        onConfirmed={handleDelete}
                        title={trans("warehouse.goods_delivery.delete.title")}
                    />
                )}
            </Route>

            <CustomTable
                columns={columns}
                rows={dataTable}
                onDelete={handleConfirmDelete}
                onViewEdit={handleViewEditRow}
                onPageChange={handleChangePage}
                page={pagination.page}
                lastpage={pagination.lastPage}
                rowKey="id"
                permissions={{
                    delete: ['goods-deliveries.delete']
                }}
            />
        </div>
    );
};

TableGoodsDeliveries.propTypes = {
    onRefresh: PropTypes.func
};

export default TableGoodsDeliveries;
