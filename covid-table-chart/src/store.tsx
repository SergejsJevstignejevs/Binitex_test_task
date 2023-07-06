import { createStore, combineReducers } from "redux";

import { dateReducer } from "./components/DatePickerPanel/dateReducer";
import { dataVisualizationChoiseReducer } from "./components/VisualizationSelectionPanel/dataVisualizationChoiseReducer";
import { tableDataReducer } from "./components/CovidDashboard/CovidTableScreen/CovidTable/tableDataReducer";

import { DateState } from "./components/DatePickerPanel/dateReducer";
import { VisualizationChoiseState } from "./components/VisualizationSelectionPanel/dataVisualizationChoiseReducer";
import { TableDataState } from "./components/CovidDashboard/CovidTableScreen/CovidTable/tableDataReducer";

export interface RootReducerState {
    dateReducer: DateState,
    dataVisualizationChoiseReducer: VisualizationChoiseState,
    tableDataReducer: TableDataState
}

const rootReducer = combineReducers({
    dateReducer,
    dataVisualizationChoiseReducer,
    tableDataReducer
});

export const store = createStore(rootReducer);