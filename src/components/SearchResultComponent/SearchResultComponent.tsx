import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {useEffect, useMemo, useState} from "react";
import dataService from "../../services/DataService";
import "./SearchResultComponent.css";
import {DataServiceItem} from "../../models/models";

const renderTable = (columns: string[], cellData: any[]) => (
    <Table size="small">
        <TableHead>
            <TableRow>
                {columns.map((column, index) => (
                    <TableCell key={index} className="small-table-header">{column}</TableCell>
                ))}
            </TableRow>
        </TableHead>
        <TableBody>
            <TableRow>
                {cellData.map((data, index) => (
                    <TableCell key={index} component="th" scope="row" className="small-table-col">{data}</TableCell>
                ))}
            </TableRow>
        </TableBody>
    </Table>
);

function Row({row, isMobile}) {
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <TableRow sx={{'& > *': {borderBottom: 'unset'}}}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.account}
                </TableCell>
                <TableCell align="right">{row?.operation}</TableCell>
                <TableCell align="right">{row?.symbol}</TableCell>
                {!isMobile && (
                    <>
                        <TableCell align="right">{row?.description}</TableCell>
                        <TableCell align="right">{row?.quantity}</TableCell>
                        <TableCell align="right">{row?.filledQuantity}</TableCell>
                        <TableCell align="right">{row?.price}</TableCell>
                    </>
                )}
                <TableCell align="right">{row?.status}</TableCell>
                {!isMobile && row?.date && row?.expireDate && (
                    <>
                        <TableCell align="right">{row?.date.format("DD/MM/YYYY")}</TableCell>
                        <TableCell align="right">{row?.expireDate.format("DD/MM/YYYY")}</TableCell>
                        <TableCell align="right">{row?.refNumber}</TableCell>
                        <TableCell align="right">{row?.extRefNumber}</TableCell>
                    </>
                )}
            </TableRow>
            <TableRow>
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={14}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{margin: 1}}>
                            <div style={{display: "flex", paddingTop: 0}}>
                                <Typography variant="h6" gutterBottom component="div">
                                    Order Details
                                </Typography>
                            </div>
                            {renderTable(
                                ["Net Amount", "Price", "Exchange Rate", "Q/S Limit"],
                                [row.amount, row.price, row.exchangeRate, row.limit]
                            )}
                            {renderTable(
                                ["Reference Number", "Date / Time", "Telephone", "User ID"],
                                [row.refNumber, row.date.format("DD/MM/YYYY"), row.phoneNumber, row.userId]
                            )}
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

let headers = [
    null,
    "Account",
    "Operation",
    "Symbol",
    "Description",
    "Qty",
    "Filled Qty",
    "Price",
    "Status",
    "Date",
    "Expiration",
    "No. Ref.",
    "Ext. Ref."
];

export default function SearchResultComponent() {
    const MOBILE_SIZE = 768;
    const MOBILE_HEADERS = [null, 'Account', 'Operation', 'Symbol', 'Status'];
    const [rows, setRows] = useState<DataServiceItem[] | null>(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= MOBILE_SIZE);

    useEffect(() => {
        const subscription = dataService.searchSubject$.subscribe((data: DataServiceItem[]) => {
            setRows(data);
        });

        return () => {
            if (subscription) {
                subscription.unsubscribe();
            }
        };
    }, []);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= MOBILE_SIZE);

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    const formattedHeaders = useMemo(() => {
        return isMobile
            ? headers.filter(header => MOBILE_HEADERS.includes(header))
            : headers;
    }, [isMobile, headers]);

    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        {formattedHeaders.map((header, index) => (
                            <TableCell key={index} align="center" className="fw-bold">
                                {header}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows?.map((row) => (
                        <Row key={row.account} row={row} isMobile={isMobile}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
