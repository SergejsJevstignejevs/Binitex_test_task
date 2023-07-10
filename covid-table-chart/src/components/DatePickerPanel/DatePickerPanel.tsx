import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";

import DatePicker from "react-datepicker";

import "./DatePickerPanel.css";
import "react-datepicker/dist/react-datepicker.css";

import { 
    DateState,
    setStartDate,
    setEndDate,
    setMinDate,
    setMaxDate
} from "./dateReducer";

import { setFullTableDataFilteredByDate } from "../CovidDashboard/CovidTableScreen/CovidTable/tableDataReducer";

import { RootReducerState } from "../../redux/reducerStore";
import { ClearFiltersState } from "../CovidDashboard/CovidTableScreen/CovidTableFilters/CovidCountryFilter/clearFiltersReducer";
import { useCovid19ServiceDI } from "../../contexts/Covid19ServiceProvider";
import { APIDataByCountriesState } from "../../hooks/apiDataByCountriesReducer";

const DatePickerPanel: React.FC = () => {
    const {
        minDate,
        maxDate,
        startDate,
        endDate
    } = useSelector<RootReducerState, DateState>((state) => state.dateReducer);
    const {
        apiDataByCountries
    } = useSelector<RootReducerState, APIDataByCountriesState>((state) => state.apiDataByCountriesReducer);
    const {
        clearFiltersToggle
    } = useSelector<RootReducerState, ClearFiltersState>((state) => state.clearFiltersReducer);
    const { 
        getMinMaxDates,
        filterAPIDataByDate
    } = useCovid19ServiceDI();
    const dispatch = useDispatch();

    useEffect(() => {

        getMinMaxDates().then((result) => {
            const { minDate, maxDate } = result;

            if (minDate && maxDate) {
                dispatch(setStartDate(minDate));
                dispatch(setEndDate(maxDate));
                dispatch(setMinDate(minDate));
                dispatch(setMaxDate(maxDate));
            }
        });
    
    }, [clearFiltersToggle]);

    useEffect(() => {

        filterAPIDataByDate(apiDataByCountries, startDate, endDate)
            .then((result) => {
            dispatch(setFullTableDataFilteredByDate(result));
        });

    }, [startDate, endDate]);

    return (
        <div className="DatePickerPanel">
            <p>Period from</p>
            <DatePicker 
                showIcon
                minDate={minDate}
                maxDate={maxDate}
                selected={startDate} 
                onChange={(date: Date) => dispatch(setStartDate(date))}
            />
            <p>to</p>
            <DatePicker
                showIcon
                minDate={minDate}
                maxDate={maxDate}
                selected={endDate} 
                onChange={(date: Date) => dispatch(setEndDate(date))}
            />
        </div>
    );
}

export default DatePickerPanel;