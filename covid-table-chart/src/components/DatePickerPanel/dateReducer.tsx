import { APICountryNameCountryData } from "../../hooks/covid19Service.hook";

interface DateAction {
    type: string,
    payload: Date | APICountryNameCountryData
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

export const setMinDate = (minDate: Date): DateAction => ({
    type: "SET_MIN_DATE",
    payload: minDate,
});
  
export const setMaxDate = (maxDate: Date): DateAction => ({
    type: "SET_MAX_DATE",
    payload: maxDate,
});

export const setAPIDataByCountriesFilteredByDate = (apiDataByCountriesFilteredByDate: APICountryNameCountryData): DateAction => ({
    type: "SET_API_DATA_BY_COUNTRIES_FILTERED_BY_DATE",
    payload: apiDataByCountriesFilteredByDate,
});

export const resetDateReducer = (): DateAction => ({
    type: "RESET_DATE_REDUCER",
    payload: new Date(),
});

//State definition
export interface DateState {
    startDate: Date | null,
    endDate: Date | null,
    minDate: Date | null,
    maxDate: Date | null,
    apiDataByCountriesFilteredByDate: APICountryNameCountryData | null
};

const initialState = {
    startDate: null,
    endDate: null,
    minDate: null,
    maxDate: null,
    apiDataByCountriesFilteredByDate: null
};

export function dateReducer(state: DateState = initialState, action: DateAction) {
    switch (action.type) {
        case "SET_START_DATE":{
            return { ...state, startDate: action.payload };
        }
        case "SET_END_DATE":{
            return { ...state, endDate: action.payload };
        }
        case "SET_MIN_DATE":{
            return { ...state, minDate: action.payload };
        }
        case "SET_MAX_DATE":{
            return { ...state, maxDate: action.payload };
        }
        case "SET_API_DATA_BY_COUNTRIES_FILTERED_BY_DATE":{
            return { ...state, apiDataByCountriesFilteredByDate: action.payload };
        }
        case "RESET_DATE_REDUCER":{
            return initialState;
        }
        default:{
            return state;
        }
    }
}
