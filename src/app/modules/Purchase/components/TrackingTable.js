import {
    makeStyles,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TableSortLabel
} from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import EmptyData from 'app/components/EmptyData';
import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import SVG from 'react-inlinesvg';
import { toAbsoluteUrl } from '_metronic/_helpers';

const useStyles = makeStyles(theme => ({
    root: {},
    pagination: {
        display: 'flex',
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        justifyContent: 'flex-end'
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1
    },
    title: {
        fontSize: '1.15rem',
        fontWeight: '500'
    },
    content: {
        fontSize: '1rem'
    }
}));

function TrackingTable(props) {
    const {
        columns,
        rows,
        page,
        lastpage,
        onPageChange,
        onDelete,
        onViewEdit,
        isPagination,
        isAction,
        isDelete,
        isViewEdit,
        additionalActions,
        onSort = null,
        isIndex
    } = props;
    const classes = useStyles();

    const handlePageChange = (e, newPage) => {
        if (onPageChange) onPageChange(newPage);
    };

    const handleDelete = id => {
        if (onDelete) onDelete(id);
    };

    const handleViewEdit = id => {
        if (onViewEdit) onViewEdit(id);
    };

    const getCellElement = (row, column) => {
        if (column.render) return column.render(_.get(row, column.id), row);

        return _.get(row, column.id);
    };

    const [order, setOrder] = React.useState('desc');
    const [orderBy, setOrderBy] = useState('');

    const handleSort = property => {
        const isAsc = orderBy === property && order === 'asc';
        const orderByTemp = isAsc ? 'desc' : 'asc';
        setOrder(orderByTemp);
        setOrderBy(property);
        if (onSort) onSort(property, orderByTemp);
    };

    return (
        <div>
            <div style={{ overflow: 'auto' }}>
                <Table style={{ minWidth: '500px' }}>
                    <TableHead>
                        <TableRow>
                            {isIndex && (
                                <TableCell>
                                    <span className={classes.title}>STT</span>
                                </TableCell>
                            )}

                            {columns.map(column => (
                                <TableCell key={column.id}>
                                    {column.isSort ? (
                                        <TableSortLabel
                                            active={orderBy === column.id}
                                            direction={
                                                orderBy === column.id
                                                    ? order
                                                    : 'desc'
                                            }
                                            onClick={() =>
                                                handleSort(column.id)
                                            }
                                        >
                                            <span className={classes.title}>
                                                {column.title}
                                            </span>
                                            {orderBy === column.id &&
                                            column.disablePadding ? (
                                                <span
                                                    className={
                                                        classes.visuallyHidden
                                                    }
                                                >
                                                    {order === 'desc'
                                                        ? 'sorted descending'
                                                        : 'sorted ascending'}
                                                </span>
                                            ) : null}
                                        </TableSortLabel>
                                    ) : (
                                        <span className={classes.title}>
                                            {column.title}
                                        </span>
                                    )}
                                </TableCell>
                            ))}

                            {isAction && (
                                <TableCell className="text-center">
                                    <span className={classes.title}>#</span>
                                </TableCell>
                            )}
                        </TableRow>
                    </TableHead>
                    {rows.length > 0 && (
                        <TableBody>
                            {rows.map((row, index) => (
                                <TableRow
                                    hover
                                    key={index}
                                    style={{
                                        backgroundColor:
                                            index % 2 === 1 ? '' : '#e2e3ef'
                                    }}
                                >
                                    {isIndex && (
                                        <TableCell>{index + 1}</TableCell>
                                    )}

                                    {columns.map(column => (
                                        <TableCell key={column.id}>
                                            <span className={classes.content}>
                                                {getCellElement(row, column)}
                                            </span>
                                        </TableCell>
                                    ))}

                                    {isAction && (
                                        <TableCell
                                            style={{ width: '150px' }}
                                            className="text-center"
                                        >
                                            {additionalActions.map(
                                                (action, idx) => (
                                                    <React.Fragment
                                                        key={`action-item-${idx}`}
                                                    >
                                                        {action(row)}
                                                    </React.Fragment>
                                                )
                                            )}
                                            {isViewEdit && (
                                                <button
                                                    className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3"
                                                    onClick={() =>
                                                        handleViewEdit(
                                                            row[columns[0].id]
                                                        )
                                                    }
                                                    data-toggle="tooltip"
                                                    data-placement="top"
                                                    title="Chi tiết"
                                                >
                                                    <span className="svg-icon svg-icon-md svg-icon-primary">
                                                        <SVG
                                                            src={toAbsoluteUrl(
                                                                '/media/svg/icons/Communication/Write.svg'
                                                            )}
                                                        ></SVG>
                                                    </span>
                                                </button>
                                            )}
                                            {isDelete && (
                                                <button
                                                    className="btn btn-icon btn-light btn-hover-danger btn-sm"
                                                    onClick={() =>
                                                        handleDelete(
                                                            row[columns[0].id]
                                                        )
                                                    }
                                                >
                                                    <span className="svg-icon svg-icon-md svg-icon-danger">
                                                        <SVG
                                                            src={toAbsoluteUrl(
                                                                '/media/svg/icons/General/Trash.svg'
                                                            )}
                                                        ></SVG>
                                                    </span>
                                                </button>
                                            )}
                                        </TableCell>
                                    )}
                                </TableRow>
                            ))}
                        </TableBody>
                    )}
                </Table>
            </div>
            {rows.length <= 0 && <EmptyData />}
            {isPagination && (
                <Pagination
                    className={classes.pagination}
                    count={lastpage}
                    page={page}
                    shape="rounded"
                    onChange={handlePageChange}
                />
            )}
        </div>
    );
}

TrackingTable.propTypes = {
    className: PropTypes.string,
    columns: PropTypes.array,
    rows: PropTypes.array,
    onPageChange: PropTypes.func,
    onDelete: PropTypes.func,
    onViewEdit: PropTypes.func,
    page: PropTypes.number,
    lastpage: PropTypes.number,
    isPagination: PropTypes.bool,
    isAction: PropTypes.bool,
    isDelete: PropTypes.bool,
    isViewEdit: PropTypes.bool,
    isIndex: PropTypes.bool,
    additionalActions: PropTypes.array
};

TrackingTable.defaultProps = {
    className: '',
    columns: [],
    rows: [],
    onPageChange: null,
    onDelete: null,
    onViewEdit: null,
    page: 1,
    lastpage: 1,
    isPagination: true,
    isAction: true,
    isDelete: true,
    isViewEdit: true,
    isIndex: true,
    additionalActions: []
};

export default TrackingTable;
