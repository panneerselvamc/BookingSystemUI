import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import {
    ButtonToolbar,
    Button
} from "react-bootstrap";

import Moment from 'react-moment';

function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const headRows = [
    { id: 'flightNo', numeric: false, disablePadding: false, label: 'Flight No' },
    { id: 'airlineNo', numeric: false, disablePadding: false, label: 'Airline No' },
    { id: 'departureTime', numeric: false, disablePadding: false, label: 'Departure Time' },
    { id: 'arrivalTime', numeric: false, disablePadding: false, label: 'Arrival Time' },
    { id: 'duration', numeric: false, disablePadding: false, label: 'Duration' },
    { id: 'noOfStops', numeric: false, disablePadding: false, label: 'No Of Stops' },
    { id: 'price', numeric: true, disablePadding: false, label: 'Price' },
];

function EnhancedTableHead(props) {

    const { classes, order, orderBy,  onRequestSort } = props;
    const createSortHandler = property => event => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>

                {headRows.map(row => (
                    <TableCell
                        key={row.id}
                        align="left"
                        padding={row.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === row.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === row.id}
                            direction={order}
                            onClick={row.id === "price" ? createSortHandler(row.id) : null}
                        >
                            {row.label}
                            {orderBy === row.id ? (
                                <span className={classes.visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
                <TableCell />
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,

};


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    tableWrapper: {
        overflowX: 'auto',
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
        width: 1,
    },
}));

export default function EnhancedTable(props) {
    console.log(props.FlightData)
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('price');
    const [page, setPage] = React.useState(0);
    const [dense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    function handleRequestSort(event, property) {
        const isDesc = orderBy === property && order === 'desc';
        setOrder(isDesc ? 'asc' : 'desc');
        setOrderBy(property);
    }

    function handleChangePage(event, newPage) {
        setPage(newPage);
    }

    function handleChangeRowsPerPage(event) {
        setRowsPerPage(+event.target.value);
        setPage(0);
    }


    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>

                <div className={classes.tableWrapper}>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                    >
                        <EnhancedTableHead
                            classes={classes}
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            rowCount={props.FlightData.length}
                        />
                        <TableBody>
                            {stableSort(props.FlightData, getSorting(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            key={row.flight_id}
                                        >
                                            <TableCell component="th" id={labelId} scope="row"  >
                                                {row.airline_id}
                                            </TableCell>

                                            <TableCell align="left">{row.flight_id}</TableCell>
                                            <TableCell align="left">
                                                <Moment format="DD/MM/YYYY - HH:mm">
                                                    {row.departureTime}
                                                </Moment>
                                            </TableCell>
                                            <TableCell align="left">
                                                <Moment format="DD/MM/YYYY - HH:mm">
                                                    {row.arrivalTime}
                                                </Moment></TableCell>
                                            <TableCell align="left">{row.duration}</TableCell>
                                            <TableCell align="left">{row.noOfStops}</TableCell>
                                            <TableCell align="left">{row.price}</TableCell>

                                            <TableCell align="left">

                                                <ButtonToolbar>

                                                    <Button variant="success" onClick={(e)=>{console.log(row.flight_id)}}>Book</Button>

                                                </ButtonToolbar>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}

                        </TableBody>
                    </Table>
                </div>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={props.FlightData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                        'aria-label': 'previous page',
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'next page',
                    }}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    );
}

