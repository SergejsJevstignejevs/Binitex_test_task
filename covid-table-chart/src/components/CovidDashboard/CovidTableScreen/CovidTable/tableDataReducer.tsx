export interface TableCovidDataRepresentation {
    country: string,
    amountOfCases: number,
    amountOfDeaths: number,
    totalAmountOfCases: number,
    totalAmountOfDeaths: number,
    amountOfCasesPer1000: number,
    amountOfDeathsPer1000: number
}

interface TableDataAction {
    type: string,
    payload: Array<TableCovidDataRepresentation>
}

// Action creators
export const setCurrentTablePageData = (currentTablePageData: Array<TableCovidDataRepresentation>): TableDataAction => ({
    type: "SET_CURRENT_TABLE_PAGE_DATA",
    payload: currentTablePageData,
});

export const setCurrentTableFilteredData = (currentTableFilteredData: Array<TableCovidDataRepresentation>): TableDataAction => ({
    type: "SET_CURRENT_TABLE_FILTERED_DATA",
    payload: currentTableFilteredData,
});

export const setFullTableDataFilteredByDate = (fullTableDataFilteredByDate: Array<TableCovidDataRepresentation>): TableDataAction => ({
    type: "SET_FULL_TABLE_DATA_FILTERED_BY_DATE",
    payload: fullTableDataFilteredByDate,
});

export const resetTableDataReducer = (): TableDataAction => ({
    type: "RESET_TABLE_DATA_REDUCER",
    payload: [],
});

//State definition
export interface TableDataState {
    currentTablePageData: Array<TableCovidDataRepresentation>,
    currentTableFilteredData: Array<TableCovidDataRepresentation>,
    fullTableDataFilteredByDate: Array<TableCovidDataRepresentation>
};

const initialState = {
    currentTablePageData: new Array<TableCovidDataRepresentation>(),
    currentTableFilteredData: new Array<TableCovidDataRepresentation>(),
    fullTableDataFilteredByDate: new Array<TableCovidDataRepresentation>(),
};

export function tableDataReducer(state: TableDataState = initialState, action: TableDataAction) {
    switch (action.type) {
        case "SET_CURRENT_TABLE_PAGE_DATA":{
            return { ...state, currentTablePageData: [...action.payload] };
        }
        case "SET_CURRENT_TABLE_FILTERED_DATA":{
            return { ...state, currentTableFilteredData: [...action.payload] };
        }
        case "SET_FULL_TABLE_DATA_FILTERED_BY_DATE":{
            return { ...state, fullTableDataFilteredByDate: [...action.payload] };
        }
        case "RESET_TABLE_DATA_REDUCER":{
            return initialState;
        }
        default:{
            return state;
        }
    }
}
