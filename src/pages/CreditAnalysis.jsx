import AnalysisTemplate from "../components/AnalysisTemplate";

export default function CreditAnalysis() {
  return (
    <AnalysisTemplate
      title="تحليل مخاطر الائتمان"
      type="credit_risk"
      color="indigo"
      predictionField="credit_risk_prediction"
      requiredFields={[
        "payment_history", "loan_amount", "monthly_income", "debt_to_income"
      ]}
    />
  );
}