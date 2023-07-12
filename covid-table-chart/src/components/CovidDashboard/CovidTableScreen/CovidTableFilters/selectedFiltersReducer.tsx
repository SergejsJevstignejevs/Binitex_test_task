interface SelectedFiltersAction {
    type: string,
    payload: string
}

// Action creators
export const setSelectedCountry = (selectedCountry: string): SelectedFiltersAction => ({
    type: "SET_SELECTED_COUNTRY",
    payload: selectedCountry
});

export const setSelectedColumnField = (selectedColumnField: string): SelectedFiltersAction => ({
    type: "SET_SELECTED_COLUMN_FIELD",
    payload: selectedColumnField
});

export const setColumnFromValue = (selectedColumnFromValue: string): SelectedFiltersAction => ({
    type: "SET_SELECTED_COLUMN_FIELD_FROM_VALUE",
    payload: selectedColumnFromValue
});

export const setColumnToValue = (selectedColumnToValue: string): SelectedFiltersAction => ({
    type: "SET_SELECTED_COLUMN_FIELD_TO_VALUE",
    payload: selectedColumnToValue
});

export const resetSelectedFiltersReducer = (): SelectedFiltersAction => ({
    type: "RESET_SELECTED_FILTERS_REDUCER",
    payload: ""
});

//State definition
export interface SelectedFiltersState {
    selectedCountry: string,
    selectedColumnField: string,
    selectedColumnFromValue: string,
    selectedColumnToValue: string
};

const initialState: SelectedFiltersState = {
    selectedCountry: "",
    selectedColumnField: "",
    selectedColumnFromValue: "",
    selectedColumnToValue: ""
};

export function selectedFiltersReducer(
    state: SelectedFiltersState = initialState, 
    action: SelectedFiltersAction) 
{
    switch (action.type) {
        case "SET_SELECTED_COUNTRY":{
            return { ...state, selectedCountry: action.payload };
        }
        case "SET_SELECTED_COLUMN_FIELD":{
            return { ...state, selectedColumnField: action.payload };
        }
        case "SET_SELECTED_COLUMN_FIELD_FROM_VALUE":{
            return { ...state, selectedColumnFromValue: action.payload };
        }
        case "SET_SELECTED_COLUMN_FIELD_TO_VALUE":{
            return { ...state, selectedColumnToValue: action.payload };
        }
        case "RESET_SELECTED_FILTERS_REDUCER":{
            return initialState;
        }
        default:{
            return state;
        }
    }
}
