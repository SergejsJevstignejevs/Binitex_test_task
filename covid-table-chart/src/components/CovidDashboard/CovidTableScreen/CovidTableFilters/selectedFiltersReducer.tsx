interface SelectedFiltersAction {
    type: string,
    payload: string | number
}

// Action creators
export const setInputCountryValue = (inputCountryValue: string): SelectedFiltersAction => ({
    type: "SET_INPUT_COUNTRY_VALUE",
    payload: inputCountryValue,
});

export const setSelectedCountry = (selectedCountry: string): SelectedFiltersAction => ({
    type: "SET_SELECTED_COUNTRY",
    payload: selectedCountry,
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
        default:{
            return state;
        }
    }
}
