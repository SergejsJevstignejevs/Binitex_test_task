import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import DataGrid from 'react-data-grid';
import 'react-data-grid/lib/styles.css';

import "./CovidTable.css";

import { RootReducerState } from "../../../../redux/reducerStore";
import { 
    TableDataState,
    setCurrentTablePageData,
    setCurrentTableFilteredData
} from "./tableDataReducer";
import { PageSelectionState } from "../CovidTablePageSelectionPanel/pageSelectionReducer";
import { SelectedFiltersState } from "../CovidTableFilters/selectedFiltersReducer";
import { DateState } from "../../../DatePickerPanel/dateReducer";
import { useCovid19ServiceDI } from "../../../../contexts/Covid19ServiceProvider";

export const columns = [
    { key: 'country', name: 'Country', minWidth: 100 },
    { key: 'amountOfCases', name: 'Amount of cases', minWidth: 100 },
    { key: 'amountOfDeaths', name: 'Amount of deaths', minWidth: 100 },
    { key: 'totalAmountOfCases', name: 'Total amount of cases', minWidth: 100 },
    { key: 'totalAmountOfDeaths', name: 'Total amount of deaths', minWidth: 100 },
    { key: 'amountOfCasesPer1000', name: 'Amount of cases per 1000 person', minWidth: 100 },
    { key: 'amountOfDeathsPer1000', name: 'Amount of deaths per 1000 person', minWidth: 100 }
];

const CovidTable: React.FC = () => {
    const { 
        currentTablePageData,
        currentTableFilteredData
    } = useSelector<RootReducerState, TableDataState>((state) => state.tableDataReducer);
    const { 
        currentPageNumber,
        currentPageRowCount
    } = useSelector<RootReducerState, PageSelectionState>((state) => state.pageSelectionReducer);
    const {
        selectedCountry,
        selectedColumnField,
        selectedColumnFromValue,
        selectedColumnToValue
    } = useSelector<RootReducerState, SelectedFiltersState>((state) => state.selectedFiltersReducer);
    const {
        apiDataByCountriesFilteredByDate
    } = useSelector<RootReducerState, DateState>((state) => state.dateReducer);
    const dispatch = useDispatch();
    const { 
        getDataByTablePageNumber,
        filterBySelectedCountry,
        filterBySelectedColumnValues,
        toTableData
    } = useCovid19ServiceDI();

    const rows = currentTablePageData.map(element => {
        return {
            country: element.country, 
            amountOfCases: element.amountOfCases,
            amountOfDeaths: element.amountOfDeaths,
            totalAmountOfCases: element.totalAmountOfCases,
            totalAmountOfDeaths: element.totalAmountOfDeaths,
            amountOfCasesPer1000: element.amountOfCasesPer1000,
            amountOfDeathsPer1000: element.amountOfDeathsPer1000
        }
    });

    useEffect(() => {

        const fetchData = async () => {
            const tableData = 
                apiDataByCountriesFilteredByDate !== null ? 
                    await toTableData(apiDataByCountriesFilteredByDate): 
                    await toTableData({});

            const filteredData = filterBySelectedColumnValues(
                filterBySelectedCountry(tableData, selectedCountry),
                selectedColumnField,
                selectedColumnFromValue,
                selectedColumnToValue
            );

            dispatch(setCurrentTableFilteredData(filteredData));
        };
        
        fetchData();
        
    }, [apiDataByCountriesFilteredByDate, 
        selectedCountry, 
        selectedColumnField,
        selectedColumnFromValue,
        selectedColumnToValue]);

    useEffect(() => {
        
        getDataByTablePageNumber(
            currentTableFilteredData, 
            currentPageNumber, 
            currentPageRowCount
        ).then(data => {
            dispatch(setCurrentTablePageData(data));
        });

    }, [currentTableFilteredData, currentPageNumber, currentPageRowCount]);
    
    return (
        <>
            <DataGrid
                style={{width: '100%'}}
                columns={columns}
                rows={rows}
                headerRowHeight={78}
                rowHeight={30}
            />
            {rows.length === 0 && <p className="NothingIsFound">Nothing is found!</p>}
        </>
    );
}

export default CovidTable;