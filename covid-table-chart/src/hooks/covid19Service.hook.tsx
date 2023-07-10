import { useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import useHttp from "./http.hook";

import { TableCovidDataRepresentation } from "../components/CovidDashboard/CovidTableScreen/CovidTable/tableDataReducer";
import { setCurrentTableFilteredData } from "../components/CovidDashboard/CovidTableScreen/CovidTable/tableDataReducer";
import { setAPIDataByCountries } from "./apiDataByCountriesReducer";
import { RootReducerState } from "../redux/reducerStore";
import { DateState } from "../components/DatePickerPanel/dateReducer";

export interface Covid19Service {
    process: string,
    setProcess: React.Dispatch<React.SetStateAction<string>>,
    getMinMaxDates: () => Promise<{
        minDate: Date;
        maxDate: Date;
    }>,
    getDataByTablePageNumber: (
        currentTableData: TableCovidDataRepresentation[], 
        currentPageNumber: number, 
        pageRowCount: number) => Promise<TableCovidDataRepresentation[]>,
    filterAPIDataByDate(
        apiDataByCountries: APICountryNameCountryData,
        startDate: Date | null,
        endDate: Date | null
    ): Promise<TableCovidDataRepresentation[]>
}

export interface Covid19APIData{
    "Cumulative_number_for_14_days_of_COVID-19_cases_per_100000": string,
    cases: number,
    continentExp: string,
    countriesAndTerritories: string,
    countryterritoryCode: string,
    dateRep: string,
    day: string,
    deaths: number,
    geoId: string,
    month: string,
    popData2019: number | null,
    year: string
}

export interface APICountryNameCountryData{
    [country: string]: Covid19APIData[]
}

export default function useCovid19Service(): Covid19Service{

    const { request, process, setProcess } = useHttp();
    const {
        startDate,
        endDate
    } = useSelector<RootReducerState, DateState>((state) => state.dateReducer);
    const dispatch = useDispatch();

    const _apiBase = "https://opendata.ecdc.europa.eu/covid19/casedistribution/json/";

    const _fetchData = async () => {
        const response = await request(`${_apiBase}`);
        return response;
    };
      
    const covid19Data = useMemo(() => _fetchData(), [_apiBase]);

    const _transformAPIDataToCountriesNamesCountriesData = async () =>  {

        const data = await covid19Data;
        const countriesData: APICountryNameCountryData = {};

        data.records.forEach((item: Covid19APIData) => {
            const { countriesAndTerritories } = item;

            if (!countriesData[countriesAndTerritories]) {
                countriesData[countriesAndTerritories] = [];
            }
            else{
                countriesData[countriesAndTerritories].push(item);
            }
        });

        const sortedCountriesDataAlphabetically: APICountryNameCountryData = {};
        Object.keys(countriesData)
            .sort((a, b) => a.localeCompare(b))
            .forEach((key) => {
                sortedCountriesDataAlphabetically[key] = countriesData[key];
            });

        return sortedCountriesDataAlphabetically;

    };

    const covid19DataByCountries = useMemo(() => 
        _transformAPIDataToCountriesNamesCountriesData(), 
        [covid19Data]
    );

    interface CountriesTotalCasesAndDeaths{
        [country: string]: {
            totalAmountOfCases: number,
            totalAmountOfDeaths: number
        } 
    }

    const _getTotalCasesAndDeaths = async (
        dataByCountries: Promise<APICountryNameCountryData>) => {
        const data = await dataByCountries;
        const countriesTotalCasesAndDeaths: CountriesTotalCasesAndDeaths = {};

        Object.entries(data).forEach(([countryName, countryData]) => {
            let totalCases = 0;
            let totalDeaths = 0;

            countryData.forEach((element) => {
                const { cases, deaths } = element;
                totalCases += cases;
                totalDeaths += deaths;
            });

            const totalAmountOfCases = totalCases;
            const totalAmountOfDeaths = totalDeaths;

            countriesTotalCasesAndDeaths[countryName] = {
                totalAmountOfCases,
                totalAmountOfDeaths
            }
        });

        return countriesTotalCasesAndDeaths;
    };

    const covid19CountriesTotalCasesAndDeaths = useMemo(() => 
        _getTotalCasesAndDeaths(covid19DataByCountries), 
        [covid19DataByCountries]
    );

    const _transformToTableData = async (
        dataByCountries: Promise<APICountryNameCountryData>,
        countriesTotalCasesAndDeaths: Promise<CountriesTotalCasesAndDeaths>) => {
        const apiDataByCountries = await dataByCountries;
        const dataOfCountriesTotalCasesAndDeaths = await countriesTotalCasesAndDeaths;
        const tableData: TableCovidDataRepresentation[] = [];

        Object.entries(apiDataByCountries).forEach(([countryName, countryData]) => {
            if (countryData.length === 0) {
                return;
            }
          
            const { popData2019 } = countryData[0];
        
            let totalCases = 0;
            let totalDeaths = 0;

            countryData.forEach((element) => {
                totalCases += element.cases;
                totalDeaths += element.deaths;
            });

            const amountOfCases = totalCases;
            const amountOfDeaths = totalDeaths;
            const totalAmountOfCases = dataOfCountriesTotalCasesAndDeaths[countryName].totalAmountOfCases;
            const totalAmountOfDeaths = dataOfCountriesTotalCasesAndDeaths[countryName].totalAmountOfDeaths;
            const amountOfCasesPer1000 = 
                popData2019 !== null ? Number((amountOfCases / popData2019 * 1000).toFixed(4)): 0;
            const amountOfDeathsPer1000 = 
                popData2019 !== null ? Number((amountOfDeaths / popData2019 * 1000).toFixed(4)): 0;

            const tableItem: TableCovidDataRepresentation = {
                country: countryName.replace(/_/g, " "),
                amountOfCases,
                amountOfDeaths,
                totalAmountOfCases,
                totalAmountOfDeaths,
                amountOfCasesPer1000,
                amountOfDeathsPer1000,
            };

            if(amountOfCases > 0){
                tableData.push(tableItem);
            }
        });
        
        return tableData;
       
    };

    useEffect(() => {
        // _transformToTableData(
        //     covid19DataByCountries,
        //     covid19CountriesTotalCasesAndDeaths
        // ).then((tableData) => {
        //     dispatch(setCurrentTableFilteredData(tableData));
        // });
        covid19DataByCountries.then((data) => {
            dispatch(setAPIDataByCountries(data));
        })
    }, []);

    const getMinMaxDates = async () => {
        const data = (await covid19Data).records;

        if (data.length === 0) {
            return { minDate: new Date(), maxDate: new Date() };
        }

        const dateString = data[0].dateRep;
        const [day, month, year] = dateString.split("/");

        let minDate = new Date(`${month}/${day}/${year}`);
        let maxDate = new Date(`${month}/${day}/${year}`);

        data.forEach((item: Covid19APIData) => {
            const [day, month, year] = item.dateRep.split("/");
            let currentItemDate = new Date(`${month}/${day}/${year}`);

            if(currentItemDate.getTime() < minDate.getTime()){
                minDate = currentItemDate;
            }

            if(currentItemDate.getTime() > maxDate.getTime()){
                minDate = currentItemDate;
            }
        });
    
        return { minDate, maxDate };
    }

    const getDataByTablePageNumber = async (
        currentTableFullData: TableCovidDataRepresentation[],
        currentPageNumber: number, 
        pageRowCount: number) => {
            
        const startIndex = (currentPageNumber - 1) * pageRowCount;
        const endIndex = startIndex + pageRowCount;
      
        return currentTableFullData.slice(startIndex, endIndex);
    };

    const filterAPIDataByDate = async (
        apiDataByCountries: APICountryNameCountryData,
        startDate: Date | null,
        endDate: Date | null
      ): Promise<TableCovidDataRepresentation[]> => {
        const filteredDataByDate: APICountryNameCountryData = {};
        
        Object.entries(apiDataByCountries).forEach(([countryName, countryData]) => {
            filteredDataByDate[countryName] = countryData.filter((item) => {
                const dateString = item.dateRep;
                const [day, month, year] = dateString.split("/");
                const currentItemDate = new Date(`${month}/${day}/${year}`);
            
                return (
                    (!startDate || currentItemDate >= startDate) &&
                    (!endDate || currentItemDate <= endDate)
                );
            });
        });

        return await _transformToTableData(
            Promise.resolve(filteredDataByDate), 
            covid19CountriesTotalCasesAndDeaths
        );
    };

    return { 
        process,
        setProcess,
        getMinMaxDates,
        getDataByTablePageNumber,
        filterAPIDataByDate
    };

}