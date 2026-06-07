using api.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("api/finnhub")]
    public class FinnhubController : ControllerBase
    {
        private readonly IFinnhubService _finnhubService;

        public FinnhubController(IFinnhubService finnhubService)
        {
            _finnhubService = finnhubService;
        }

        [HttpGet("search")]
        public async Task<IActionResult> Search(string query)
        {
            var result = await _finnhubService.SearchCompaniesAsync(query);
            return Ok(result);
        }

        [HttpGet("{symbol}")]
        public async Task<IActionResult> GetStock(string symbol)
        {
            var result = await _finnhubService.FindStockBySymbolAsync(symbol);

            if (result == null)
                return NotFound();

            return Ok(result);
        }
    }
}