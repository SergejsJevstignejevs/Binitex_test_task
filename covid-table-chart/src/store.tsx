import { createStore, combineReducers } from "redux";

import { dateReducer } from "./components/DatePickerPanel/dateReducer";
import { dataVisualizationChoiseReducer } from "./components/VisualizationSelectionPanel/dataVisualizationChoiseReducer";
import { tableDataReducer } from "./components/CovidDashboard/CovidTableScreen/CovidTable/tableDataReducer";
import { pageSelectionReducer } from "./components/CovidDashboard/CovidTableScreen/CovidTablePageSelectionPanel/pageSelectionReducer";

import { DateState } from "./components/DatePickerPanel/dateReducer";
import { VisualizationChoiseState } from "./components/VisualizationSelectionPanel/dataVisualizationChoiseReducer";
import { TableDataState } from "./components/CovidDashboard/CovidTableScreen/CovidTable/tableDataReducer";
import { PageSelectionState } from "./components/CovidDashboard/CovidTableScreen/CovidTablePageSelectionPanel/pageSelectionReducer";

export interface RootReducerState {
    dateReducer: DateState,
    dataVisualizationChoiseReducer: VisualizationChoiseState,
    tableDataReducer: TableDataState,
    pageSelectionReducer: PageSelectionState
}

const rootReducer = combineReducers({
    dateReducer,
    dataVisualizationChoiseReducer,
    tableDataReducer,
    pageSelectionReducer
});

export const store = createStore(rootReducer);