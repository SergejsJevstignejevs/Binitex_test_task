import { createStore, combineReducers } from "redux";

import { dateReducer } from "../components/DatePickerPanel/dateReducer";
import { dataVisualizationChoiseReducer } from "../components/VisualizationSelectionPanel/dataVisualizationChoiseReducer";
import { tableDataReducer } from "../components/CovidDashboard/CovidTableScreen/CovidTable/tableDataReducer";
import { pageSelectionReducer } from "../components/CovidDashboard/CovidTableScreen/CovidTablePageSelectionPanel/pageSelectionReducer";
import { apiDataByCountriesReducer } from "../hooks/apiDataByCountriesReducer";
import { selectedTableFiltersReducer } from "../components/CovidDashboard/CovidTableScreen/CovidTableFilters/selectedTableFiltersReducer";
import { clearFiltersReducer } from "../components/CovidDashboard/CovidTableScreen/CovidTableFilters/ClearFiltersButton/clearFiltersReducer";
import { chartDataReducer } from "../components/CovidDashboard/CovidChartScreen/CovidChart/chartDataReducer";
import { selectedChartFiltersReducer } from "../components/CovidDashboard/CovidChartScreen/CovidChartFilters/selectedChartFiltersReducer";

import { DateState } from "../components/DatePickerPanel/dateReducer";
import { VisualizationChoiseState } from "../components/VisualizationSelectionPanel/dataVisualizationChoiseReducer";
import { TableDataState } from "../components/CovidDashboard/CovidTableScreen/CovidTable/tableDataReducer";
import { PageSelectionState } from "../components/CovidDashboard/CovidTableScreen/CovidTablePageSelectionPanel/pageSelectionReducer";
import { APIDataByCountriesState } from "../hooks/apiDataByCountriesReducer";
import { SelectedTableFiltersState } from "../components/CovidDashboard/CovidTableScreen/CovidTableFilters/selectedTableFiltersReducer";
import { ClearFiltersState } from "../components/CovidDashboard/CovidTableScreen/CovidTableFilters/ClearFiltersButton/clearFiltersReducer";
import { ChartDataState } from "../components/CovidDashboard/CovidChartScreen/CovidChart/chartDataReducer";
import { SelectedChartFiltersState } from "../components/CovidDashboard/CovidChartScreen/CovidChartFilters/selectedChartFiltersReducer";

export interface RootReducerState {
    dateReducer: DateState,
    dataVisualizationChoiseReducer: VisualizationChoiseState,
    tableDataReducer: TableDataState,
    pageSelectionReducer: PageSelectionState,
    apiDataByCountriesReducer: APIDataByCountriesState,
    selectedTableFiltersReducer: SelectedTableFiltersState,
    clearFiltersReducer: ClearFiltersState,
    chartDataReducer: ChartDataState
    selectedChartFiltersReducer: SelectedChartFiltersState
}

const rootReducer = combineReducers({
    dateReducer,
    dataVisualizationChoiseReducer,
    tableDataReducer,
    pageSelectionReducer,
    apiDataByCountriesReducer,
    selectedTableFiltersReducer,
    clearFiltersReducer,
    chartDataReducer,
    selectedChartFiltersReducer
});

export const reducerStore = createStore(rootReducer);