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
import { FormattedMessage } from 'react-intl';

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

function ItemTable(props) {
    const {
        columns,
        rows,
        page,
        lastpage,
        onPageChange,
        isPagination,
        onSort = null,
        isIndex
    } = props;
    const classes = useStyles();

    const handlePageChange = (e, newPage) => {
        if (onPageChange) onPageChange(newPage);
    };

    const getCellElement = (row, column) => {
        if (column.render) return column.render(_.get(row, column.id), row);

        return _.get(row, column.id);
    };

    const columnsSlice = columns.slice(1);

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
                <Table style={{ minWidth: rows.length <= 0 ? '' : '1200px' }}>
                    <TableHead>
                        <TableRow>
                            {isIndex && (
                                <TableCell>
                                    <span className={classes.title}>
                                        <FormattedMessage id="GLOBAL.NO" />
                                    </span>
                                </TableCell>
                            )}

                            {columnsSlice.map(column => (
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

                                    {columnsSlice.map(column => (
                                        <TableCell key={column.id}>
                                            <span className={classes.content}>
                                                {getCellElement(row, column)}
                                            </span>
                                        </TableCell>
                                    ))}
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

ItemTable.propTypes = {
    className: PropTypes.string,
    columns: PropTypes.array,
    rows: PropTypes.array,
    onPageChange: PropTypes.func,
    page: PropTypes.number,
    lastpage: PropTypes.number,
    isPagination: PropTypes.bool,
    isIndex: PropTypes.bool
};

ItemTable.defaultProps = {
    className: '',
    columns: [],
    rows: [],
    onPageChange: null,
    page: 1,
    lastpage: 1,
    isPagination: true,
    isIndex: true
};

export default ItemTable;
