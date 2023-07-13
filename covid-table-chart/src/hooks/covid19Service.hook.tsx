import { useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import useHttp from "./http.hook";

import { TableCovidDataRepresentation } from "../components/CovidDashboard/CovidTableScreen/CovidTable/tableDataReducer";
import { setAPIDataByCountries } from "./apiDataByCountriesReducer";
import { ChartCovidDataRepresentation } from "../components/CovidDashboard/CovidChartScreen/CovidChart/chartDataReducer";

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
    filterAPIDataByDate: (
        apiDataByCountries: APICountryNameCountryData,
        startDate: Date | null,
        endDate: Date | null
    ) => APICountryNameCountryData,
    filterBySelectedCountry: (
        currentTableData: TableCovidDataRepresentation[], 
        country: string
    ) => TableCovidDataRepresentation[],
    filterBySelectedColumnValues: (
        currentTableData: TableCovidDataRepresentation[], 
        selectedColumn: string,
        selectedColumnFromValue: string,
        selectedColumnToValue: string
    ) => TableCovidDataRepresentation[],
    toChartData: (
        apiDataByCountries: APICountryNameCountryData
    ) => ChartCovidDataRepresentation,
    toTableData: (
        apiDataByCountries: APICountryNameCountryData
    ) => Promise<TableCovidDataRepresentation[]>,
    chartAllCountriesData: (
        apiDataByCountries: APICountryNameCountryData,
    ) => ChartCovidDataRepresentation
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

    const toTableData = async (
        apiDataByCountries: APICountryNameCountryData
    ): Promise<TableCovidDataRepresentation[]> =>  {
        return await _transformToTableData(
            Promise.resolve(apiDataByCountries), 
            covid19CountriesTotalCasesAndDeaths
        );
    }

    useEffect(() => {

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

    const filterAPIDataByDate = (
        apiDataByCountries: APICountryNameCountryData,
        startDate: Date | null,
        endDate: Date | null
      ): APICountryNameCountryData => {
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

        return filteredDataByDate;
    };

    const filterBySelectedCountry = (
        currentTableData: TableCovidDataRepresentation[], 
        country: string
    ): TableCovidDataRepresentation[] => {
        if (country.length === 0) {
            return currentTableData;
        }

        const filteredByCountry = currentTableData.filter((element) => {
            return element.country.toLowerCase().includes(country.toLowerCase());
        });
    
        return filteredByCountry;
    };

    const filterBySelectedColumnValues = (
        currentTableData: TableCovidDataRepresentation[], 
        selectedColumn: string,
        selectedColumnFromValue: string,
        selectedColumnToValue: string
    ): TableCovidDataRepresentation[] => {
        if(
            selectedColumn.length === 0 || 
            selectedColumnFromValue.length === 0 ||
            selectedColumnToValue.length === 0){
            return currentTableData;
        }

        let filteredBySelectedColumnValues: TableCovidDataRepresentation[] = [];

        if(selectedColumn === "Country"){
            filteredBySelectedColumnValues =  currentTableData.filter((element) => {
                return (
                    element.country.toLowerCase().startsWith(selectedColumnFromValue.toLowerCase()) &&
                    element.country.toLowerCase().endsWith(selectedColumnToValue.toLowerCase())
                )
            });

            return filteredBySelectedColumnValues;
        };

        const numberFromValue = Number(selectedColumnFromValue);
        const numberToValue = Number(selectedColumnToValue);

        if(isNaN(numberFromValue) || isNaN(numberToValue)){
            return currentTableData;
        }

        if(selectedColumn === "Amount of cases"){
            filteredBySelectedColumnValues =  currentTableData.filter((element) => {
                return (
                    element.amountOfCases >= numberFromValue &&
                    element.amountOfCases <= numberToValue
                )
            });

            return filteredBySelectedColumnValues;
        };

        if(selectedColumn === "Amount of deaths"){
            filteredBySelectedColumnValues =  currentTableData.filter((element) => {
                return (
                    element.amountOfDeaths >= numberFromValue &&
                    element.amountOfDeaths <= numberToValue
                )
            });

            return filteredBySelectedColumnValues;
        };

        if(selectedColumn === "Total amount of cases"){
            filteredBySelectedColumnValues =  currentTableData.filter((element) => {
                return (
                    element.totalAmountOfCases >= numberFromValue &&
                    element.totalAmountOfCases <= numberToValue
                )
            });

            return filteredBySelectedColumnValues;
        };

        if(selectedColumn === "Total amount of deaths"){
            filteredBySelectedColumnValues =  currentTableData.filter((element) => {
                return (
                    element.totalAmountOfDeaths >= numberFromValue &&
                    element.totalAmountOfDeaths <= numberToValue
                )
            });

            return filteredBySelectedColumnValues;
        };

        if(selectedColumn === "Amount of cases per 1000 person"){
            filteredBySelectedColumnValues =  currentTableData.filter((element) => {
                return (
                    element.amountOfCasesPer1000 >= numberFromValue &&
                    element.amountOfCasesPer1000 <= numberToValue
                )
            });

            return filteredBySelectedColumnValues;
        };

        if(selectedColumn === "Amount of deaths per 1000 person"){
            filteredBySelectedColumnValues =  currentTableData.filter((element) => {
                return (
                    element.amountOfDeathsPer1000 >= numberFromValue &&
                    element.amountOfDeathsPer1000 <= numberToValue
                )
            });

            return filteredBySelectedColumnValues;
        };

        return filteredBySelectedColumnValues;
    };

    const toChartData = (
        apiDataByCountries: APICountryNameCountryData,
      ): ChartCovidDataRepresentation => {
        const chartData: ChartCovidDataRepresentation = {};

        Object.entries(apiDataByCountries).forEach(([country, countryData]) => {
            const countryCases = countryData.map((data) => data.cases);
            const countryDeaths = countryData.map((data) => data.deaths);
            const labels: string[] = [...countryData.map((data) => data.dateRep)];

            const countryDatasets = [
                {
                    label: country.replace(/_/g, " ") + " cases",
                    data: countryCases,
                    backgroundColor: "#FFD700", // golden
                    borderColor: "#DDBB00" // darker golden
                },
                {
                    label: country.replace(/_/g, " ") + " deaths",
                    data: countryDeaths,
                    backgroundColor: "#DD1111", // red
                    borderColor: "#FF5C5C" // lightter red
                },
            ];

            chartData[country] = { 
                labels: [...labels], 
                datasets: [...countryDatasets] 
            };

        });

        return chartData;
    };

    const chartAllCountriesData = (
        apiDataByCountries: APICountryNameCountryData,
    ): ChartCovidDataRepresentation => {
        const chartAllCountriesData: ChartCovidDataRepresentation = {};

        const allCountriesData: {
            labels: string[];
            datasets: {
                label: string;
                data: number[];
                backgroundColor: string;
                borderColor: string;
            }[];
        } = { 
            labels: [], 
            datasets: [
                {
                    label: "All countries cases",
                    data: Array.from({ length: 0 }, () => 0),
                    backgroundColor: "#FFD700", // golden
                    borderColor: "#DDBB00" // darker golden
                },
                {
                    label: "All countries deaths",
                    data: Array.from({ length: 0 }, () => 0),
                    backgroundColor: "#DD1111", // red
                    borderColor: "#FF5C5C" // lightter red
                }
            ] 
        };
        
        Object.entries(apiDataByCountries).forEach(([country, countryData]) => {

            countryData.forEach((item) => {
                const { dateRep } = item;

                if(!allCountriesData.labels.includes(dateRep)){
                    allCountriesData.labels.push(dateRep);
                }

                const indexOfDateRep = allCountriesData.labels.findIndex((label) => label === dateRep);

                //cases dataset
                if (allCountriesData.datasets[0].data[indexOfDateRep] === undefined) {
                    allCountriesData.datasets[0].data[indexOfDateRep] = 0;
                }
                allCountriesData.datasets[0].data[indexOfDateRep] += item.cases;
        
                // deaths dataset
                if (allCountriesData.datasets[1].data[indexOfDateRep] === undefined) {
                    allCountriesData.datasets[1].data[indexOfDateRep] = 0;
                }
                allCountriesData.datasets[1].data[indexOfDateRep] += item.deaths;
            })

        });
    
        chartAllCountriesData['All Countries'] = allCountriesData;
    
        return chartAllCountriesData;
    };

    return { 
        process,
        setProcess,
        getMinMaxDates,
        getDataByTablePageNumber,
        filterAPIDataByDate,
        filterBySelectedCountry,
        filterBySelectedColumnValues,
        toChartData,
        toTableData,
        chartAllCountriesData
    };

}