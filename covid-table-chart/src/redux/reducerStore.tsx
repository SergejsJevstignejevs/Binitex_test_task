import { createStore, combineReducers } from "redux";

import { dateReducer } from "../components/DatePickerPanel/dateReducer";
import { dataVisualizationChoiseReducer } from "../components/VisualizationSelectionPanel/dataVisualizationChoiseReducer";
import { tableDataReducer } from "../components/CovidDashboard/CovidTableScreen/CovidTable/tableDataReducer";
import { pageSelectionReducer } from "../components/CovidDashboard/CovidTableScreen/CovidTablePageSelectionPanel/pageSelectionReducer";
import { apiDataByCountriesReducer } from "../hooks/apiDataByCountriesReducer";
import { selectedFiltersReducer } from "../components/CovidDashboard/CovidTableScreen/CovidTableFilters/selectedFiltersReducer";
import { clearFiltersReducer } from "../components/CovidDashboard/CovidTableScreen/CovidTableFilters/ClearFiltersButton/clearFiltersReducer";
import { chartDataReducer } from "../components/CovidDashboard/CovidChartScreen/CovidChart/chartDataReducer";

import { DateState } from "../components/DatePickerPanel/dateReducer";
import { VisualizationChoiseState } from "../components/VisualizationSelectionPanel/dataVisualizationChoiseReducer";
import { TableDataState } from "../components/CovidDashboard/CovidTableScreen/CovidTable/tableDataReducer";
import { PageSelectionState } from "../components/CovidDashboard/CovidTableScreen/CovidTablePageSelectionPanel/pageSelectionReducer";
import { APIDataByCountriesState } from "../hooks/apiDataByCountriesReducer";
import { SelectedFiltersState } from "../components/CovidDashboard/CovidTableScreen/CovidTableFilters/selectedFiltersReducer";
import { ClearFiltersState } from "../components/CovidDashboard/CovidTableScreen/CovidTableFilters/ClearFiltersButton/clearFiltersReducer";
import { ChartDataState } from "../components/CovidDashboard/CovidChartScreen/CovidChart/chartDataReducer";

export interface RootReducerState {
    dateReducer: DateState,
    dataVisualizationChoiseReducer: VisualizationChoiseState,
    tableDataReducer: TableDataState,
    pageSelectionReducer: PageSelectionState,
    apiDataByCountriesReducer: APIDataByCountriesState,
    selectedFiltersReducer: SelectedFiltersState,
    clearFiltersReducer: ClearFiltersState,
    chartDataReducer: ChartDataState
}

const rootReducer = combineReducers({
    dateReducer,
    dataVisualizationChoiseReducer,
    tableDataReducer,
    pageSelectionReducer,
    apiDataByCountriesReducer,
    selectedFiltersReducer,
    clearFiltersReducer,
    chartDataReducer
});

export const reducerStore = createStore(rootReducer);