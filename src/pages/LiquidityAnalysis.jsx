import AnalysisTemplate from "../components/AnalysisTemplate";

export default function LiquidityAnalysis() {
  return (
    <AnalysisTemplate
      title="تحليل مخاطر السيولة"
      type="liquidity_risk"
      color="green"
      predictionField="liquidity_risk_prediction"
      requiredFields={[
        "daily_cash_flow", "daily_liabilities", "cash_reserve", "cash_ratio"
      ]}
    />
  );
}