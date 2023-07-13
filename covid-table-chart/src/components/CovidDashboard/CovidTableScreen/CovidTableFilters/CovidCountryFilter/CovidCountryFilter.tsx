import { useSelector, useDispatch } from "react-redux";

import "./CovidCountryFilter.css";

import {
    SelectedTableFiltersState,
    setSelectedTableCountry
} from "../selectedTableFiltersReducer";

import { RootReducerState } from "../../../../../redux/reducerStore";

const CovidCountryFilter: React.FC = () => {
    const {
        selectedTableCountry
    } = useSelector<RootReducerState, SelectedTableFiltersState>((state) => state.selectedTableFiltersReducer);
    const dispatch = useDispatch();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        dispatch(setSelectedTableCountry(event.target.value));

    }; 

    return (
        <div className="CovidCountryFilter">
            <input 
                type="text"
                placeholder="Find by country"
                value={selectedTableCountry || ""}
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