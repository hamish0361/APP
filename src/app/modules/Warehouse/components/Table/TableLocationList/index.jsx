import React, { useMemo } from 'react';
import { useHistory, Route, useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';

import warehouseApi from 'apis/warehouse';
import useColumn from './useColumns';
import useTrans from 'helper/useTrans';
import { toAbsoluteUrl } from '_metronic/_helpers';
import { startPrinter } from 'app/components/PrinterModal';
import { printerTemplate } from 'helper/printerTemplateData';
import _ from 'lodash';

import SVG from 'react-inlinesvg';
import CustomTable from 'app/components/CustomTable';
import ModalConfirmDelete from '../../ModalConfirmDelete';
import { dialog } from 'app/components/DialogNotify';
import EmptyData from 'app/components/EmptyData';

import './index.scss';
import NeedPermission from 'app/components/NeedPermission';

const TableLocationList = ({ onRefresh, dataTable = [] }) => {

    const history = useHistory();
    const match = useRouteMatch();
    const columns = useColumn();
    const [trans] = useTrans();

    const handleConfirmDelete = rowId => {
        history.push(`${match.url}/delete-location/${rowId}`);
    };

    const handleDelete = rowId => {
        warehouseApi.location
            .delete(rowId)
            .then(() => {
                onRefresh && onRefresh();
                dialog.success(trans("warehouse.location.delete.success"));
            })
            .catch(() => {
                dialog.error(trans("warehouse.location.delete.failure"));
            });
    };

    const handleRePrintLabel = (row) => {
        startPrinter(printerTemplate.location(row));
    }

    const additionalActions = useMemo(() => ([
        row => (
            <button
                className="btn btn-icon btn-light btn-hover-primary btn-sm mr-2"
                onClick={() => handleRePrintLabel(row)}
            >
                <span className="svg-icon svg-icon-success">
                    <SVG
                        src={toAbsoluteUrl(
                            '/media/svg/icons/Devices/Printer.svg'
                        )}
                    ></SVG>
                </span>
            </button>

        )
    ]), []); // eslint-disable-line

    const sortedDataTable = useMemo(() => {
        return _.sortBy(dataTable, ['shelve_id', 'floor', 'row', 'column']);
    }, [dataTable]);

    if (!dataTable.length) return <EmptyData emptyText={trans("warehouse.location.empty")} />;

    return (
        <>
            <NeedPermission need={['locations.delete']}>
                <Route path={`${match.path}/delete-location/:location_id`}>
                    {({ match }) => (
                        <ModalConfirmDelete
                            id={match?.params?.location_id}
                            show={match != null}
                            onConfirmed={handleDelete}
                            title={trans("warehouse.location.delete.title")}
                        />
                    )}
                </Route>
            </NeedPermission>

            <CustomTable
                columns={columns}
                rows={sortedDataTable}
                onDelete={handleConfirmDelete}
                isViewEdit={false}
                rowKey="id"
                className="table-locations"
                additionalActions={additionalActions}
                noSTT
                permissions={{
                    delete: ['locations.delete']
                }}
            />
        </>
    );
};

TableLocationList.propTypes = {
    onRefresh: PropTypes.func
};

export default TableLocationList;
