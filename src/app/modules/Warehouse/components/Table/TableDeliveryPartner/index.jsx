import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, useHistory, useRouteMatch } from 'react-router';

import useTrans from 'helper/useTrans';
import useColumns from './useColumns';
import warehouseApi from 'apis/warehouse';
import { deliveryPartnerAction } from 'app/modules/Warehouse/warehouse-redux/deliveryPartnerSlice';

import CustomTable from 'app/components/CustomTable';
import EmptyData from 'app/components/EmptyData';
import { dialog } from 'app/components/DialogNotify';
import ModalConfirmDelete from '../../ModalConfirmDelete';

import './index.scss';

const TableDeliveryPartner = ({ onRefresh, onViewEdit }) => {
    const dataTable = useSelector(
        state => state.warehouse.deliveryPartner.list.data
    );
    const pagination = useSelector(
        state => state.warehouse.deliveryPartner.list.pagination
    );
    const columns = useColumns();
    const [trans] = useTrans();
    const history = useHistory();
    const match = useRouteMatch();
    const dispatch = useDispatch();

    const handleConfirmDelete = (id) => {
        history.push(`${match.url}/delete-delivery-partner/${id}`);
    }

    const handleDelete = (id) => {
        warehouseApi.deliveryPartner.delete(id)
            .then(() => {
                onRefresh && onRefresh();

                dialog.success(trans("warehouse.delivery_partner.delete.success"));
            })
            .catch((err) => {
                console.error(err);

                dialog.error(trans("warehouse.delivery_partner.delete.failure"));
            })
    }

    const handlePageChange = useCallback((page) => {
        dispatch(deliveryPartnerAction.setPage(page));
    }, [dispatch]);

    if (!dataTable.length) return <EmptyData emptyText={trans("warehouse.delivery_partner.list.empty")} />;

    return (
        <div className="table-delivery-partner">

            <Route path={`${match.path}/delete-delivery-partner/:delivery_partner_id`}>
                {({ match }) => (
                    <ModalConfirmDelete
                        id={match?.params?.delivery_partner_id}
                        show={match != null}
                        onConfirmed={handleDelete}
                        title={trans("warehouse.delivery_partner.delete.title")}
                    />
                )}
            </Route>

            <CustomTable
                columns={columns}
                rows={dataTable}
                onDelete={handleConfirmDelete}
                onViewEdit={onViewEdit}
                page={pagination.page}
                lastpage={pagination.lastPage}
                onPageChange={handlePageChange}
                rowKey="id"
                noSTT
                permissions={{
                    update: ['delivery-partners.update'],
                    delete: ['delivery-partners.delete']
                }}
            />
        </div>
    );
};

TableDeliveryPartner.propTypes = {
    onRefresh: PropTypes.func
};

export default TableDeliveryPartner;
