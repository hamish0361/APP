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

const TableContainerTypes = ({ onRefresh, onViewEdit }) => {
    const dataTable = useSelector(
        state => state.warehouse.containerType.list.data
    );
    const columns = useColumns();
    const [trans] = useTrans();
    const history = useHistory();
    const match = useRouteMatch();

    const handleConfirmDelete = (id) => {
        history.push(`${match.url}/delete-container-type/${id}`);
    }

    const handleDelete = (id) => {
        warehouseApi.containerType.delete(id)
            .then(() => {
                onRefresh && onRefresh();

                dialog.success(trans("warehouse.container_type.delete.success"));
            })
            .catch((err) => {
                console.error(err);

                dialog.error(trans("warehouse.container_type.delete.failure"));
            })
    }

    if (!dataTable.length) return <EmptyData emptyText={trans("warehouse.container_type.list.empty")} />;

    return (
        <div className="table-goods-deliveries">

            <NeedPermission need={['container-types.delete']}>
                <Route path={`${match.path}/delete-container-type/:container_type_id`}>
                    {({ match }) => (
                        <ModalConfirmDelete
                            id={match?.params?.container_type_id}
                            show={match != null}
                            onConfirmed={handleDelete}
                            title={trans("warehouse.container_type.delete.title")}
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
                    update: 'container-types.update',
                    delete: 'container-types.delete',
                }}
            />
        </div>
    );
};

TableContainerTypes.propTypes = {
    onRefresh: PropTypes.func
};

export default TableContainerTypes;
