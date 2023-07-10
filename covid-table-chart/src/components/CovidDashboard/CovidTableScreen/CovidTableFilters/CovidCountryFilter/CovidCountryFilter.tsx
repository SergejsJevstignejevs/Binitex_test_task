import { useSelector, useDispatch } from "react-redux";

import "./CovidCountryFilter.css";

import {
    SelectedFiltersState,
    setSelectedCountry,
    setInputCountryValue
} from "../selectedFiltersReducer";

import { RootReducerState } from "../../../../../redux/reducerStore";

const CovidCountryFilter: React.FC = () => {
    const {
        inputCountryValue
    } = useSelector<RootReducerState, SelectedFiltersState>((state) => state.selectedFiltersReducer);
    const dispatch = useDispatch();

    const handleInputCountryValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        dispatch(setInputCountryValue(event.target.value));

    };    

    const handleBtnCountryClick = () => {

        dispatch(setSelectedCountry(inputCountryValue));

    };

    return (
        <div className="CovidCountryFilter">
            <input 
                type="text"
                placeholder="Find by country"
                value={inputCountryValue || ""}
                onChange={handleInputCountryValueChange}>
            </input>
            <button 
                type="button"
                onClick={handleBtnCountryClick}>
                <img 
                    src="pictures/magnifying-glass.png"
                    alt="Magnifying Glass"/>
            </button>
        </div>
    );
}

export default CovidCountryFilter;