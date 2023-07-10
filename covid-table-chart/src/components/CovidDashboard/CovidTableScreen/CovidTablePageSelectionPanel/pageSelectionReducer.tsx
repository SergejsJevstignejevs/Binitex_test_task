interface PageSelectionAction {
    type: string,
    payload: number
}

// Action creators
export const setCurrentPageNumber = (currentPageNumber: number): PageSelectionAction => ({
    type: "SET_CURRENT_PAGE_NUMBER",
    payload: currentPageNumber,
});

export const setCurrentPageRowCount = (currentPageRowCount: number): PageSelectionAction => ({
    type: "SET_CURRENT_PAGE_ROW_SIZE",
    payload: currentPageRowCount,
});

export const setPageCount = (currentPageCount: number): PageSelectionAction => ({
    type: "SET_PAGE_COUNT",
    payload: currentPageCount,
});

export const resetPageSelectionReducer = (): PageSelectionAction => ({
    type: "RESET_PAGE_SELECTION_REDUCER",
    payload: 1,
});

//State definition
export interface PageSelectionState {
    currentPageNumber: number,
    currentPageRowCount: number,
    pageCount: number
};

const initialState: PageSelectionState = {
    currentPageNumber: 1,
    currentPageRowCount: 9,
    pageCount: 1
};

export function pageSelectionReducer(
    state: PageSelectionState = initialState, 
    action: PageSelectionAction) 
{
    switch (action.type) {
        case "SET_CURRENT_PAGE_NUMBER":{
            return { ...state, currentPageNumber: action.payload };
        }
        case "SET_CURRENT_PAGE_ROW_COUNT":{
            return { ...state, currentPageRowCount: action.payload };
        }
        case "SET_PAGE_COUNT":{
            return { ...state, pageCount: action.payload };
        }
        case "RESET_PAGE_SELECTION_REDUCER":{
            return initialState;
        }
        default:{
            return state;
        }
    }
}
