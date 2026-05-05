import axios from "axios"
import {
  CompanyIncomeStatement,
  CompanyKeyMetrics,
  CompanyKeyRatios,
  CompanyProfile,
  CompanySearch,
} from "./company";

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


export const getKeyMetrics = async (symbol: string) => {
  try {
    const response = await axios.get(
      `https://api.twelvedata.com/quote?symbol=${symbol}&apikey=${process.env.REACT_APP_API_KEY}`
    );

    return response.data;
  } catch (error: any) {
    console.log("error message: ", error.message);
  }
};


export const getIncomeStatement = async (symbol: string) => {
  try {
    const response = await axios.get(
      `https://api.twelvedata.com/fundamentals?symbol=${symbol}&apikey=${process.env.REACT_APP_API_KEY}`
    );

    return response.data;
  } catch (error: any) {
    console.log("error message: ", error.message);
  }
};