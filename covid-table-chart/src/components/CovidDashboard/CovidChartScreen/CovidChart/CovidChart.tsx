import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Line } from "react-chartjs-2";
import 'chart.js/auto';

import "./CovidChart.css";
import { RootReducerState } from "../../../../redux/reducerStore";
import { DateState } from "../../../DatePickerPanel/dateReducer";
import { useCovid19ServiceDI } from "../../../../contexts/Covid19ServiceProvider";
import { 
    ChartDataState, 
    setCurrentChartFilteredData 
} from "./chartDataReducer";

const CovidChart: React.FC = () => {
    const {
        apiDataByCountriesFilteredByDate
    } = useSelector<RootReducerState, DateState>((state) => state.dateReducer);
    const {
        currentChartFilteredData
    } = useSelector<RootReducerState, ChartDataState>((state) => state.chartDataReducer);
    const dispatch = useDispatch();
    const {
        toChartData
    } = useCovid19ServiceDI();

    useEffect(() => {

        if (apiDataByCountriesFilteredByDate !== null) {
            dispatch(setCurrentChartFilteredData(toChartData(apiDataByCountriesFilteredByDate)));
        }
        
    }, [apiDataByCountriesFilteredByDate])

    return (
        <div className="CovidChart">
            <Line data={currentChartFilteredData?.France || { labels: [], datasets: [] }}/>
        </div>
    );
}

export default CovidChart;