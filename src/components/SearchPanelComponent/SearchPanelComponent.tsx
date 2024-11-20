import * as React from 'react';
import './SearchPanelComponent.css';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {Button, TextField} from "@mui/material";
import dataService from "../../services/DataService";
import {useFormik} from "formik";
import dayjs from "dayjs";
import SearchIcon from '@mui/icons-material/Search';
import BackspaceIcon from '@mui/icons-material/Backspace';
import {SearchFormData} from "../../models/models";

const initialFormData: SearchFormData = {
    period: "Transmission",
    status: "Waiting",
    from: null,
    to: null,
}

const SearchPanelComponent: React.FC = () => {
    const formik = useFormik({
        initialValues: initialFormData,
        onSubmit: (values: SearchFormData, _) => {
            dataService.search(values);
        }
    });

    const clear = () => {
        formik.resetForm(initialFormData);
        dataService.clear();
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <form id="search-form" onSubmit={formik.handleSubmit}>
                <TextField label="Period"
                           variant="outlined"
                           defaultValue="Transmission"
                           inputProps={{
                               readOnly: true
                           }}
                           name="period"
                />
                <TextField label="Status"
                           variant="outlined"
                           defaultValue="Waiting"
                           inputProps={{
                               readOnly: true
                           }}
                           name="status"
                />
                <DatePicker label="from"
                            name="from"
                            format="DD/MM/YYYY"
                            value={formik.values.from ? dayjs(formik.values.from.toDate()) : null}
                            onChange={date => formik.setFieldValue('from', date)}
                />
                <DatePicker label="to"
                            name="to"
                            format="DD/MM/YYYY"
                            value={formik.values.to ? dayjs(formik.values.to.toDate()) : null}
                            onChange={date => formik.setFieldValue('to', date)}
                />
                <Button id="search-button"
                        variant="contained"
                        type="submit"
                        startIcon={<SearchIcon/>}
                >
                    Search
                </Button>
                <Button id="search-button"
                        variant="contained"
                        startIcon={<BackspaceIcon/>}
                        onClick={clear}>
                    Clear
                </Button>
            </form>
        </LocalizationProvider>
    );
};

export default SearchPanelComponent;
