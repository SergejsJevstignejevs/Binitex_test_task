import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Line } from "react-chartjs-2";
import 'chart.js/auto';

import "./CovidChart.css";
import { RootReducerState } from "../../../../redux/reducerStore";
import { DateState } from "../../../DatePickerPanel/dateReducer";
import { useCovid19ServiceDI } from "../../../../contexts/Covid19ServiceProvider";
import { 
    ChartCovidDataRepresentation,
    ChartDataState, 
    setCurrentChartFilteredData 
} from "./chartDataReducer";
import { SelectedChartFiltersState } from "../CovidChartFilters/selectedChartFiltersReducer";

const CovidChart: React.FC = () => {
    const {
        apiDataByCountriesFilteredByDate
    } = useSelector<RootReducerState, DateState>((state) => state.dateReducer);
    const {
        currentChartFilteredData
    } = useSelector<RootReducerState, ChartDataState>((state) => state.chartDataReducer);
    const {
        selectedChartCountry
    } = useSelector<RootReducerState, SelectedChartFiltersState>((state) => state.selectedChartFiltersReducer);
    const dispatch = useDispatch();
    const {
        toChartData,
        chartAllCountriesData
    } = useCovid19ServiceDI();

    useEffect(() => {
        const filteredChartData: ChartCovidDataRepresentation = {
            [selectedChartCountry]: 
                toChartData(apiDataByCountriesFilteredByDate || {})[selectedChartCountry]
        };
        
        if (apiDataByCountriesFilteredByDate !== null) {
            
            if(selectedChartCountry === "All Countries"){
                dispatch(
                    setCurrentChartFilteredData(chartAllCountriesData(apiDataByCountriesFilteredByDate))
                );
            }
            else{
                console.log(toChartData(apiDataByCountriesFilteredByDate || {}));
                dispatch(
                    setCurrentChartFilteredData(filteredChartData)
                );
            }

        }

    }, [apiDataByCountriesFilteredByDate, selectedChartCountry])

    return (
        <div className="CovidChart">
            <Line 
                data={
                    currentChartFilteredData ? 
                    currentChartFilteredData[selectedChartCountry] || { labels: [], datasets: [] } : 
                    { labels: [], datasets: [] }}/>
        </div>
    );
}

export default CovidChart;