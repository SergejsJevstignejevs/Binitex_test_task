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
export const setTableData = (tableData: Array<TableCovidDataRepresentation>): TableDataAction => ({
    type: "SET_TABLE_DATA",
    payload: tableData,
});

//State definition
export interface TableDataState {
    tableData: Array<TableCovidDataRepresentation>
};

const initialState = {
    tableData: new Array<TableCovidDataRepresentation>()
};

export function tableDataReducer(state: TableDataState = initialState, action: TableDataAction) {
    switch (action.type) {
        case "SET_TABLE_DATA":{
            return { ...state, tableData: [...action.payload] };
        }
        default:{
            return state;
        }
    }
}
