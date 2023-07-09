import { APICountryNameCountryData } from "./covid19Service.hook";

interface APIDataByCountriesAction {
    type: string,
    payload: APICountryNameCountryData
}

// Action creators
export const setAPIDataByCountries = (apiDataByCountries: APICountryNameCountryData): APIDataByCountriesAction => ({
    type: "SET_API_DATA_BY_COUNTRIES",
    payload: apiDataByCountries,
});

//State definition
export interface APIDataByCountriesState {
    apiDataByCountries:  APICountryNameCountryData
}

const initialState = {
    apiDataByCountries: {}
};

export function apiDataByCountriesReducer(state: APIDataByCountriesState = initialState, action: APIDataByCountriesAction) {
    switch (action.type) {
        case "SET_API_DATA_BY_COUNTRIES":{
            return { ...state, apiDataByCountries: action.payload };
        }
        default:{
            return state;
        }
    }
}
