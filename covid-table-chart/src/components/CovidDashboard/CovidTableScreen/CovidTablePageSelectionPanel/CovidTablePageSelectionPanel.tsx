import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import ReactPaginate from "react-paginate";

import "./CovidTablePageSelectionPanel.css";

import { 
    setCurrentPageNumber,
    setPageCount
} from "./pageSelectionReducer";
import { PageSelectionState } from "./pageSelectionReducer";
import { RootReducerState } from "../../../../redux/reducerStore";
import { TableDataState } from "../CovidTable/tableDataReducer";
import { VisualizationChoiseState } from "../../../VisualizationSelectionPanel/dataVisualizationChoiseReducer";
import { ClearFiltersState } from "../CovidTableFilters/CovidCountryFilter/clearFiltersReducer";

function CovidTablePageSelectionPanel() {
    const { 
        currentTableFilteredData 
    } = useSelector<RootReducerState, TableDataState>((state) => state.tableDataReducer);
    const {
        visualizationChoise
    } = useSelector<RootReducerState, VisualizationChoiseState>((state) => state.dataVisualizationChoiseReducer);
    const {
        currentPageNumber,
        currentPageRowCount,
        pageCount
    } = useSelector<RootReducerState, PageSelectionState>((state) => state.pageSelectionReducer);
    const { 
        clearFiltersToggle
    } = useSelector<RootReducerState, ClearFiltersState>((state) =>  state.clearFiltersReducer);
    const dispatch = useDispatch();

    useEffect(() => {

        if (currentTableFilteredData.length > 0) {
            dispatch(setPageCount(Math.ceil(currentTableFilteredData.length / currentPageRowCount)));
        }

    }, [currentTableFilteredData, currentPageRowCount, clearFiltersToggle]);

    useEffect(() => {
        
        if (visualizationChoise === "table" && currentPageNumber > pageCount) {
            dispatch(setCurrentPageNumber(pageCount));
        }

    }, [visualizationChoise, currentPageNumber, pageCount, clearFiltersToggle]);

    interface PageChangeEvent {
        selected: number
    };

    const handlePageClick = (event: PageChangeEvent) => {
        dispatch(setCurrentPageNumber(event.selected + 1));
    };

    return (
        <div className="CovidTablePageSelectionPanel">
            <ReactPaginate
                breakLabel="..."
                nextLabel=">"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                pageCount={pageCount}
                previousLabel="<"
                forcePage={currentPageNumber - 1}/>
        </div>
    );
}

export default CovidTablePageSelectionPanel;