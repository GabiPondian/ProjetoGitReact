import React from 'react'

interface Props {
    portfolioValue: string;
}

function CardPortfolio({portfolioValue}: Props) {
  return (
    <>
    <h4>{portfolioValue}</h4>
    <button>X</button>
    </>
  )
}

export default CardPortfolio