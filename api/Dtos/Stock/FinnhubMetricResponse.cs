namespace api.Dtos.Stock
{
    public class FinnhubMetricResponse
    {
        public FinnhubStockMetric? metric { get; set; }
    }

    public class FinnhubStockMetric
    {
        public double? dividendPerShareAnnual { get; set; }
    }
}
