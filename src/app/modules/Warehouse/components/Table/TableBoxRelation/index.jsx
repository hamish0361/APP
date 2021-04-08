import React from 'react';
import PropTypes from 'prop-types';

import _ from 'lodash';
import { currenyUnit } from 'config/currency';
import formatNumber from 'helper/formatNumber';

import {
    Box,
    Button,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow
} from '@material-ui/core';
import PerfectScrollbar from 'react-perfect-scrollbar';

import './index.scss';

const columns = [
    { id: 'id', title: 'Id' },
    {
        id: 'volume', title: 'Thể tích', render: (volume, row) => (
            <div>
                {formatNumber(volume)}
                <div>
                    <small className="text-primary">{row.width} × {row.height} × {row.length}</small>
                </div>
            </div>
        )
    },
    {
        id: 'shipping_inside', title: 'Phí vận chuyển', render: (shipping_inside, row) => (
            <div>
                {formatNumber(shipping_inside, { round: 2 })} {currenyUnit}
                <div>
                    <small className="text-primary">(Phí từng box: {formatNumber(row.shipping_inside_per_box, { round: 2 })} {currenyUnit})</small>
                </div>
            </div>
        )
    },
];

const TableBoxRelation = ({ relationType, onAction, data = [] }) => {
    const getCellElement = (row, column) => {
        if (column.render) return column.render(_.get(row, column.id), row);

        return _.get(row, column.id);
    };

    const handleTriggerAction = row => {
        onAction && onAction(row);
    };

    return (
        <PerfectScrollbar>
            <Box>
                <Table className="table-box-relation">
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
                                    <Button
                                        color="primary"
                                        size="small"
                                        onClick={() => handleTriggerAction(row)}
                                    >
                                        {relationType === 'parent'
                                            ? 'Unpack'
                                            : 'Remove'}
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
        </PerfectScrollbar>
    );
};

TableBoxRelation.propTypes = {
    data: PropTypes.array,
    relationType: PropTypes.oneOf(['parent', 'childs']),
    onAction: PropTypes.func
};

export default TableBoxRelation;
