import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, useHistory, useRouteMatch } from 'react-router';

import useTrans from 'helper/useTrans';
import useColumns from './useColumns';
import warehouseApi from 'apis/warehouse';

import CustomTable from 'app/components/CustomTable';
import EmptyData from 'app/components/EmptyData';
import { dialog } from 'app/components/DialogNotify';
import ModalConfirmDelete from '../../ModalConfirmDelete';

import './index.scss';
import NeedPermission from 'app/components/NeedPermission';

const TableShipmentMethods = ({ onRefresh, onViewEdit }) => {
    const dataTable = useSelector(
        state => state.warehouse.shipmentMethod.list.data
    );
    const columns = useColumns();
    const [trans] = useTrans();
    const history = useHistory();
    const match = useRouteMatch();

    const handleConfirmDelete = (id) => {
        history.push(`${match.url}/delete-shipment-method/${id}`);
    }

    const handleDelete = (id) => {
        warehouseApi.shipmentMethod.delete(id)
            .then(() => {
                onRefresh && onRefresh();

                dialog.success(trans("warehouse.shipment_method.delete.success"));
            })
            .catch((err) => {
                console.error(err);

                dialog.error(trans("warehouse.shipment_method.delete.failure"));
            })
    }

    if (!dataTable.length) return <EmptyData emptyText={trans("warehouse.shipment_method.list.empty")} />;

    return (
        <div className="table-shipment-methods">

            <NeedPermission need={['shipment-methods.delete']}>
                <Route path={`${match.path}/delete-shipment-method/:shipment_method_id`}>
                    {({ match }) => (
                        <ModalConfirmDelete
                            id={match?.params?.shipment_method_id}
                            show={match != null}
                            onConfirmed={handleDelete}
                            title={trans("warehouse.shipment_method.delete.title")}
                        />
                    )}
                </Route>
            </NeedPermission>

            <CustomTable
                columns={columns}
                rows={dataTable}
                onDelete={handleConfirmDelete}
                onViewEdit={onViewEdit}
                isPagination={false}
                rowKey="id"
                noSTT
                permissions={{
                    update: 'shipment-methods.update',
                    delete: 'shipment-methods.delete',
                }}
            />
        </div>
    );
};

TableShipmentMethods.propTypes = {
    onRefresh: PropTypes.func
};

export default TableShipmentMethods;
