interface DateAction {
    type: string,
    payload: Date
}

// Action creators
export const setStartDate = (startDate: Date): DateAction => ({
    type: "SET_START_DATE",
    payload: startDate,
});
  
export const setEndDate = (endDate: Date): DateAction => ({
    type: "SET_END_DATE",
    payload: endDate,
});

//State definition
export interface DateState {
    startDate: Date,
    endDate: Date
};

const initialState = {
    startDate: new Date(),
    endDate: new Date(),
};

export function dateReducer(state: DateState = initialState, action: DateAction) {
    switch (action.type) {
        case "SET_START_DATE":{
            return { ...state, startDate: action.payload };
        }
        case "SET_END_DATE":{
            return { ...state, endDate: action.payload };
        }
        default:{
            return state;
        }
    }
}
