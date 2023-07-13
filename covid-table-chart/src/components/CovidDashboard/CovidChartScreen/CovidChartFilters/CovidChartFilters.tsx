
import CovidCountrySelectionFilter from "./CovidCountrySelectionFilter/CovidCountrySelectionFilter";

import "./CovidChartFilters.css";

const CovidChartFilters: React.FC = () => {
    return (
        <div className="CovidChartFilters">
            <CovidCountrySelectionFilter />
        </div>
    );
}

export default CovidChartFilters;