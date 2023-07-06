import { useLayoutEffect } from "react";

import DataGrid from 'react-data-grid';
import 'react-data-grid/lib/styles.css';

import "./CovidTable.css";

const columns = [
    { key: 'country', name: 'Country', minWidth: 100 },
    { key: 'amountOfCases', name: 'Amount of cases', minWidth: 100 },
    { key: 'amountOfDeaths', name: 'Amount of deaths', minWidth: 100 },
    { key: 'totalAmountOfCases', name: 'Total amount of cases', minWidth: 100 },
    { key: 'totalAmountOfDeaths', name: 'Total amount of deaths', minWidth: 100 },
    { key: 'amountOfCasesPer1000', name: 'Amount of cases per 1000 person', minWidth: 100 },
    { key: 'amountOfDeathsPer1000', name: 'Amount of deaths per 1000 person', minWidth: 100 }
];

const rows = [
    { 
        country: "Latvia", 
        amountOfCases: "100",
        amountOfDeaths: "3",
        totalAmountOfCases: "10000",
        totalAmountOfDeaths: "330",
        amountOfCasesPer1000: "100",
        amountOfDeathsPer1000: "33"
    }
];

const CovidTable: React.FC = () => {
    return (
        <DataGrid
            style={{width: '100%'}}
            columns={columns}
            rows={rows}
            headerRowHeight={75}
        />
    );
}

export default CovidTable;