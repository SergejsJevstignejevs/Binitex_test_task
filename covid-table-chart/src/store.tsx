import { createStore, combineReducers } from "redux";

import { dateReducer } from "./components/DatePickerPanel/dateReducer";
import { dataVisualizationChoiseReducer } from "./components/VisualizationSelectionPanel/dataVisualizationChoiseReducer";

import { DateState } from "./components/DatePickerPanel/dateReducer";
import { VisualizationChoiseState } from "./components/VisualizationSelectionPanel/dataVisualizationChoiseReducer";

export interface RootReducerState {
    dateReducer: DateState;
    dataVisualizationChoiseReducer: VisualizationChoiseState;
}

const rootReducer = combineReducers({
    dateReducer,
    dataVisualizationChoiseReducer
});

export const store = createStore(rootReducer);