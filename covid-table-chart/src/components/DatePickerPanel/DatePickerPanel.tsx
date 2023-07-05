import { useDispatch, useSelector } from "react-redux/es/exports";

import DatePicker from "react-datepicker";

import "./DatePickerPanel.css";
import "react-datepicker/dist/react-datepicker.css";

import { 
    DateState,
    setStartDate,
    setEndDate
} from "./dateReducer";

import { RootReducerState } from "../../store";

function DatePickerPanel() {
    const dateState = useSelector<RootReducerState, DateState>((state) => state.dateReducer);
    const startDate = dateState.startDate;
    const endDate = dateState.endDate;
    const dispatch = useDispatch();

    return (
        <div className="DatePickerPanel">
            <p>Period from</p>
            <DatePicker 
                showIcon
                selected={startDate} 
                onChange={(date: Date) => dispatch(setStartDate(date))}
            />
            <p>to</p>
            <DatePicker
                showIcon
                selected={endDate} 
                onChange={(date: Date) => dispatch(setEndDate(date))}
            />
        </div>
    );
}

export default DatePickerPanel;