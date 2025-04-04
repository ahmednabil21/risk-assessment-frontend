import AnalysisTemplate from "../components/AnalysisTemplate";

export default function FraudAnalysis() {
  return (
    <AnalysisTemplate
      title="تحليل الاحتيال المالي"
      type="fraud"
      color="red"
      predictionField="fraud_prediction"
      requiredFields={[
        "amount", "transaction_type", "is_foreign", "is_high_risk_country",
        "customer_age", "time_of_day", "account_age_months", "num_prev_transactions"
      ]}
    />
  );
}