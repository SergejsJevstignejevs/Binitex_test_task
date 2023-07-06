import { useSelector } from "react-redux";

import CovidTableScreen from "./CovidTableScreen/CovidTableScreen";

import "./CovidDashboard.css";

import { RootReducerState } from "../../store";
import { VisualizationChoiseState } from "../VisualizationSelectionPanel/dataVisualizationChoiseReducer";

const CovidDashboard: React.FC = () => {
    const visualizationChoiseState = useSelector<RootReducerState, VisualizationChoiseState>((state) => state.dataVisualizationChoiseReducer);
    const visualizationChoise = visualizationChoiseState.visualizationChoise;

    return (
        <div className="CovidDashboard">
            {
                (() => {
                    switch (visualizationChoise) {
                        case "table":{
                            return <CovidTableScreen />;
                        }
                        case "chart":{
                            return null;
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