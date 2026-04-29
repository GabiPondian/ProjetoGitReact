import React, { ChangeEvent, SyntheticEvent, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import CardList from './Components/CardList/CardList'
import Search from './Components/Search/Search';
import { CompanySearch } from './company';
import { SearchCompanies } from './api';
import ListPortfolio from './Components/Portfolio/ListPortfolio/ListPortfolio';

function App() {
  
    const [search,setSearch] = useState<string>("");
    const [portfolioValues, setPortfolioValues] = useState<string[]>([]);
    const [searchResult,setSearchResult] = useState<CompanySearch[]>([]);
    const [serverError,setServerError] = useState<string>("");

      const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) =>{
          setSearch(e.target.value);
          console.log(e);
      };

      const onPortfolioCreate = (e: any) => {
        e.preventDefault();
        const exists = portfolioValues.find((value => value === e.target[0].value));
        if(exists)return;
        const updatedPortfolio = [...portfolioValues, e.target[0].value];
        setPortfolioValues(updatedPortfolio);
      }

      const onSearchSubmit = async (e: SyntheticEvent) => {
          e.preventDefault();
         const result = await SearchCompanies(search);
          if(typeof result === "string"){
            setServerError(result);
          }else if (Array.isArray(result.data)){
            setSearchResult(result.data);
            console.log(result.data);
          }
      };

  return (
    <div className="App">
    <Search onSearchSubmit={onSearchSubmit} search={search} handleSearchChange={handleSearchChange}/>
    <ListPortfolio portfolioValues={portfolioValues}/>
    <CardList searchResults={searchResult} onPortfolioCreate={onPortfolioCreate}/>
    {serverError && <div>Unable to connect to API</div>}
    </div>
  );
}

export default App;
