
import CovidCountryFilter from "./CovidCountryFilter/CovidCountryFilter";
import ClearFiltersButton from "./ClearFiltersButton/ClearFiltersButton";

import "./CovidTableFilters.css";

const CovidTableFilters: React.FC = () => {
    return (
        <div className="CovidTableFilters">
            <CovidCountryFilter />
            <ClearFiltersButton />
        </div>
    );
}

export default CovidTableFilters;