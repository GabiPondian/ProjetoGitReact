namespace api.Dtos.Stock
{
    public class FinnhubStockProfile
    {
        public string ticker { get; set; } = string.Empty;
        public string name { get; set; } = string.Empty;
        public string finnhubIndustry { get; set; } = string.Empty;
        public double? marketCapitalization { get; set; }
    }
}
