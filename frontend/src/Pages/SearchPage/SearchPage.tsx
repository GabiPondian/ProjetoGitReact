import React, { useState, ChangeEvent, SyntheticEvent, useEffect } from "react";
import { CompanySearch } from "../../company";
import { SearchCompanies } from "../../api";
import Search from "../../Components/Search/Search";
import ListPortfolio from "../../Components/Portfolio/ListPortfolio/ListPortfolio";
import CardList from "../../Components/CardList/CardList";
import { PortfolioGet } from "../../Models/Portfolio";
import {
  portfolioAddAPI,
  portfolioDeleteAPI,
  portfolioGetAPI,
} from "../../Services/PortfolioService";
import { toast } from "react-toastify";

const SearchPage = () => {
  const [search, setSearch] = useState("");
  const [portfolioValues, setPortfolioValues] = useState<PortfolioGet[]>([]);
  const [searchResult, setSearchResult] = useState<CompanySearch[]>([]);
  const [serverError, setServerError] = useState<string | null>(null);

  useEffect(() => {
    getPortfolio();
  }, []);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const getPortfolio = async () => {
    try {
      const res = await portfolioGetAPI();
      setPortfolioValues(res?.data ?? []);
    } catch {
      setPortfolioValues([]);
    }
  };

  const onPortfolioCreate = async (e: any) => {
    e.preventDefault();

    try {
      const symbol = e.target[0].value;
      const res = await portfolioAddAPI(symbol);

      if (res?.status === 204 || res?.status === 200) {
        toast.success("Stock added to portfolio!");
        getPortfolio();
      }
    } catch {
      toast.warning("Could not add stock to portfolio!");
    }
  };

  const onPortfolioDelete = async (e: any) => {
    e.preventDefault();

    try {
      const symbol = e.target[0].value;
      const res = await portfolioDeleteAPI(symbol);

      if (res?.status === 200 || res?.status === 204) {
        toast.success("Stock deleted from portfolio!");
        getPortfolio();
      }
    } catch {
      toast.error("Error deleting stock!");
    }
  };

  const onSearchSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      const result = await SearchCompanies(search);

      if (typeof result === "string") {
        setServerError(result);
        setSearchResult([]);
        return;
      }

      setServerError(null);
      setSearchResult(result?.data ?? []);
    } catch {
      setServerError("API error");
      setSearchResult([]);
    }
  };

  return (
    <>
      <Search
        onSearchSubmit={onSearchSubmit}
        search={search}
        handleSearchChange={handleSearchChange}
      />

      <ListPortfolio
        portfolioValues={portfolioValues}
        onPortfolioDelete={onPortfolioDelete}
      />

      <CardList
        searchResults={searchResult ?? []}
        onPortfolioCreate={onPortfolioCreate}
      />

      {serverError && <div>Unable to connect to API</div>}
    </>
  );
};

export default SearchPage;