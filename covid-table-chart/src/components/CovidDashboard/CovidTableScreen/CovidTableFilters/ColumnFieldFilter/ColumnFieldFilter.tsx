import { useSelector, useDispatch } from "react-redux";

import "./ColumnFieldFilter.css";

import { RootReducerState } from "../../../../../redux/reducerStore";
import { 
    SelectedFiltersState,
    setSelectedColumnField,
    setColumnFromValue,
    setColumnToValue
} from "../selectedFiltersReducer";

import { columns } from "../../CovidTable/CovidTable";

const ColumnFieldFilter: React.FC = () => {
    const {
        selectedColumnField,
        selectedColumnFromValue,
        selectedColumnToValue
    } = useSelector<RootReducerState,SelectedFiltersState>((state) => state.selectedFiltersReducer);
    const dispatch = useDispatch();

    const handleSelectedColumnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        
        dispatch(setSelectedColumnField(event.target.value));

    }

    const handleSelectedColumnFromValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    
        dispatch(setColumnFromValue(event.target.value));

    }

    const handleSelectedColumnToValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        dispatch(setColumnToValue(event.target.value));

    }

    return (
        <div className="ColumnFieldFilter">
            <select
                className="ColumnSelection"
                name="columns" 
                id="columns"
                value={selectedColumnField} 
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
                value={selectedColumnFromValue || ""}
                onChange={handleSelectedColumnFromValueChange}/>
            <input 
                placeholder="Value `to`"
                type="text"
                value={selectedColumnToValue || ""}
                onChange={handleSelectedColumnToValueChange}/>
        </div>
    );
}

export default ColumnFieldFilter;