import { useState, useCallback } from "react";

export default function useHttp(){

    const [process, setProcess] = useState("waiting");

    const request = useCallback(
        async (url: string, method = "GET", body = null/*, headers = {"Content-Type": "application/json"}*/) => {

            setProcess("loading");

            try{

                const response = await fetch(url, {method, body/*, headers*/});

                if(!response.ok){
                    setProcess("error");
                    throw new Error(`Couldn't fetch ${url}, status: ${response.status}`);
                }

                const data = await response.json();

                return data;

            }
            catch(error){

                setProcess("error");
                throw error;

            }

    }, []);

    return { request, process, setProcess };

};