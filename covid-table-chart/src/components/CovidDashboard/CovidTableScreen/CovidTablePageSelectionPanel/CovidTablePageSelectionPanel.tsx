import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import ReactPaginate from "react-paginate";

import useCovid19Service from "../../../../hooks/covid19Service.hook";
import { 
    setCurrentPageNumber,
    setPageCount
} from "./pageSelectionReducer";
import { PageSelectionState } from "./pageSelectionReducer";
import { RootReducerState } from "../../../../store";
import { TableDataState } from "../CovidTable/tableDataReducer";

import "./CovidTablePageSelectionPanel.css";

function CovidTablePageSelectionPanel() {
    const { currentFilteredTableData } = useCovid19Service();
    const { 
        currentPageNumber,
        currentPageRowCount,
        pageCount
    } = useSelector<RootReducerState, PageSelectionState>((state) => state.pageSelectionReducer);
    const { 
        tableData 
    } = useSelector<RootReducerState, TableDataState>((state) => state.tableDataReducer);
    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(setPageCount(Math.ceil(currentFilteredTableData.length / currentPageRowCount)));

    }, [tableData]);

    interface PageClickEvent {
        index: number | null,
        selected: number,
        nextSelectedPage: number | undefined,
        event: object,
        isPrevious: boolean,
        isNext: boolean,
        isBreak: boolean,
        isActive: boolean
    };

    const handlePageClick = (event: PageClickEvent) => {
        dispatch(setCurrentPageNumber(event.selected + 1));
        console.log("click");
    };

    return (
        <div className="CovidTablePageSelectionPanel">
            <ReactPaginate
                breakLabel="..."
                nextLabel=">"
                onClick={handlePageClick}
                pageRangeDisplayed={3}
                pageCount={pageCount}
                previousLabel="<"/>
        </div>
    );
}

export default CovidTablePageSelectionPanel;