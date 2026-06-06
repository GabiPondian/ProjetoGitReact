using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Stock;
using api.Models;

namespace api.Mappers
{
    public static class StockMappers
    {
        public static StockDto ToStockDto(this Stock stockModel)
        {
            return new StockDto
            {
                Id = stockModel.Id,
                Symbol = stockModel.Symbol,
                CompanyName = stockModel.CompanyName,
                Purchase = stockModel.Purchase,
                LastDiv = stockModel.LastDiv,
                Industry = stockModel.Industry,
                MarketCap = stockModel.MarketCap,
                Comments = stockModel.Comments.Select(c => c.ToCommentDto()).ToList()
            };
        }

        public static Stock ToStockFromCreateDTO(this CreateStockRequestDto stockDto)
        {
            return new Stock
            {
                Symbol = stockDto.Symbol,
                CompanyName = stockDto.CompanyName,
                Purchase = stockDto.Purchase,
                LastDiv = stockDto.LastDiv,
                Industry = stockDto.Industry,
                MarketCap = stockDto.MarketCap
            };
        }

        public static Stock ToStockFromFinnhub(
            this FinnhubStockProfile profile,
            FinnhubQuote? quote,
            FinnhubMetricResponse? metrics)
        {
            return new Stock
            {
                Symbol = profile.ticker,
                CompanyName = profile.name,
                Purchase = (decimal)(quote?.c ?? 0),
                LastDiv = (decimal)(metrics?.metric?.dividendPerShareAnnual ?? 0),
                Industry = profile.finnhubIndustry,
                MarketCap = (long)((profile.marketCapitalization ?? 0) * 1_000_000)
            };
        }
    }
}
