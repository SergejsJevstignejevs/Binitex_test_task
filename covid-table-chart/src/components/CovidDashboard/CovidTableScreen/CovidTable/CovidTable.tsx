import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import useCovid19Service from "../../../../hooks/covid19Service.hook";

import DataGrid from 'react-data-grid';
import 'react-data-grid/lib/styles.css';

import "./CovidTable.css";

import { RootReducerState } from "../../../../store";
import { 
    TableDataState,
    setTableData
} from "./tableDataReducer";

const columns = [
    { key: 'country', name: 'Country', minWidth: 100 },
    { key: 'amountOfCases', name: 'Amount of cases', minWidth: 100 },
    { key: 'amountOfDeaths', name: 'Amount of deaths', minWidth: 100 },
    { key: 'totalAmountOfCases', name: 'Total amount of cases', minWidth: 100 },
    { key: 'totalAmountOfDeaths', name: 'Total amount of deaths', minWidth: 100 },
    { key: 'amountOfCasesPer1000', name: 'Amount of cases per 1000 person', minWidth: 100 },
    { key: 'amountOfDeathsPer1000', name: 'Amount of deaths per 1000 person', minWidth: 100 }
];

const CovidTable: React.FC = () => {
    const tableDataReducer = useSelector<RootReducerState, TableDataState>((state) => state.tableDataReducer);
    const tableData = tableDataReducer.tableData;
    const dispatch = useDispatch();
    const { getDataByAmount, getCountriesDataSeparately } = useCovid19Service();

    const rows = tableData.map(element => {
        return {
            country: element.countriesAndTerritories, 
            amountOfCases: element.cases,
            amountOfDeaths: element.deaths,
            totalAmountOfCases: "?",
            totalAmountOfDeaths: "?",
            amountOfCasesPer1000: "?",
            amountOfDeathsPer1000: "?"
        }
    });

    useEffect(() => {

        getDataByAmount(9).then(result => {
            dispatch(setTableData(result));
        });

    }, []);

    
    return (
        <DataGrid
            style={{width: '100%'}}
            columns={columns}
            rows={rows}
            headerRowHeight={78}
            rowHeight={30}
            onCellClick={() => console.log(getCountriesDataSeparately())}
        />
    );
}

export default CovidTable;