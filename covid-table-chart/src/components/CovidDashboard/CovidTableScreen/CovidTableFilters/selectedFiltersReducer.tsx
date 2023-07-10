interface SelectedFiltersAction {
    type: string,
    payload: string | number
}

// Action creators
export const setInputCountryValue = (inputCountryValue: string): SelectedFiltersAction => ({
    type: "SET_INPUT_COUNTRY_VALUE",
    payload: inputCountryValue
});

export const setSelectedCountry = (selectedCountry: string): SelectedFiltersAction => ({
    type: "SET_SELECTED_COUNTRY",
    payload: selectedCountry
});

export const resetSelectedFiltersReducer = (): SelectedFiltersAction => ({
    type: "RESET_SELECTED_FILTERS_REDUCER",
    payload: ""
});

//State definition
export interface SelectedFiltersState {
    inputCountryValue: string,
    selectedCountry: string
};

const initialState: SelectedFiltersState = {
    inputCountryValue: "",
    selectedCountry: ""
};

export function selectedFiltersReducer(
    state: SelectedFiltersState = initialState, 
    action: SelectedFiltersAction) 
{
    switch (action.type) {
        case "SET_INPUT_COUNTRY_VALUE":{
            return { ...state, inputCountryValue: action.payload };
        }
        case "SET_SELECTED_COUNTRY":{
            return { ...state, selectedCountry: action.payload };
        }
        case "RESET_SELECTED_FILTERS_REDUCER":{
            return initialState;
        }
        default:{
            return state;
        }
    }
}
