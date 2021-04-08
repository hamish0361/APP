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

const TableArea = ({ onRefresh, onViewEdit }) => {
    const dataTable = useSelector(
        state => state.warehouse.area.list
    );
    const columns = useColumns();
    const [trans] = useTrans();
    const history = useHistory();
    const match = useRouteMatch();

    const handleConfirmDelete = (id) => {
        history.push(`${match.url}/delete-area/${id}`);
    }

    const handleDelete = (id) => {
        warehouseApi.area.delete(id)
            .then(() => {
                onRefresh && onRefresh();

                dialog.success(trans("warehouse.area.delete.success"));
            })
            .catch((err) => {
                console.error(err);

                dialog.error(trans("warehouse.area.delete.failure"));
            })
    }

    if (!dataTable.length) return <EmptyData emptyText={trans("warehouse.area.list.empty")} />;

    return (
        <div className="table-area">

            <NeedPermission need={'areas.delete'}>
                <Route path={`${match.path}/delete-area/:area_id`}>
                    {({ match }) => (
                        <ModalConfirmDelete
                            id={match?.params?.area_id}
                            show={match != null}
                            onConfirmed={handleDelete}
                            title={trans("warehouse.area.delete.title")}
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
                    update: 'areas.update',
                    delete: 'areas.delete'
                }}
            />
        </div>
    );
};

TableArea.propTypes = {
    onRefresh: PropTypes.func
};

export default TableArea;
