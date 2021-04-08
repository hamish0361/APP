import React, { useMemo, useCallback, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useRouteMatch, Route } from 'react-router-dom';

import _ from 'lodash';
import warehouseApi from 'apis/warehouse';

import {
    Box,
    makeStyles,
    Button,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow
} from '@material-ui/core';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Pagination } from '@material-ui/lab';
import { dialog } from 'app/components/DialogNotify';
import ModalConfirmDelete from '../../ModalConfirmDelete';
import EmptyData from 'app/components/EmptyData';

import './index.scss';
import useTrans from 'helper/useTrans';
import NeedPermission from 'app/components/NeedPermission';

const useStyles = makeStyles(theme => ({
    root: {},
    pagination: {
        display: 'flex',
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        justifyContent: 'flex-end'
    }
}));

const TableBoxOrders = ({ onRefresh, data = [], pagination = {}, onPageChange }) => {
    const classes = useStyles();
    const history = useHistory();
    const match = useRouteMatch();
    const inputQuantityRef = useRef([]);
    const [trans] = useTrans();

    useEffect(() => {
        if (data?.length) {
            data.forEach(r => {
                inputQuantityRef.current[r.id].value = r.quantity;
            })
        }
    }, [data]);

    const getCellElement = (row, column) => {
        if (column.render) return column.render(_.get(row, column.id), row);

        return _.get(row, column.id);
    };

    const handleDelete = recordId => {
        warehouseApi.boxOwner
            .delete(recordId)
            .then(() => {
                dialog.success(trans("warehouse.sku.owner.delete.success"));
                onRefresh && onRefresh();
            })
            .catch(() => {
                dialog.error(trans("warehouse.sku.owner.delete.failure"));
            });
    };

    const confirmDeleteBoxItem = record => {
        history.push(`${match.url}/delete-box-owner/${record.id}`);
    };

    const columns = useMemo(() => ([
        {
            id: 'objectable_id', title: trans("warehouse.sku.owner.title"), render: (objectable_id, { objectable_type }) => (
                <div className="owner-object">
                    <span className="object-type">{objectable_type === 'user' ? trans("common.customer") : trans("common.the_order")}</span>
                    <span> - </span>
                    <span className="object-id">{trans("common.code")}: {objectable_id}</span>
                </div>
            )
        },
        {
            id: 'quantity', title: trans("common.quantity"), render: (quantity, row) => {
                return (
                    <NeedPermission need={['owning-boxes.update']} fallback={(<span>{quantity}</span>)}>
                        <input
                            className="form-control quantity-box"
                            min={1}
                            type="number"
                            ref={ref => inputQuantityRef.current[row.id] = ref}
                            onKeyPress={(e) => handleChangeQuantity(e, row)}
                        />
                    </NeedPermission>
                )
            }
        },
    ]), []); // eslint-disable-line

    const handleChangeQuantity = (e, row) => {
        e.persist();

        if (e.charCode === 13)
            dispatchToApi(e.target.value, row, e.target)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const dispatchToApi = useCallback(_.debounce((v, row, ele) => {
        if (v < 1) {
            ele.style.borderColor = '#dc3545';

            return;
        }

        warehouseApi.boxOwner.update(row?.id, { quantity: v })
            .then(() => {
                dialog.success(trans("warehouse.sku.owner.update.success"));

                ele.style.borderColor = '#1BC5BD';

                setTimeout(() => {
                    ele.style.borderColor = '';
                }, 5000);
            })
            .catch((err) => {

                let errMessage = trans("warehouse.sku.owner.update.failure");

                if (err?.response?.data?.errors?.quantity) errMessage = err.response.data.errors.quantity

                dialog.error(errMessage);

                inputQuantityRef.current[row.id].value = row.quantity;

                ele.style.borderColor = '#dc3545';
            })

    }, 700), []); // eslint-disable-line

    if (!data.length) return <EmptyData emptyText={trans("warehouse.sku.owner.empty")} />

    return (
        <>
            <Route path={`${match.path}/delete-box-owner/:id`}>
                {({ match }) => (
                    <ModalConfirmDelete
                        id={match?.params?.id}
                        show={match !== null}
                        onConfirmed={handleDelete}
                        title={trans("warehouse.sku.owner.delete.title")}
                    />
                )}
            </Route>

            <PerfectScrollbar>
                <Box>
                    <Table className="table-box-owners">
                        <TableHead>
                            <TableRow>
                                {columns.map(column => (
                                    <TableCell key={column.id}>
                                        {column.title}
                                    </TableCell>
                                ))}
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {data.map(row => (
                                <TableRow hover key={row[columns[0].id]}>
                                    {columns.map(column => (
                                        <TableCell key={column.id}>
                                            {getCellElement(row, column)}
                                        </TableCell>
                                    ))}
                                    <TableCell>
                                        <NeedPermission need={['owning-boxes.delete']}>
                                            <Button
                                                color="primary"
                                                size="small"
                                                onClick={() =>
                                                    confirmDeleteBoxItem(row)
                                                }
                                            >
                                                {trans("common.delete")}
                                            </Button>
                                        </NeedPermission>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <Pagination
                        className={classes.pagination}
                        count={pagination.lastPage}
                        page={pagination.page}
                        shape="rounded"
                        onChange={onPageChange}
                    />
                </Box>
            </PerfectScrollbar>
        </>
    );
};

TableBoxOrders.propTypes = {
    data: PropTypes.array,
    pagination: PropTypes.any,
    onPageChange: PropTypes.func,
    onRefresh: PropTypes.func
};

export default TableBoxOrders;
