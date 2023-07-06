import { useMemo } from "react";

import useHttp from "./http.hook";

import { Covid19APIData } from "../components/CovidDashboard/CovidTableScreen/CovidTable/tableDataReducer";

export default function useCovid19Service(){

    const { request, process, setProcess } = useHttp();

    const _apiBase = "https://opendata.ecdc.europa.eu/covid19/casedistribution/json/";

    const _fetchData = async () => {
        const response = await request(`${_apiBase}`);
        return response;
    };
      
    const covid19Data = useMemo(() => _fetchData(), []);

    const getDataByAmount = async (amount: number) => {
        
        const data = await covid19Data;

        return data.records.slice(0, amount);

    };

    const getCountriesDataSeparately = async () =>  {

        const data = await covid19Data;
        const countriesData: { [key: string]: Covid19APIData[] } = {};

        data.records.forEach((item: Covid19APIData) => {
            const { countriesAndTerritories } = item;

            if (!countriesData[countriesAndTerritories]) {
                countriesData[countriesAndTerritories] = [];
            }
            else{
                countriesData[countriesAndTerritories].push(item);
            }
        });

        return countriesData;

    };

    return { 
        process,
        setProcess,
        getDataByAmount,
        getCountriesDataSeparately
    };

}