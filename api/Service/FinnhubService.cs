using api.Dtos.Stock;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Newtonsoft.Json;

namespace api.Service
{
    public class FinnhubService : IFinnhubService
    {
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _config;

        public FinnhubService(HttpClient httpClient, IConfiguration config)
        {
            _httpClient = httpClient;
            _config = config;
        }

        public async Task<Stock?> FindStockBySymbolAsync(string symbol)
        {
            try
            {
                var apiKey = _config["Finnhub:ApiKey"];

                if (string.IsNullOrWhiteSpace(apiKey))
                {
                    Console.WriteLine("Finnhub API key is missing.");
                    return null;
                }

                var normalizedSymbol = symbol.Trim().ToUpper();
                var escapedSymbol = Uri.EscapeDataString(normalizedSymbol);

                var profile = await GetAsync<FinnhubStockProfile>(
                    $"stock/profile2?symbol={escapedSymbol}&token={apiKey}"
                );

                if (profile == null || string.IsNullOrWhiteSpace(profile.ticker))
                {
                    return null;
                }

                var quote = await GetAsync<FinnhubQuote>(
                    $"quote?symbol={escapedSymbol}&token={apiKey}"
                );
                var metrics = await GetAsync<FinnhubMetricResponse>(
                    $"stock/metric?symbol={escapedSymbol}&metric=all&token={apiKey}"
                );

                return profile.ToStockFromFinnhub(quote, metrics);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        private async Task<T?> GetAsync<T>(string url)
        {
            var result = await _httpClient.GetAsync(url);

            if (!result.IsSuccessStatusCode)
            {
                return default;
            }

            var content = await result.Content.ReadAsStringAsync();
            return JsonConvert.DeserializeObject<T>(content);
        }
    }
}
