import AnalysisTemplate from "../components/AnalysisTemplate";

export default function GeoAnalysis() {
  return (
    <AnalysisTemplate
      title="تحليل الأمان الجغرافي"
      type="geo_risk"
      color="pink"
      predictionField="geo_risk_prediction"
      requiredFields={[
        "region", "is_urban", "distance_to_police_km",
        "crime_rate", "avg_monthly_incidents", "has_private_security"
      ]}
    />
  );
}