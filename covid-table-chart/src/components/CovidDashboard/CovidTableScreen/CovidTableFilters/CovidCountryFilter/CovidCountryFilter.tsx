import { useSelector, useDispatch } from "react-redux";

import "./CovidCountryFilter.css";

import {
    SelectedFiltersState,
    setSelectedCountry
} from "../selectedFiltersReducer";

import { RootReducerState } from "../../../../../redux/reducerStore";

const CovidCountryFilter: React.FC = () => {
    const {
        selectedCountry
    } = useSelector<RootReducerState, SelectedFiltersState>((state) => state.selectedFiltersReducer);
    const dispatch = useDispatch();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        dispatch(setSelectedCountry(event.target.value));

    }; 

    return (
        <div className="CovidCountryFilter">
            <input 
                type="text"
                placeholder="Find by country"
                value={selectedCountry || ""}
                onChange={handleInputChange}>
            </input>
            <div className="ImageContainer">
                <img 
                    src="pictures/magnifying-glass.png"
                    alt="Magnifying Glass"/>
            </div>
        </div>
    );
}

export default CovidCountryFilter;