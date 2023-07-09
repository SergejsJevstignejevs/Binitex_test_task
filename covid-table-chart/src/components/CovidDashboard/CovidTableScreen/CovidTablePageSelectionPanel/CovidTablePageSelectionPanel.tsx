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
import { DateState } from "../../../DatePickerPanel/dateReducer";

function CovidTablePageSelectionPanel() {
    const { 
        currentTableFilteredData 
    } = useSelector<RootReducerState, TableDataState>((state) => state.tableDataReducer);
    const {
        startDate,
        endDate
    } = useSelector<RootReducerState, DateState>((state) => state.dateReducer);
    const {
        currentPageNumber,
        currentPageRowCount,
        pageCount
    } = useSelector<RootReducerState, PageSelectionState>((state) => state.pageSelectionReducer);
    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(setPageCount(Math.ceil(currentTableFilteredData.length / currentPageRowCount)));

    }, [currentTableFilteredData]);

    // useEffect(() => {

    //     if(currentPageNumber > pageCount){
    //         dispatch(setCurrentPageNumber(pageCount - 1));
    //     }

    // }, [pageCount]);

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