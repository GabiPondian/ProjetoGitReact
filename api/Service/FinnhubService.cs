using System.Net.Http.Json;
using api.Interfaces;
using api.Models;

namespace api.Service
{
    public class FinnhubService : IFinnhubService
    {
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _configuration;

        public FinnhubService(HttpClient httpClient, IConfiguration configuration)
        {
            _httpClient = httpClient;
            _configuration = configuration;
        }

        public async Task<Stock?> FindStockBySymbolAsync(string symbol)
        {
            var token = _configuration["Finnhub:ApiKey"];

            var result = await _httpClient.GetFromJsonAsync<Stock>(
                $"/quote?symbol={symbol}&token={token}"
            );

            return result;
        }

        public async Task<string> SearchCompaniesAsync(string query)
        {
            var token = _configuration["Finnhub:ApiKey"];

            var response = await _httpClient.GetStringAsync(
                $"/search?q={query}&token={token}"
            );

            return response;
        }
    }
}