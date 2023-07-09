import { useMemo, useState, useEffect } from "react";
import { useSelector } from "react-redux";

import useHttp from "./http.hook";

import { TableCovidDataRepresentation } from "../components/CovidDashboard/CovidTableScreen/CovidTable/tableDataReducer";
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
    currentFilteredTableData: TableCovidDataRepresentation[],
    setCurrentFilteredTableData: React.Dispatch<React.SetStateAction<TableCovidDataRepresentation[]>>
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
    popData2019: number,
    year: string
}

export default function useCovid19Service(): Covid19Service{

    const { request, process, setProcess } = useHttp();
    const {
        startDate,
        endDate
    } = useSelector<RootReducerState, DateState>((state) => state.dateReducer);
    const [currentFilteredTableData, setCurrentFilteredTableData] = useState<TableCovidDataRepresentation[]>([]);

    const _apiBase = "https://opendata.ecdc.europa.eu/covid19/casedistribution/json/";

    const _fetchData = async () => {
        const response = await request(`${_apiBase}`);
        return response;
    };
      
    const covid19Data = useMemo(() => _fetchData(), [_apiBase]);

    const _transformCountriesDataSeparately = async () =>  {

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

    const covid19DataByCountries = useMemo(() => 
        _transformCountriesDataSeparately(), 
        [covid19Data]
    );

    const _sortCountriesDataKeys = async (dataByCountries: Promise<{ [key: string]: Covid19APIData[] }>) => {
        const data = await dataByCountries;
        const sortedKeys = Object.keys(data).sort();
        
        const sortedCountriesDataByAlphabet: { [key: string]: Covid19APIData[] } = {};
        sortedKeys.forEach((key) => {
            sortedCountriesDataByAlphabet[key] = data[key];
        });
        
        return sortedCountriesDataByAlphabet;
    };

    const covid19DataByCountriesOrderedByAlphabet = useMemo(() => 
        _sortCountriesDataKeys(covid19DataByCountries), 
        [covid19DataByCountries]
    );

    
    const _filterDataByDate = async (
        dataByCountriesOrderedByAlphabet: Promise<{ [key: string]: Covid19APIData[] }>, 
        startDate: Date | null, 
        endDate: Date | null) => {

        const data = await dataByCountriesOrderedByAlphabet;
        const dataFilteredByDate: { [key: string]: Covid19APIData[] } = {}; 

        Object.entries(data).forEach(([key, value]) => {
            // `key` is the country name
            // `value` is the array of Covid19APIData

            const valueFilteredByDate = value.filter((item) => {
                const dateString = item.dateRep;
                const [day, month, year] = dateString.split("/");
                let currentItemDate = new Date(`${month}/${day}/${year}`);

                return (
                    (!startDate || currentItemDate >= startDate) && 
                    (!endDate || currentItemDate <= endDate)
                );
            });

            if (valueFilteredByDate.length > 0) {
                dataFilteredByDate[key] = valueFilteredByDate;
            }

        });

        return dataFilteredByDate;

    };

    const covid19DataByCountriesOrderedByAlphabetFilteredByDate = useMemo(() => 
        _filterDataByDate(covid19DataByCountriesOrderedByAlphabet, startDate, endDate), 
        [covid19DataByCountriesOrderedByAlphabet, startDate, endDate]
    );

    interface CountriesTotalCasesAndDeaths{
        [country: string]: {
            totalAmountOfCases: number,
            totalAmountOfDeaths: number
        } 
    }

    const _getTotalCasesAndDeaths = async (
        dataByCountriesOrderedByAlphabet: Promise<{ [key: string]: Covid19APIData[] }>) => {
        const data = await dataByCountriesOrderedByAlphabet;
        const countriesTotalCasesAndDeaths: CountriesTotalCasesAndDeaths = {};

        Object.entries(data).forEach(([key, value]) => {
            // `key` is the country name
            // `value` is the array of Covid19APIData
            const { popData2019 } = value[0];
        
            let totalCases = 0;
            let totalDeaths = 0;

            value.forEach((element) => {
                const { cases, deaths } = element;
                totalCases += cases;
                totalDeaths += deaths;
            });

            const totalAmountOfCases = totalCases;
            const totalAmountOfDeaths = totalDeaths;

            countriesTotalCasesAndDeaths[key] = {
                totalAmountOfCases,
                totalAmountOfDeaths
            }
        });

        return countriesTotalCasesAndDeaths;
    };

    const covid19CountriesTotalCasesAndDeaths = useMemo(() => 
        _getTotalCasesAndDeaths(covid19DataByCountriesOrderedByAlphabet), 
        [covid19DataByCountriesOrderedByAlphabet]
    );

    const _transformToTableData = async (
        dataByCountriesOrderedByAlphabetFilteredByDate: Promise<{ [key: string]: Covid19APIData[] }>,
        countriesTotalCasesAndDeaths: Promise<CountriesTotalCasesAndDeaths>) => {
        const data = await dataByCountriesOrderedByAlphabetFilteredByDate;
        const dataOfCountriesTotalCasesAndDeaths = await countriesTotalCasesAndDeaths;
        const tableData: TableCovidDataRepresentation[] = [];

        Object.entries(data).forEach(([key, value]) => {
            // `key` is the country name
            // `value` is the array of Covid19APIData
            const { popData2019 } = value[0];
        
            let totalCasesByDate = 0;
            let totalDeathsByDate = 0;

            value.forEach((element) => {
                const { cases, deaths } = element;
                totalCasesByDate += cases;
                totalDeathsByDate += deaths;
            });

            const amountOfCases = totalCasesByDate;
            const amountOfDeaths = totalDeathsByDate;
            const totalAmountOfCases = dataOfCountriesTotalCasesAndDeaths[key].totalAmountOfCases;
            const totalAmountOfDeaths = dataOfCountriesTotalCasesAndDeaths[key].totalAmountOfDeaths;
            const amountOfCasesPer1000 = Number((amountOfCases / popData2019 * 1000).toFixed(4))
            const amountOfDeathsPer1000 = Number((amountOfDeaths / popData2019 * 1000).toFixed(4))

            const tableItem: TableCovidDataRepresentation = {
                country: key.replace(/_/g, " "),
                amountOfCases,
                amountOfDeaths,
                totalAmountOfCases,
                totalAmountOfDeaths,
                amountOfCasesPer1000,
                amountOfDeathsPer1000,
            };

            if(totalAmountOfCases > 0){
                tableData.push(tableItem);
            }
        });
        console.log(tableData);
        return tableData;
       
    };

    const initialTableData = useMemo(() => 
        _transformToTableData(
            covid19DataByCountriesOrderedByAlphabetFilteredByDate,
            covid19CountriesTotalCasesAndDeaths), 
        [covid19DataByCountriesOrderedByAlphabetFilteredByDate, covid19CountriesTotalCasesAndDeaths]
    );

    useEffect(() => {
        initialTableData.then((data) => {
            setCurrentFilteredTableData(data);
        });
    }, [initialTableData]);

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
        currentTableData: TableCovidDataRepresentation[],
        currentPageNumber: number, 
        pageRowCount: number) => {
        console.log(currentPageNumber);
        const startIndex = (currentPageNumber - 1) * pageRowCount;
        const endIndex = startIndex + pageRowCount;
      
        return currentTableData.slice(startIndex, endIndex);
    };

    return { 
        process,
        setProcess,
        getMinMaxDates,
        getDataByTablePageNumber,
        currentFilteredTableData, 
        setCurrentFilteredTableData
    };

}