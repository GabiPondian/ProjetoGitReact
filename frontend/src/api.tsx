import axios from "axios"
import { CompanySearch } from "./company"


interface SearchResponse{
    data: CompanySearch[];
}

export const SearchCompanies = async (query: string) => {
    try {
        const data = await axios.get<SearchResponse>(
            `https://api.twelvedata.com/symbol_search?symbol=${query}&apikey=${process.env.REACT_APP_API_KEY}`
        );
        return data.data.data;
    }catch (error) {
        if (axios.isAxiosError(error)) {
            console.log("Error message: ", error.message);
            return error.message;
        }
        else{
            console.log("Unexpected error: ", error);
            return "An unexpected error has occurred";
        }
    }
}