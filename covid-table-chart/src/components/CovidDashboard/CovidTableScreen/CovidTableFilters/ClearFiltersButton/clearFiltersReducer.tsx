interface ClearFiltersAction {
    type: string;
}

// Action creators
export const toggleClearFilters = (): ClearFiltersAction => ({
    type: "RESET_FILTERS",
});

//State definition
export interface ClearFiltersState {
    clearFiltersToggle: boolean;
}

const initialState: ClearFiltersState = {
    clearFiltersToggle: false
};

export function clearFiltersReducer(
    state: ClearFiltersState = initialState,
    action: ClearFiltersAction
) {
    switch (action.type) {
        case "RESET_FILTERS":{
            return { ...state, clearFiltersToggle: !state.clearFiltersToggle };
        }
        default:{
            return state;
        }
    }
}
