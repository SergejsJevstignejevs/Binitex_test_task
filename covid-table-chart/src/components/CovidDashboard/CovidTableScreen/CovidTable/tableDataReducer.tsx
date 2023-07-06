export interface Covid19APIData{
    "Cumulative_number_for_14_days_of_COVID-19_cases_per_100000": string,
    cases: number,
    continentExp: string,
    countriesAndTerritories: string,
    countryterritoryCode: string,
    dateRep: string,
    day: string,
    deaths: number,
    geoId: string,
    month: string,
    popData2019: number,
    year: string
}

interface TableDataAction {
    type: string,
    payload: Array<Covid19APIData>
}

// Action creators
export const setTableData = (tableData: Array<Covid19APIData>): TableDataAction => ({
    type: "SET_TABLE_DATA",
    payload: tableData,
});

//State definition
export interface TableDataState {
    tableData: Array<Covid19APIData>
};

const initialState = {
    tableData: new Array<Covid19APIData>()
};

export function tableDataReducer(state: TableDataState = initialState, action: TableDataAction) {
    switch (action.type) {
        case "SET_TABLE_DATA":{
            console.log(action.payload);
            return { ...state, tableData: [...action.payload] };
        }
        default:{
            return state;
        }
    }
}
