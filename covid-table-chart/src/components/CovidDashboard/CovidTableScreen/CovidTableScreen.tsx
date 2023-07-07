
import CovidTable from "./CovidTable/CovidTable";
import CovidTablePageSelectionPanel from "./CovidTablePageSelectionPanel/CovidTablePageSelectionPanel";

import "./CovidTableScreen.css";

const CovidTableScreen: React.FC = () => {
    return (
        <div className="CovidTableScreen">
            <CovidTable />
            <CovidTablePageSelectionPanel />
        </div>
    );
}

export default CovidTableScreen;