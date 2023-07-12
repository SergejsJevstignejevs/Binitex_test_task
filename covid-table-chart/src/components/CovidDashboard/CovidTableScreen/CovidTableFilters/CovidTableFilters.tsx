
import CovidCountryFilter from "./CovidCountryFilter/CovidCountryFilter";
import ClearFiltersButton from "./ClearFiltersButton/ClearFiltersButton";
import ColumnFieldFilter from "./ColumnFieldFilter/ColumnFieldFilter";

import "./CovidTableFilters.css";

const CovidTableFilters: React.FC = () => {
    return (
        <div className="CovidTableFilters">
            <CovidCountryFilter />
            <ColumnFieldFilter />
            <ClearFiltersButton />
        </div>
    );
}

export default CovidTableFilters;