import { useDispatch } from "react-redux";

import "./ClearFiltersButton.css";

import { resetPageSelectionReducer } from "../../CovidTablePageSelectionPanel/pageSelectionReducer";
import { resetSelectedFiltersReducer } from "../selectedFiltersReducer";
import { resetDateReducer } from "../../../../DatePickerPanel/dateReducer";
import { toggleClearFilters } from "./clearFiltersReducer";

const ClearFiltersButton: React.FC = () => {
    const dispatch = useDispatch();

    const handleClearFilters = () => {
        dispatch(resetSelectedFiltersReducer());
        dispatch(resetPageSelectionReducer());
        dispatch(resetDateReducer());
        dispatch(toggleClearFilters());
    }

    return (
        <button 
            className="ClearFiltersButton"
            type="button"
            onClick={handleClearFilters}>
            <span>
                Clear Filters
            </span>
        </button>
    );
}

export default ClearFiltersButton;