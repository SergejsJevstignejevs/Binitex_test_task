interface SelectedChartFiltersAction {
    type: string,
    payload: string
}

// Action creators
export const setSelectedChartCountry = (selectedChartCountry: string): SelectedChartFiltersAction => ({
    type: "SET_CHART_SELECTED_COUNTRY",
    payload: selectedChartCountry
});

export const resetSelectedFiltersReducer = (): SelectedChartFiltersAction => ({
    type: "RESET_SELECTED_CHART_FILTERS_REDUCER",
    payload: ""
});

//State definition
export interface SelectedChartFiltersState {
    selectedChartCountry: string
};

const initialState: SelectedChartFiltersState = {
    selectedChartCountry: "All Countries"
};

export function selectedChartFiltersReducer(
    state: SelectedChartFiltersState = initialState, 
    action: SelectedChartFiltersAction) 
{
    switch (action.type) {
        case "SET_CHART_SELECTED_COUNTRY":{
            return { ...state, selectedChartCountry: action.payload };
        }
        case "RESET_SELECTED_CHART_FILTERS_REDUCER":{
            return initialState;
        }
        default:{
            return state;
        }
    }
}
