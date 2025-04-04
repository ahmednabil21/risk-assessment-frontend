import AnalysisTemplate from "../components/AnalysisTemplate";

export default function MarketAnalysis() {
  return (
    <AnalysisTemplate
      title="تحليل مخاطر السوق"
      type="market_risk"
      color="purple"
      predictionField="market_risk_prediction"
      requiredFields={[
        "exchange_rate_volatility", "interest_rate", "market_index_change"
      ]}
    />
  );
}