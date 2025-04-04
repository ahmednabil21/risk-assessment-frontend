import AnalysisTemplate from "../components/AnalysisTemplate";

export default function ChurnAnalysis() {
  return (
    <AnalysisTemplate
      title="تحليل مغادرة العملاء"
      type="churn"
      color="blue"
      predictionField="predicted_exit"
      requiredFields={[
        "age", "gender", "geography", "balance", "account_tenure",
        "num_of_products", "has_cr_card", "is_active_member", "estimated_salary"
      ]}
    />
  );
}