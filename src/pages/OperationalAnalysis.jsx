import AnalysisTemplate from "../components/AnalysisTemplate";

export default function OperationalAnalysis() {
  return (
    <AnalysisTemplate
      title="تحليل المخاطر التشغيلية"
      type="operational_risk"
      color="yellow"
      predictionField="op_risk_prediction"
      requiredFields={[
        "system_uptime", "employee_errors_last_month", "training_coverage_rate",
        "incident_reports", "support_staff_count"
      ]}
    />
  );
}