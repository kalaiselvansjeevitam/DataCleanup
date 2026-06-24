export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";
export const VITE_BASE_PATH = import.meta.env.VITE_BASE_PATH || "";

export const ROUTE_URL = {
  login: "/DataCleanup/login",
  dashboard: "/DataCleanup/",
  analytics: "/DataCleanup/analytics",
};

export const API_URL = {
  login: "/adminUserLogin",
  dashboard_data: "/dashboard_data",
  category_details: "/categorywise_details",
  locations: "/top10StatesQualifications",
  category_treemap: "/category_treemap",
  gender_distribution: "/gender_distribution",
  SourceQualificationSegment_dashboard: "/SourceQualificationSegment_dashboard",
  salary_vs_age: "/salary_vs_age",
  qualification_vs_specialization: "/qualification_vs_specialization",
  untapped_data: "/untapped_data",
  ivr_reachouts: "/ivr_reachouts",
  locations_dropdown: "/locations_dropdown",
  qualifications_dropdown: "/qualifications_dropdown",
  funnel_chart: "/funnel_chart",
};
