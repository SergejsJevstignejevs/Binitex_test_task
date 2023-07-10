
import CovidTable from "./CovidTable/CovidTable";
import CovidTablePageSelectionPanel from "./CovidTablePageSelectionPanel/CovidTablePageSelectionPanel";
import CovidTableFilters from "./CovidTableFilters/CovidTableFilters";

import "./CovidTableScreen.css";

const CovidTableScreen: React.FC = () => {
    return (
        <div className="CovidTableScreen">
            <CovidTableFilters />
            <CovidTable />
            <CovidTablePageSelectionPanel />
        </div>
    );
}

export default CovidTableScreen;