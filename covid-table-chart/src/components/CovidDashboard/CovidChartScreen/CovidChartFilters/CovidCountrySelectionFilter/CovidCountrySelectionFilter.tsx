import { useSelector, useDispatch } from "react-redux";

import { RootReducerState } from "../../../../../redux/reducerStore";
import { DateState } from "../../../../DatePickerPanel/dateReducer";
import { 
    SelectedChartFiltersState,
    setSelectedChartCountry
} from "../selectedChartFiltersReducer";

import "./CovidCountrySelectionFilter.css";


const CovidCountrySelectionFilter: React.FC = () => {
    const { 
        apiDataByCountriesFilteredByDate
    } = useSelector<RootReducerState, DateState>((state) => state.dateReducer);
    const {
        selectedChartCountry
    } = useSelector<RootReducerState, SelectedChartFiltersState>((state) => state.selectedChartFiltersReducer);
    const dispatch = useDispatch();

    const selectOptions = Object.entries(apiDataByCountriesFilteredByDate || {}).map(([country]) => {
        const countryStringReplaced = country.replace(/_/g, " ");
        return (
            <option 
                key={countryStringReplaced}
                value={country}>
                {countryStringReplaced}
            </option>
        )
    });

    const handleChartCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {

        dispatch(setSelectedChartCountry(event.target.value));

    }

    return (
        <div className="CovidCountrySelectionFilter">
            <label htmlFor="countries">Country: </label>
            <select 
                name="countries" 
                id="countries"
                value={selectedChartCountry}
                onChange={handleChartCountryChange}>
                <option 
                    key={"All Countries"}
                    value={"All Countries"}>
                    All Countries
                </option>
                {selectOptions}
            </select>
        </div>
    );
}

export default CovidCountrySelectionFilter;