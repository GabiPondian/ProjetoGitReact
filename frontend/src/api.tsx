import axios from "axios"
import {
  CompanyBalanceSheet,
  CompanyCashFlow,
  CompanyIncomeStatement,
  CompanyKeyMetrics,
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


export const getIncomeStatement = async (query: string) => {
  try {
    const data = await axios.get(
      `https://api.twelvedata.com/fundamentals?symbol=${query}&apikey=${process.env.REACT_APP_API_KEY}`
    );

    return data.data?.income_statement?.annual || [];
  } catch (error: any) {
    console.log("error message: ", error.message);
  }
};

export const getBalanceSheet = async (query: string) => {
  try {
    const data = await axios.get(
      `https://api.twelvedata.com/fundamentals?symbol=${query}&apikey=${process.env.REACT_APP_API_KEY}`
    );

    return data.data?.balance_sheet?.annual || [];
  } catch (error: any) {
    console.log("error message: ", error.message);
  }
};

export const getCashFlow = async (query: string) => {
  try {
    const data = await axios.get(
      `https://api.twelvedata.com/fundamentals?symbol=${query}&apikey=${process.env.REACT_APP_API_KEY}`
    );

    return data.data?.cash_flow?.annual || [];
  } catch (error: any) {
    console.log("error message: ", error.message);
  }
};