import { useMutation } from "@tanstack/react-query";
import { GET, POST } from "./axiosInstance";
import { API_URL } from "../constants/coreUrl";
import type {
  GetCategoryDetails,
  GetCategoryTreemap,
  GetDashboardData,
  GetFunnelChart,
  GetGenderDistribution,
  GetIVRReachedOut,
  GetLocations,
  GetLocationsDropdown,
  GetQualificationVsSpecialization,
  GetSalaryVsAge,
  GetSourceQualificationSegmentDashboard,
  GetUntappedData,
} from "../../lib/types";

export const useGetDashBoardData = () =>
  useMutation({
    mutationFn: () => {
      return POST<GetDashboardData>({
        url: API_URL.dashboard_data,
      });
    },
  });

export const useGetCategoryDetails = () =>
  useMutation({
    mutationFn: () => {
      return POST<GetCategoryDetails>({
        url: API_URL.category_details,
      });
    },
  });

export const useGetLocations = () =>
  useMutation({
    mutationFn: () => {
      return POST<GetLocations>({
        url: API_URL.locations,
      });
    },
  });
export const useGetCategoryTreeMap = () =>
  useMutation({
    mutationFn: () => {
      return POST<GetCategoryTreemap>({
        url: API_URL.category_treemap,
      });
    },
  });
export const useGetGenderDistribution = () =>
  useMutation({
    mutationFn: () => {
      return POST<GetGenderDistribution>({
        url: API_URL.gender_distribution,
      });
    },
  });
export const useGetSourceQualificationSegment = () =>
  useMutation({
    mutationFn: () => {
      return POST<GetSourceQualificationSegmentDashboard>({
        url: API_URL.SourceQualificationSegment_dashboard,
      });
    },
  });
export const useGetSalaryVsAge = () =>
  useMutation({
    mutationFn: () => {
      return POST<GetSalaryVsAge>({
        url: API_URL.salary_vs_age,
      });
    },
  });
export const useGetQualificationVsSpecialization = () =>
  useMutation({
    mutationFn: () => {
      return POST<GetQualificationVsSpecialization>({
        url: API_URL.qualification_vs_specialization,
      });
    },
  });
export const useGetUntappedData = () =>
  useMutation({
    mutationFn: () => {
      return POST<GetUntappedData>({
        url: API_URL.untapped_data,
      });
    },
  });

export const useGetIVRReachedOut = () =>
  useMutation({
    mutationFn: () => {
      return POST<GetIVRReachedOut>({
        url: API_URL.ivr_reachouts,
      });
    },
  });

export const useGetLocationDropDown = () =>
  useMutation({
    mutationFn: () => {
      return GET<GetLocationsDropdown>({
        url: API_URL.locations_dropdown,
      });
    },
  });

export const useGetQualificationDropDown = () =>
  useMutation({
    mutationFn: () => {
      return GET<GetLocationsDropdown>({
        url: API_URL.qualifications_dropdown,
      });
    },
  });

export const useGetFunnelChart = () =>
  useMutation({
    mutationFn: (data: {
      qualification: string;
      salary: string;
      location: string;
      age_group: string;
    }) => {
      return POST<GetFunnelChart>({
        url: API_URL.funnel_chart,
        data,
      });
    },
  });

export const useGetFunnelChartWithoutFilter = () =>
  useMutation({
    mutationFn: () => {
      return POST<GetFunnelChart>({
        url: API_URL.funnel_chart,
      });
    },
  });
