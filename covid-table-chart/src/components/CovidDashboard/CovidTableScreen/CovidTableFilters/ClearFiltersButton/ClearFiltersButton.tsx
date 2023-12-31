import { useDispatch } from "react-redux";

import "./ClearFiltersButton.css";

import { resetPageSelectionReducer } from "../../CovidTablePageSelectionPanel/pageSelectionReducer";
import { resetSelectedFiltersReducer } from "../selectedTableFiltersReducer";
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
            <img src="/pictures/reset.png" alt="Reset arrow" />
        </button>
    );
}

export default ClearFiltersButton;