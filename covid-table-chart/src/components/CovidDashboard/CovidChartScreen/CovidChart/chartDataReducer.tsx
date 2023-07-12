export interface ChartCovidDataRepresentation {
    [country: string]:{
        labels: string[], 
        datasets: {
            label: string;
            data: number[];
            backgroundColor: string;
            borderColor: string;
        }[]
    }
}

interface ChartDataAction {
    type: string,
    payload: ChartCovidDataRepresentation
}

// Action creators
export const setCurrentChartFilteredData = (currentChartFilteredData: ChartCovidDataRepresentation): ChartDataAction => ({
    type: "SET_CURRENT_CHART_FILTERED_DATA",
    payload: currentChartFilteredData,
});

//State definition
export interface ChartDataState {
    currentChartFilteredData: ChartCovidDataRepresentation | null
};

const initialState = {
    currentChartFilteredData: null
};

export function chartDataReducer(state: ChartDataState = initialState, action: ChartDataAction) {
    switch (action.type) {
        case "SET_CURRENT_CHART_FILTERED_DATA":{
            return { ...state, currentChartFilteredData: action.payload };
        }
        default:{
            return state;
        }
    }
}
