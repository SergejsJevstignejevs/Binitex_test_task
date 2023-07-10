
import CovidCountryFilter from "./CovidCountryFilter/CovidCountryFilter";

import "./CovidTableFilters.css";

const CovidTableFilters: React.FC = () => {
    return (
        <div className="CovidTableFilters">
            <CovidCountryFilter />
        </div>
    );
}

export default CovidTableFilters;