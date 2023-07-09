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
import { useCovid19ServiceDI } from "../../../../contexts/Covid19ServiceProvider";

function CovidTablePageSelectionPanel() {
    const { currentFilteredTableData } = useCovid19ServiceDI();
    const {
        currentPageRowCount,
        pageCount
    } = useSelector<RootReducerState, PageSelectionState>((state) => state.pageSelectionReducer);
    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(setPageCount(Math.ceil(currentFilteredTableData.length / currentPageRowCount)));

    }, [currentFilteredTableData]);

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
                previousLabel="<"/>
        </div>
    );
}

export default CovidTablePageSelectionPanel;