import { useEffect, useState } from "react";
import HeatmapTable from "../../app/components/Analysis/HeatMap";
import Layout from "../../app/components/Layout/Layout";
import {
  Tooltip,
  ResponsiveContainer,
  ScatterChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Scatter,
} from "recharts";
// import TreeMapGapContent from "../../app/components/Analysis/TreeMapContent";
// import TreemapComponent from "../../app/components/Analysis/TreeMap";
import FunnelChartComponent from "../../app/components/Analysis/FunnelChart";
import ScatterChartComponent from "../../app/components/Analysis/ScatterGraph";
import PieChartComponent from "../../app/components/Analysis/PieChart";
import BarChartComponent from "../../app/components/Analysis/BarChart";
import {
  // defaultFunnelData,
  // heatmapData,
  pieColors,
  // placementFunnelData,
  // qualificationData,
  // qualificationSourceData,
  // rankingTable,
  // salaryAgeData,
  // segmentData,
  // sourceData,
  // SuggestionsTable,
  // treeMapData,
} from "./shared/data";
import {
  useGetCategoryTreeMap,
  useGetFunnelChart,
  useGetFunnelChartWithoutFilter,
  useGetGenderDistribution,
  useGetIVRReachedOut,
  useGetLocationDropDown,
  useGetLocations,
  useGetQualificationDropDown,
  useGetQualificationVsSpecialization,
  useGetSalaryVsAge,
  useGetSourceQualificationSegment,
} from "../../app/core/api/Dashboard.service";
import type {
  CategoryTreemapItem,
  GenderDistributionItem,
  IVRReachedOut,
  LocationItem,
  QualificationCount,
  QualificationVsSpecializationItem,
  SalaryVsAgeItem,
  SegmentPercentage,
  SourceCount,
} from "../../app/lib/types";
import { Loader } from "lucide-react";
import React from "react";
import FunnelFilterChartComponent from "../../app/components/Analysis/FunnelFilterChart";

export const Analytics = () => {
  const [formData, setFormData] = useState({
    qualification: "",
    salary: "",
    location: "",
    age: "",
  });

  const [animatedFunnelData, setAnimatedFunnelData] = useState<IVRReachedOut[]>(
    [],
  );
  const { mutateAsync: getLocation } = useGetLocations();
  const { mutateAsync: getCategoryTreeMap } = useGetCategoryTreeMap();
  const { mutateAsync: getSalaryAge } = useGetSalaryVsAge();
  const { mutateAsync: getQualificationSpecialization } =
    useGetQualificationVsSpecialization();
  const { mutateAsync: getGenderDistribution } = useGetGenderDistribution();
  const { mutateAsync: getSourceQualificationSegment } =
    useGetSourceQualificationSegment();

  const { mutateAsync: getIVRReachedOut } = useGetIVRReachedOut();

  const { mutateAsync: getlocationDropDown } = useGetLocationDropDown();

  const { mutateAsync: getQualificationDropDown } =
    useGetQualificationDropDown();
  const { mutateAsync: getFunnelChart } = useGetFunnelChart();
  const { mutateAsync: getFunnelChartWithoutFilter } =
    useGetFunnelChartWithoutFilter();

  const [Heatmaploading, SetHeatmapLoading] = useState(false);
  const [salaryAgeloading, SetsalaryAgeLoading] = useState(false);
  const [treeMaploading, SettreeMapLoading] = useState(false);
  const [
    qualificationSpecializationloading,
    SetqualificationSpecializationLoading,
  ] = useState(false);
  const [genderDistributionloading, SetgenderDistributionLoading] =
    useState(false);
  const [sourceQualificationloading, SetsourceQualificationLoading] =
    useState(false);
  const [IVRReachedOutloading, SetIVRReachedOutLoading] = useState(false);
  const [locationQualificationloading, SetlocationQualificationLoading] =
    useState(false);

  const [submitbutton, setSubmitbutton] = useState(false);
  const [submitbuttonDisable, setSubmitbuttonDisable] = useState(false);
  const [heatmapData, setHeatmapData] = useState<LocationItem[]>([]);
  const [treemapData, setTreemapData] = useState<CategoryTreemapItem[]>([]);
  const [salaryAgeData, setsalaryAgeData] = useState<SalaryVsAgeItem[]>([]);
  const [qualificationSpecializationData, setQualificationSpecializationData] =
    useState<QualificationVsSpecializationItem[]>([]);
  const [genderDistribution, setgenderDistribution] = useState<
    GenderDistributionItem[]
  >([]);
  const [sorceCount, setsorceCount] = useState<SourceCount[]>([]);
  const [qualificationCount, setqualificationCount] = useState<
    QualificationCount[]
  >([]);
  const [segmentPercentage, setsegmentPercentage] = useState<
    SegmentPercentage[]
  >([]);

  const [ivrReachOut, setivrReachOut] = useState<IVRReachedOut[]>([]);
  // const [funnelChartData, setfunnelChartData] = useState<IVRReachedOut[]>([]);

  const [locationOptions, setLocationOptions] = React.useState<string[]>([]);
  const [qualificationOptions, setQualificationOptions] = React.useState<
    string[]
  >([]);

  useEffect(() => {
    const fetchDashboard = async () => {
      await SetlocationQualificationLoading(true);
      await SetIVRReachedOutLoading(true);
      await SetsourceQualificationLoading(true);
      await SetqualificationSpecializationLoading(true);
      await SetHeatmapLoading(true);
      await SetsalaryAgeLoading(true);
      await SettreeMapLoading(true);
      await SetgenderDistributionLoading(true);
      try {
        const locres = await getLocation();
        if (locres?.list) {
          setHeatmapData(locres.list);
        }
        SetHeatmapLoading(false);
      } catch (err) {
        console.error("Error fetching dashboard data", err);
        SetHeatmapLoading(false);
      } finally {
        SetHeatmapLoading(false);
      }

      try {
        const salaryAgeRes = await getSalaryAge();
        if (salaryAgeRes?.list) {
          setsalaryAgeData(salaryAgeRes.list);
        }
        SetsalaryAgeLoading(false);
      } catch (err) {
        console.log("Error Fetching salary vs Age", err);
        SetsalaryAgeLoading(false);
      } finally {
        SetsalaryAgeLoading(false);
      }

      try {
        const treeMapRes = await getCategoryTreeMap();
        if (treeMapRes?.list) {
          const formattedData = treeMapRes.list.map((item) => ({
            ...item,
            size: Number(item.size),
          }));
          setTreemapData(formattedData);
        }
        SettreeMapLoading(false);
      } catch (err) {
        console.log("Error fetching Tree Map Data");
        SettreeMapLoading(false);
      }

      try {
        const qualificationSpecializationRes =
          await getQualificationSpecialization();
        if (qualificationSpecializationRes?.list) {
          setQualificationSpecializationData(
            qualificationSpecializationRes.list,
          );
        }
        SetqualificationSpecializationLoading(false);
      } catch (err) {
        console.log("Error fetching qualification and specaialization", err);
        SetqualificationSpecializationLoading(false);
      } finally {
        SetqualificationSpecializationLoading(false);
      }

      try {
        const genderDistributionRes = await getGenderDistribution();
        if (genderDistributionRes?.list) {
          setgenderDistribution(genderDistributionRes.list);
        }
        SetgenderDistributionLoading(false);
      } catch (err) {
        console.log("Error fetching gender distribution", err);
        SetgenderDistributionLoading(false);
      } finally {
        SetgenderDistributionLoading(false);
      }

      try {
        const sourceQualificationSegmentRes =
          await getSourceQualificationSegment();
        if (sourceQualificationSegmentRes?.data?.qualification_count) {
          setqualificationCount(
            sourceQualificationSegmentRes.data.qualification_count,
          );
          setsorceCount(sourceQualificationSegmentRes.data.source_count);
          // setsegmentPercentage(sourceQualificationSegmentRes.data.segment_percentage);
          const formattedSegmentData =
            sourceQualificationSegmentRes.data.segment_percentage.map(
              (item) => ({
                ...item,
                percentage: Number(item.percentage),
              }),
            );
          setsegmentPercentage(formattedSegmentData);
        }
        SetsourceQualificationLoading(false);
      } catch (err) {
        console.log("Error fetching Source and Qualification", err);
        SetsourceQualificationLoading(false);
      } finally {
        SetsourceQualificationLoading(false);
      }

      try {
        const IVRReachedOutRes = await getIVRReachedOut();
        if (IVRReachedOutRes?.list) {
          setivrReachOut(IVRReachedOutRes.list);
        }
        SetIVRReachedOutLoading(false);
      } catch (err) {
        console.log("Error fetching a IVR reach Outs", err);
        SetIVRReachedOutLoading(false);
      } finally {
        SetIVRReachedOutLoading(false);
      }
      try {
        const FunnelChartRes = await getFunnelChartWithoutFilter();
        if (FunnelChartRes?.list) {
          setAnimatedFunnelData(FunnelChartRes.list);
        }
      } catch (err) {
        console.log("Error fetching FunnelChartRes", err);
      }

      try {
        const locationResponse = await getlocationDropDown();
        const qualificationResponse = await getQualificationDropDown();

        // Extract names for locations
        if (locationResponse?.list) {
          setLocationOptions(locationResponse.list.map((loc: any) => loc.name));
        }

        // Extract names for qualifications
        if (qualificationResponse?.list) {
          setQualificationOptions(
            qualificationResponse.list.map((q: any) => q.name),
          );
        }

        SetlocationQualificationLoading(false);
      } catch (err) {
        console.log("Error fetching DropDowns", err);
        SetlocationQualificationLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updatedForm = { ...prev, [name]: value };

      // Check if all fields are filled
      const allSelected = Object.values(updatedForm).every((v) => v !== "");
      setSubmitbuttonDisable(allSelected);
      setSubmitbutton(true);

      return updatedForm;
    });
  };

  const handleFilter = async (e: React.FormEvent) => {
    SetlocationQualificationLoading(true);
    await setAnimatedFunnelData([]);
    e.preventDefault();
    console.log("Submitted Filters:", formData);
    setSubmitbutton(true);
    const FunnelChartRes = await getFunnelChart({
      qualification: formData.qualification,
      salary: formData.salary,
      location: formData.location,
      age_group: formData.age,
    });
    if (FunnelChartRes?.list) {
      // setfunnelChartData(FunnelChartRes.list);
      setAnimatedFunnelData([]);

      SetlocationQualificationLoading(false);

      FunnelChartRes.list.forEach((item: IVRReachedOut, i: number) => {
        setTimeout(() => {
          setAnimatedFunnelData((prev) => [...prev, item]);
        }, i * 300);
      });
    }

    // const sleep = (ms: number) =>
    //       new Promise((resolve) => setTimeout(resolve, ms));
    //     await sleep(2000);
    // Reset current data
    // SetlocationQualificationLoading(false);
    // await funnelChartData.forEach((item, i) => {
    //   setTimeout(() => {
    //     setAnimatedFunnelData((prev) => [...prev, item]);
    //   }, i * 300);
    // });
  };

  // const suggestions: Column[] = [
  //   { key: "jobList", label: "", align: "center" },
  //   { key: "count", label: "Count", align: "center" },
  //   { key: "live", label: "Live", align: "center" },
  // ];

  // const ranking: Column[] = [
  //   { key: "jobList", label: "", align: "center" },
  //   { key: "fiftyToSixty", label: "50-60%", align: "center" },
  //   { key: "sixtyToSeventy", label: "60-70%", align: "center" },
  //   { key: "seventyToEighty", label: "70-80%", align: "center" },
  //   { key: "eightyToNinety", label: "80-90%", align: "center" },
  // ];

  // const qualificationOptions = ["B.Tech", "M.Tech", "MBA"];
  // const locationOptions = ["Bangalore", "Chennai", "Delhi", "Mumbai"];
  const salaryOptions = [
    "0L - 1L",
    "1L - 2L",
    "2 L - 3L",
    "3 L - 4L",
    "4 L - 5L",
  ];
  const ageOptions = ["18 - 25", "25 - 30", "30 - 35", "35 - 40", "40+"];

  // unique mappings
  const qualifications = [
    ...new Set(qualificationSpecializationData.map((d) => d.qualification)),
  ];
  const specializations = [
    ...new Set(qualificationSpecializationData.map((d) => d.specialization)),
  ];

  const processedData = qualificationSpecializationData.map((d) => ({
    ...d,
    specializationIndex: specializations.indexOf(d.specialization),
    qualificationIndex: qualifications.indexOf(d.qualification),
  }));

  return (
    <Layout headerTitle="Analytics">
      <div className="p-4 space-y-6 ">
        {/* Row 1: Heatmap + Funnel */}
        <div className="grid grid-cols-1 gap-4">
          {/* Heatmap */}
          <div className="bg-white shadow rounded-xl p-3 flex flex-col h-full">
            <h2 className="text-sm font-semibold mb-2 text-blue-600">
              Qualification - States
            </h2>
            <div className="h-[300px] overflow-auto">
              {Heatmaploading ? (
                <div className="flex justify-center py-6">
                  <Loader className="animate-spin w-6 h-6 text-purple-600" />
                </div>
              ) : (
                <HeatmapTable data={heatmapData} />
              )}
            </div>
          </div>

          {/* Funnel */}
          <div className="bg-white shadow rounded-xl p-3">
            <h2 className="text-sm font-semibold mb-2 text-blue-600">
              Category
            </h2>
            <div className="h-[300px]">
              {treeMaploading ? (
                <div className="flex justify-center items-center h-full">
                  <Loader className="animate-spin w-6 h-6 text-purple-600" />
                </div>
              ) : (
                <BarChartComponent
                  data={treemapData}
                  dataKey="size"
                  categoryKey="name"
                  layout="vertical"
                  fillColor="#8884d8"
                  height={300}
                />
              )}
            </div>
          </div>
        </div>

        {/* Row 2: Gantt + Scatter */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white shadow rounded-xl p-3">
            <h2 className="text-sm font-semibold mb-2 text-blue-600">
              Reachouts (vs) Responses (vs) Positive Responses
            </h2>
            <div className="h-75 pl-25">
              {IVRReachedOutloading ? (
                <div className="flex justify-center items-center h-full">
                  <Loader className="animate-spin w-6 h-6 text-purple-600" />
                </div>
              ) : (
                <FunnelChartComponent
                  data={ivrReachOut}
                  isAnimationActive={!submitbutton}
                  height="h-68"
                  colors={["#4CAF50", "#FF9800", "#F44336"]}
                />
              )}
            </div>
          </div>

          {/* Scatter Graph */}
          <div className="bg-white shadow rounded-xl p-3 space-y-4">
            {/* Filters */}
            <form onSubmit={handleFilter}>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {/* Qualification */}
                <div className="flex flex-col">
                  <label
                    htmlFor="qualification"
                    className="text-sm font-medium mb-1"
                  >
                    Qualification :
                  </label>
                  <select
                    id="qualification"
                    name="qualification"
                    value={formData.qualification}
                    onChange={handleChange}
                    className="border p-2 rounded text-sm"
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    {qualificationOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Salary */}
                <div className="flex flex-col">
                  <label htmlFor="salary" className="text-sm font-medium mb-1">
                    Salary :
                  </label>
                  <select
                    id="salary"
                    name="salary"
                    value={formData.salary}
                    onChange={handleChange}
                    className="border p-2 rounded text-sm"
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    {salaryOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Location */}
                <div className="flex flex-col">
                  <label
                    htmlFor="location"
                    className="text-sm font-medium mb-1"
                  >
                    Location :
                  </label>
                  <select
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="border p-2 rounded text-sm"
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    {locationOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Age */}
                <div className="flex flex-col">
                  <label htmlFor="age" className="text-sm font-medium mb-1">
                    Age :
                  </label>
                  <select
                    id="age"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    className="border p-2 rounded text-sm"
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    {ageOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Submit Button */}
                <div className="flex flex-col justify-end">
                  <button
                    type="submit"
                    disabled={!submitbuttonDisable}
                    className={`py-2 px-4 rounded h-10 ${
                      submitbuttonDisable
                        ? "bg-blue-600 text-white"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    Filter
                  </button>
                </div>
              </div>
            </form>

            {/* Funnel Chart */}
            <div className="h-56 pl-25">
              {locationQualificationloading ? (
                <div className="flex justify-center items-center h-full">
                  <Loader className="animate-spin w-6 h-6 text-purple-600" />
                </div>
              ) : (
                <FunnelFilterChartComponent
                  data={animatedFunnelData}
                  isAnimationActive={!submitbutton}
                  height="h-56"
                  colors={["#2196F3", "#9C27B0", "#00BCD4", "#E91E63"]}
                />
              )}
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {/* Scatter Graph 1: Salary vs Age */}
          <div className="bg-white shadow rounded-xl p-3 h-94">
            <h2 className="text-sm font-semibold mb-2 text-blue-600">
              Salary vs Age
            </h2>
            {salaryAgeloading ? (
              <div className="flex justify-center items-center h-full">
                <Loader className="animate-spin w-6 h-6 text-purple-600" />
              </div>
            ) : (
              <ScatterChartComponent
                data={salaryAgeData}
                height="h-78"
                xAxis={
                  <XAxis
                    type="category"
                    dataKey="age_group"
                    name="Age"
                    label={{
                      value: "Age",
                      position: "insideBottom",
                      offset: -20, // move label down
                      style: {
                        textAnchor: "middle",
                        fontSize: 14,
                        fill: "#374151",
                        fontWeight: "bold",
                      },
                    }}
                  />
                }
                yAxis={
                  <YAxis
                    type="number"
                    dataKey="salary"
                    name="Salary"
                    label={{
                      value: "Salary",
                      angle: -90,
                      position: "left", // 👈 use "left" instead of "insideLeft"
                      offset: 20, // 👈 push it away from ticks
                      style: {
                        textAnchor: "middle",
                        fontSize: 14,
                        fill: "#374151",
                        fontWeight: "bold",
                      },
                    }}
                  />
                }
                scatterProps={{ name: "Candidates", fill: "#8884d8" }}
              />
            )}
          </div>

          {/* Scatter Graph 2: Qualification vs Source */}
          <div className="bg-white shadow rounded-xl p-3 h-94">
            <h2 className="text-sm font-semibold mb-2 text-blue-600">
              Qualification vs Specialization
            </h2>
            {qualificationSpecializationloading ? (
              <div className="flex justify-center items-center h-full">
                <Loader className="animate-spin w-6 h-6 text-purple-600" />
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart
                  margin={{ top: 20, right: 20, bottom: 80, left: 15 }}
                >
                  <CartesianGrid />
                  <XAxis
                    dataKey="specializationIndex"
                    type="number"
                    ticks={specializations.map((_, i) => i)}
                    interval={0} // show every label
                    width={140} // space for labels
                    tick={{ fontSize: 10 }}
                    angle={-55} // tilt labels
                    textAnchor="end"
                    tickFormatter={(i: number) => {
                      const label = specializations[i];
                      return label.length > 15
                        ? label.slice(0, 15) + "..."
                        : label;
                    }}
                    label={{
                      value: "Specialization",
                      position: "insideBottom",
                      offset: -60, // move label down
                      style: {
                        textAnchor: "middle",
                        fontSize: 12,
                        fill: "#374151",
                        fontWeight: "bold",
                      },
                    }}
                  />

                  <YAxis
                    dataKey="qualificationIndex"
                    type="number"
                    ticks={qualifications.map((_, i) => i)}
                    tick={{ fontSize: 10 }}
                    // width={70}
                    tickFormatter={(i: number) => {
                      const label = qualifications[i];
                      return label.length > 8
                        ? label.slice(0, 8) + "..."
                        : label;
                    }}
                    label={{
                      value: "Qualification",
                      angle: -90,
                      position: "left", // 👈 use "left" instead of "insideLeft"
                      // offset: 40, // 👈 push it away from ticks
                      style: {
                        textAnchor: "middle",
                        fontSize: 12,
                        fill: "#374151",
                        fontWeight: "bold",
                      },
                    }}
                  />
                  <Scatter data={processedData} fill="#8884d8" shape="circle" />

                  <Tooltip
                    cursor={{ strokeDasharray: "3 3" }}
                    formatter={(value, name, props) => {
                      // show full specialization + qualification in tooltip
                      if (name === "specialization")
                        return props.payload.specialization;
                      if (name === "qualification")
                        return props.payload.qualification;
                      return value;
                    }}
                  />

                  {/* <Scatter
                    data={qualificationSpecializationData}
                    fill="#8884d8"
                    shape="circle"
                  /> */}
                </ScatterChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* Layered Pie Chart: Gender */}
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {/* Horizontal Bar Chart (Source vs Count) */}
          <div className="bg-white shadow rounded-xl p-3">
            <h2 className="text-sm font-semibold mb-2 text-blue-600">
              Source Count
            </h2>
            {sourceQualificationloading ? (
              <div className="flex justify-center items-center h-full">
                <Loader className="animate-spin w-6 h-6 text-purple-600" />
              </div>
            ) : (
              <BarChartComponent
                data={sorceCount}
                dataKey="count"
                categoryKey="source"
                layout="vertical"
                fillColor="#8884d8"
                height={200}
              />
            )}
          </div>

          <div className="bg-white shadow rounded-xl p-3">
            <h2 className="text-sm font-semibold mb-2 text-blue-600">
              Qualification Count
            </h2>
            {sourceQualificationloading ? (
              <div className="flex justify-center items-center h-full">
                <Loader className="animate-spin w-6 h-6 text-purple-600" />
              </div>
            ) : (
              <BarChartComponent
                data={qualificationCount}
                dataKey="count"
                categoryKey="name"
                layout="horizontal"
                fillColor="#82ca9d"
                height={200}
              />
            )}
          </div>

          {/* Pie Chart (Segments A/B/C/D/P) */}
          <div className="bg-white shadow rounded-xl p-3">
            <h2 className="text-sm font-semibold mb-2 text-blue-600">
              Segments
            </h2>
            {sourceQualificationloading ? (
              <div className="flex justify-center items-center h-full">
                <Loader className="animate-spin w-6 h-6 text-purple-600" />
              </div>
            ) : (
              <PieChartComponent
                data={segmentPercentage}
                dataKey="percentage"
                nameKey="segment"
                height="h-52"
                colors={pieColors}
              />
            )}
          </div>

          <div className="bg-white shadow rounded-xl p-3 h-64">
            <h2 className="text-sm font-semibold mb-2 text-blue-600">
              Gender Distribution
            </h2>
            {genderDistributionloading ? (
              <div className="flex justify-center items-center h-full">
                <Loader className="animate-spin w-6 h-6 text-purple-600" />
              </div>
            ) : (
              <PieChartComponent
                data={genderDistribution.map((d) => ({
                  ...d,
                  value: Number(d.value),
                }))}
                dataKey="value"
                nameKey="name"
                height="h-52"
              />
            )}
          </div>
        </div>

        {/* <div className="grid md:grid-cols-2 gap-4 mt-6"> */}
        {/* Suggestions Table */}
        {/* <div className="bg-white shadow rounded-xl p-4">
            <h2 className="text-lg font-semibold mb-3 text-blue-600">
              Suggestions
            </h2>
            <div className="overflow-x-auto text-sm">
              <TableComponent
                columns={suggestions}
                data={SuggestionsTable}
                itemsPerPage={5}
              />
            </div>
          </div> */}

        {/* Ranking Table */}
        {/* <div className="bg-white shadow rounded-xl p-4">
            <h2 className="text-lg font-semibold mb-3 text-blue-600">
              Ranking
            </h2>
            <div className="overflow-x-auto text-sm">
              <TableComponent
                columns={ranking}
                data={rankingTable}
                itemsPerPage={3}
              />
            </div>
          </div> */}
        {/* </div> */}
      </div>
    </Layout>
  );
};

export default Analytics;
