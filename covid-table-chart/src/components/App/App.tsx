import React from 'react';

import DatePickerPanel from '../DatePickerPanel/DatePickerPanel';
import CovidDashboard from '../CovidDashboard/CovidDashboard';
import VisualizationSelectionPanel from '../VisualizationSelectionPanel/VisualizationSelectionPanel';

import './App.css';

const App: React.FC = () => {
    return (
        <div className="App">
            <div className="MainContent">
                <DatePickerPanel/>
                <VisualizationSelectionPanel/>
                <CovidDashboard/>
            </div>
        </div>
    );
}

export default App;
