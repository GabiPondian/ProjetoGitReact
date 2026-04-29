import React, { SyntheticEvent } from 'react'

interface Props {
  onPortfolioDelete: (e:SyntheticEvent) => void;
  portfolioValue: string;
}

const DeletePortfolio = ({onPortfolioDelete, portfolioValue}: Props) => {
  return (
    <>
    <form onSubmit={onPortfolioDelete}>
        <input hidden={true} value={portfolioValue} />
        <button>X</button>
    </form>
    </>
  );
}

export default DeletePortfolio