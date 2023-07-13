
import "./CovidChartScreen.css";

import CovidChart from "./CovidChart/CovidChart";
import CovidChartFilters from "./CovidChartFilters/CovidChartFilters";

const CovidChartScreen: React.FC = () => {
    return (
        <div className="CovidChartScreen">
            <CovidChartFilters />
            <CovidChart />
        </div>
    );
}

export default CovidChartScreen;