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

//State definition
export interface TableDataState {
    currentTablePageData: Array<TableCovidDataRepresentation>,
    currentTableFilteredData: Array<TableCovidDataRepresentation>
};

const initialState = {
    currentTablePageData: new Array<TableCovidDataRepresentation>(),
    currentTableFilteredData: new Array<TableCovidDataRepresentation>()
};

export function tableDataReducer(state: TableDataState = initialState, action: TableDataAction) {
    switch (action.type) {
        case "SET_CURRENT_TABLE_PAGE_DATA":{
            return { ...state, currentTablePageData: [...action.payload] };
        }
        case "SET_CURRENT_TABLE_FILTERED_DATA":{
            return { ...state, currentTableFilteredData: [...action.payload] };
        }
        default:{
            return state;
        }
    }
}
