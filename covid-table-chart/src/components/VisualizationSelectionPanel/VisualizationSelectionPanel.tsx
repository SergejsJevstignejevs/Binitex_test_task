import { useDispatch, useSelector } from "react-redux/es/exports";

import "./VisualizationSelectionPanel.css";

import { 
    VisualizationChoiseState,
    setVisualizationChoise
} from "./dataVisualizationChoiseReducer";

import { RootReducerState } from "../../redux/reducerStore";

const VisualizationSelectionPanel: React.FC = () => {
    const {
        visualizationChoise
    } = useSelector<RootReducerState, VisualizationChoiseState>((state) => state.dataVisualizationChoiseReducer);
    const dispatch = useDispatch();

    const handleChoiseChange = (event: React.MouseEvent<HTMLLIElement>): void => {
        const selectedChoise: string = event.currentTarget.getAttribute('value') as string;
        dispatch(setVisualizationChoise(selectedChoise));
    }

    const listItems = [
        {
            value: "table" 
        },
        {
            value: "chart"
        }
    ];

    return (
        <div className="VisualizationSelectionPanel">
            <ul className="ChoiseList">
                {listItems.map((element, index) => {
                    return (
                        <li 
                            key={index}
                            className={`ChoiseItem ${visualizationChoise !== element.value ? "NonSelected" : "Selected"}`}
                            value={element.value}
                            onClick={(e) => handleChoiseChange(e)}>
                                {element.value.charAt(0).toUpperCase() + element.value.slice(1)}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default VisualizationSelectionPanel;