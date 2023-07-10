import { createStore, combineReducers } from "redux";

import { dateReducer } from "../components/DatePickerPanel/dateReducer";
import { dataVisualizationChoiseReducer } from "../components/VisualizationSelectionPanel/dataVisualizationChoiseReducer";
import { tableDataReducer } from "../components/CovidDashboard/CovidTableScreen/CovidTable/tableDataReducer";
import { pageSelectionReducer } from "../components/CovidDashboard/CovidTableScreen/CovidTablePageSelectionPanel/pageSelectionReducer";
import { apiDataByCountriesReducer } from "../hooks/apiDataByCountriesReducer";
import { selectedFiltersReducer } from "../components/CovidDashboard/CovidTableScreen/CovidTableFilters/selectedFiltersReducer";

import { DateState } from "../components/DatePickerPanel/dateReducer";
import { VisualizationChoiseState } from "../components/VisualizationSelectionPanel/dataVisualizationChoiseReducer";
import { TableDataState } from "../components/CovidDashboard/CovidTableScreen/CovidTable/tableDataReducer";
import { PageSelectionState } from "../components/CovidDashboard/CovidTableScreen/CovidTablePageSelectionPanel/pageSelectionReducer";
import { APIDataByCountriesState } from "../hooks/apiDataByCountriesReducer";
import { SelectedFiltersState } from "../components/CovidDashboard/CovidTableScreen/CovidTableFilters/selectedFiltersReducer";

export interface RootReducerState {
    dateReducer: DateState,
    dataVisualizationChoiseReducer: VisualizationChoiseState,
    tableDataReducer: TableDataState,
    pageSelectionReducer: PageSelectionState,
    apiDataByCountriesReducer: APIDataByCountriesState,
    selectedFiltersReducer: SelectedFiltersState
}

const rootReducer = combineReducers({
    dateReducer,
    dataVisualizationChoiseReducer,
    tableDataReducer,
    pageSelectionReducer,
    apiDataByCountriesReducer,
    selectedFiltersReducer
});

export const reducerStore = createStore(rootReducer);