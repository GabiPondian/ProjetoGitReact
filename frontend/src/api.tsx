import axios from "axios"
import { CompanySearch, CompanyProfile } from "./company"


export interface SearchResponse{
    data: CompanySearch[];
}

export const SearchCompanies = async (query: string) => {
  try {
    const response = await axios.get(
      `https://api.twelvedata.com/symbol_search?symbol=${query}&apikey=${process.env.REACT_APP_API_KEY}`
    );

    return response.data.data; // <-- aqui é o array de verdade
  } catch (error) {
    console.log(error);
  }
};


export const getCompanyProfile = async (query: string) => {
  try {
    const response = await axios.get(
      `https://api.twelvedata.com/quote?symbol=${query}&apikey=${process.env.REACT_APP_API_KEY}`
    );

    return response.data; 
  } catch (error: any) {
    console.log("error message: ", error.message);
  }
};