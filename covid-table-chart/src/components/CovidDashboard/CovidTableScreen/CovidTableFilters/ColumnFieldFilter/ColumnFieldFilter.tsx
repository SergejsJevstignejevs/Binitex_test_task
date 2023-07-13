import { useSelector, useDispatch } from "react-redux";

import "./ColumnFieldFilter.css";

import { RootReducerState } from "../../../../../redux/reducerStore";
import { 
    SelectedTableFiltersState,
    setSelectedTableColumnField,
    setSelectedTableColumnFromValue,
    setSelectedTableColumnToValue
} from "../selectedTableFiltersReducer";

import { columns } from "../../CovidTable/CovidTable";

const ColumnFieldFilter: React.FC = () => {
    const {
        selectedTableColumnField,
        selectedTableColumnFromValue,
        selectedTableColumnToValue
    } = useSelector<RootReducerState, SelectedTableFiltersState>((state) => state.selectedTableFiltersReducer);
    const dispatch = useDispatch();

    const handleSelectedColumnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        
        dispatch(setSelectedTableColumnField(event.target.value));

    }

    const handleSelectedColumnFromValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    
        dispatch(setSelectedTableColumnFromValue(event.target.value));

    }

    const handleSelectedColumnToValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        dispatch(setSelectedTableColumnToValue(event.target.value));

    }

    return (
        <div className="ColumnFieldFilter">
            <select
                className="ColumnSelection"
                name="columns" 
                id="columns"
                value={selectedTableColumnField} 
                onChange={handleSelectedColumnChange}>
                <option value="" disabled hidden>
                    Filter by field
                </option>
                {columns.map((item, index) => {
                    return (
                        <option 
                            key={index}
                            value={item.name}>
                            {item.name}
                        </option >
                    );
                })}
            </select>
            <input 
                placeholder="Value `from`"
                type="text"
                value={selectedTableColumnFromValue || ""}
                onChange={handleSelectedColumnFromValueChange}/>
            <input 
                placeholder="Value `to`"
                type="text"
                value={selectedTableColumnToValue || ""}
                onChange={handleSelectedColumnToValueChange}/>
        </div>
    );
}

export default ColumnFieldFilter;