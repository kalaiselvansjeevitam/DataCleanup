export interface GetResultAndMessage {
  result: string;
  message: string;
}

export interface DashboardCategory {
  category: string;
  count: number;
}

export interface DashboardSegment {
  segment: string;
  count: number;
}

export interface DashboardItem {
  category: DashboardCategory[];
  segments: DashboardSegment[];
  "Total Data": number | string;
}

export interface GetDashboardData extends GetResultAndMessage {
  list: DashboardItem[];
}

export interface CategoryDetail {
  title: string;
  segments: string[];
  qualifications: string[];
  cities: string[];
}

export interface GetCategoryDetails extends GetResultAndMessage {
  list: CategoryDetail[];
}

export interface StateItem {
  [state: string]: string;
}

export interface LocationItem {
  qualification: string;
  states: StateItem[];
}

export interface GetLocations extends GetResultAndMessage {
  list: LocationItem[];
}

export interface CategoryTreemapItem {
  name: string;
  size: number;
  [key: string]: any;
}

export interface GetCategoryTreemap extends GetResultAndMessage {
  list: CategoryTreemapItem[];
}

export interface GenderDistributionItem {
  name: string;
  value: string;
}

export interface GetGenderDistribution extends GetResultAndMessage {
  list: GenderDistributionItem[];
}

export interface SourceCount {
  source: string;
  count: number;
}

export interface QualificationCount {
  name: string;
  count: number;
}

export interface SegmentPercentage {
  segment: string;
  percentage: number;
}

export interface SourceQualificationSegmentData {
  source_count: SourceCount[];
  qualification_count: QualificationCount[];
  segment_percentage: SegmentPercentage[];
}

export interface GetSourceQualificationSegmentDashboard
  extends GetResultAndMessage {
  data: SourceQualificationSegmentData;
}

export interface SalaryVsAgeItem {
  age_group: string;
  salary: string;
}

export interface GetSalaryVsAge extends GetResultAndMessage {
  list: SalaryVsAgeItem[];
}

export interface QualificationVsSpecializationItem {
  qualification: string;
  specialization: string;
}

export interface GetQualificationVsSpecialization extends GetResultAndMessage {
  list: QualificationVsSpecializationItem[];
}

export interface UntappedDataItem {
  segment: string;
  count: number;
  timeline: string;
  source: string;
}

export interface GetUntappedData extends GetResultAndMessage {
  count: number;
  data: UntappedDataItem[];
}

export interface IVRReachedOut {
  value: number;
  name: string;
}

export interface GetIVRReachedOut extends GetResultAndMessage {
  list: IVRReachedOut[];
}

export interface DropDown {
  name: string;
}

export interface GetLocationsDropdown extends GetResultAndMessage {
  list: DropDown[];
}

export interface funnel {
  name: string;
}

export interface GetFunnelChart extends GetResultAndMessage {
  list: IVRReachedOut[];
}
