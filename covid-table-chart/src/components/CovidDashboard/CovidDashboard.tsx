import { useSelector } from "react-redux";

import CovidTableScreen from "./CovidTableScreen/CovidTableScreen";
import CovidChartScreen from "./CovidChartScreen/CovidChartScreen";

import "./CovidDashboard.css";

import { RootReducerState } from "../../redux/reducerStore";
import { VisualizationChoiseState } from "../VisualizationSelectionPanel/dataVisualizationChoiseReducer";

const CovidDashboard: React.FC = () => {
    const { 
        visualizationChoise 
    } = useSelector<RootReducerState, VisualizationChoiseState>((state) => state.dataVisualizationChoiseReducer);

    return (
        <div className="CovidDashboard">
            {
                (() => {
                    switch (visualizationChoise) {
                        case "table":{
                            return <CovidTableScreen />;
                        }
                        case "chart":{
                            return <CovidChartScreen/>;
                        }
                        default:
                            return null;
                    }
                })()
            }
        </div>
    );
}

export default CovidDashboard;