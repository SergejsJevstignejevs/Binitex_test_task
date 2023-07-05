interface DataVisualisationChoiseAction {
    type: string,
    payload: string
}

// Action creators
export const setVisualizationChoise = (visualizationChoise: string): DataVisualisationChoiseAction => ({
    type: "SET_VISUALIZATION_CHOISE",
    payload: visualizationChoise,
});

//State definition
export interface VisualizationChoiseState {
    visualizationChoise: string
};

const initialState = {
    visualizationChoise: "table",
};

export function dataVisualizationChoiseReducer(
    state: VisualizationChoiseState = initialState, 
    action: DataVisualisationChoiseAction) 
{
    switch (action.type) {
        case "SET_VISUALIZATION_CHOISE":{
            return { ...state, visualizationChoise: action.payload };
        }
        default:{
            return state;
        }
    }
}
