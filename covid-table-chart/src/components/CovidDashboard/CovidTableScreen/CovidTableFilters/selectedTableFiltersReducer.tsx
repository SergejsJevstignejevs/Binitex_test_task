interface SelectedTableFiltersAction {
    type: string,
    payload: string
}

// Action creators
export const setSelectedTableCountry = (selectedTableCountry: string): SelectedTableFiltersAction => ({
    type: "SET_SELECTED_TABLE_COUNTRY",
    payload: selectedTableCountry
});

export const setSelectedTableColumnField = (selectedTableColumnField: string): SelectedTableFiltersAction => ({
    type: "SET_SELECTED_TABLE_COLUMN_FIELD",
    payload: selectedTableColumnField
});

export const setSelectedTableColumnFromValue = (selectedTableColumnFromValue: string): SelectedTableFiltersAction => ({
    type: "SET_SELECTED_TABLE_COLUMN_FIELD_FROM_VALUE",
    payload: selectedTableColumnFromValue
});

export const setSelectedTableColumnToValue = (selectedTableColumnToValue: string): SelectedTableFiltersAction => ({
    type: "SET_SELECTED_TABLE_COLUMN_FIELD_TO_VALUE",
    payload: selectedTableColumnToValue
});

export const resetSelectedFiltersReducer = (): SelectedTableFiltersAction => ({
    type: "RESET_SELECTED_FILTERS_REDUCER",
    payload: ""
});

//State definition
export interface SelectedTableFiltersState {
    selectedTableCountry: string,
    selectedTableColumnField: string,
    selectedTableColumnFromValue: string,
    selectedTableColumnToValue: string
};

const initialState: SelectedTableFiltersState = {
    selectedTableCountry: "",
    selectedTableColumnField: "",
    selectedTableColumnFromValue: "",
    selectedTableColumnToValue: ""
};

export function selectedTableFiltersReducer(
    state: SelectedTableFiltersState = initialState, 
    action: SelectedTableFiltersAction) 
{
    switch (action.type) {
        case "SET_SELECTED_TABLE_COUNTRY":{
            return { ...state, selectedTableCountry: action.payload };
        }
        case "SET_SELECTED_TABLE_COLUMN_FIELD":{
            return { ...state, selectedTableColumnField: action.payload };
        }
        case "SET_SELECTED_TABLE_COLUMN_FIELD_FROM_VALUE":{
            return { ...state, selectedTableColumnFromValue: action.payload };
        }
        case "SET_SELECTED_TABLE_COLUMN_FIELD_TO_VALUE":{
            return { ...state, selectedTableColumnToValue: action.payload };
        }
        case "RESET_SELECTED_FILTERS_REDUCER":{
            return initialState;
        }
        default:{
            return state;
        }
    }
}
