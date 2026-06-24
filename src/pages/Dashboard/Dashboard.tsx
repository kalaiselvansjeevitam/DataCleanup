import { useEffect, useState } from "react";
import Layout from "../../app/components/Layout/Layout";
import TableComponent, {
  type Column,
} from "../../app/components/shared/TableComponent";
// import { Button } from "../../app/components/ui/button";
import {
  useGetCategoryDetails,
  useGetDashBoardData,
} from "../../app/core/api/Dashboard.service";
import { Loader } from "lucide-react";
// import Swal from "sweetalert2";

export const Dashboard = () => {
  const { mutateAsync: getDashboardData } = useGetDashBoardData();
  const { mutateAsync: getCategoryDetails } = useGetCategoryDetails();
  const [catColsTable, setCatColsTable] = useState<any[]>([]);
  const [uncatColsTable, setUncatColsTable] = useState<any[]>([]);
  const [categorizedTotalData, setcategorizedTotalData] = useState(0);
  const [LoaderDashboard, SetLoaderDashboard] = useState(false);
  // const [LoaderCard, SetLoaderCard] = useState(false);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        SetLoaderDashboard(true);
        // const sleep = (ms: number) =>
        //   new Promise((resolve) => setTimeout(resolve, ms));
        // await sleep(2000);
        const res = await getDashboardData();
        if (res?.list?.length > 0) {
          const data = res.list[0];
          // categories table
          const formattedCategories = data.category.map((cat: any) => ({
            category: cat.category,
            count: cat.count,
            callAssigned: Math.floor(Math.random() * 50),
          }));
          setCatColsTable(formattedCategories);
          // segments table
          setUncatColsTable(data.segments);
          const safeTotal = Number(data["Total Data"]) || 0;
          setcategorizedTotalData(safeTotal);
        }
        const resCard = await getCategoryDetails();
        if (resCard?.list?.length > 0) {
          setSelectedCards(resCard.list);
        } else {
          setSelectedCards([]);
        }
        SetLoaderDashboard(false);
      } catch (err) {
        console.error("Error fetching dashboard data", err);
        SetLoaderDashboard(false);
      } finally {
        SetLoaderDashboard(false);
      }
    };

    fetchDashboard();
  }, []);

  const unCatCols: Column[] = [
    { key: "segment", label: "Segments", align: "center" },
    { key: "count", label: "Count", align: "center" },
  ];

  // const untappedData: Column[] = [
  //   { key: "segment", label: "Segment", align: "center" },
  //   { key: "count", label: "Count", align: "center" },
  //   { key: "timeline", label: "Timeline", align: "center" },
  //   { key: "source", label: "Source", align: "center" },
  // ];
  // const UnTappedTable = [
  //   {
  //     segment: "Jobs",
  //     count: "2",
  //     timeline: "33",
  //     source: "kyndryl",
  //   },
  //   {
  //     segment: "Flexi Assist",
  //     count: "32",
  //     timeline: "23",
  //     source: "IBM",
  //   },
  //   {
  //     segment: "Sales Scout",
  //     count: "22",
  //     timeline: "53",
  //     source: "Varthana",
  //   },
  //   {
  //     segment: "Up Skilling",
  //     count: "12",
  //     timeline: "63",
  //     source: "IBM",
  //   },
  //   {
  //     segment: "Cross Skilling",
  //     count: "32",
  //     timeline: "13",
  //     source: "kyndryl",
  //   },
  // ];

  const [selectedCards, setSelectedCards] = useState<any[]>([]);

  const catCols: Column[] = [
    { key: "category", label: "Category", align: "center" },
    {
      key: "count",
      label: "Count",
      align: "center",
      // render: (_value, row) => (
      //   <Button
      //     className="bg-purple hover:bg-purple"
      //     onClick={async () => {
      //       try {
      //         SetLoaderCard(true);
      //         const res = await getCategoryDetails({ category: row.category });
      //         if (res?.list?.length > 0) {
      //           setSelectedCards(res.list);
      //         } else {
      //           setSelectedCards([]);
      //         }
      //         SetLoaderCard(false);
      //         if (res.result == "Failure") {
      //           Swal.fire("Error", res.message, "error");
      //         }
      //       } catch (error: any) {
      //         console.error("Error fetching category details", error);
      //         Swal.fire("Error", error?.response?.data?.message, "error");
      //         SetLoaderCard(false);
      //         setSelectedCards([]);
      //       } finally {
      //         SetLoaderCard(false);
      //       }
      //     }}
      //   >
      //     {row.count}
      //   </Button>
      // ),
    },
  ];

  return (
    <Layout headerTitle="Dashboard">
      <div className="space-y-10 p-6">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white shadow rounded-xl p-3">
            {/* <h2 className="text-lg font-semibold mb-3 text-blue-600">
                Uncategorized
              </h2> */}
            <div className="max-h-100 overflow-y-auto pr-2 text-sm">
              <div className="bg-white rounded-lg p-4 text-center h-70 flex flex-col justify-center">
                <p className="text-gray-800 font-bold text-lg mb-2 whitespace-nowrap overflow-hidden text-ellipsis">
                  Total Data
                </p>
                {LoaderDashboard ? (
                  <p className="text-2xl font-semibold text-blue-700">0</p>
                ) : (
                  <p className="text-2xl font-semibold text-blue-700">
                    {categorizedTotalData}
                  </p>
                )}
              </div>
            </div>
          </div>
          {/* Category */}
          <div className="bg-white shadow rounded-xl p-3">
            {/* <h2 className="text-lg font-semibold mb-3 text-blue-600">
                Categories
              </h2> */}
            <div className="max-h-64 overflow-y-auto pr-2 text-sm">
              {LoaderDashboard ? (
                <div className="flex justify-center py-4">
                  <Loader className="animate-spin w-6 h-6 text-blue-600" />
                </div>
              ) : (
                <TableComponent
                  columns={catCols}
                  data={catColsTable}
                  itemsPerPage={5}
                />
              )}
            </div>
          </div>
          <div className="bg-white shadow rounded-xl p-3">
            {/* <h2 className="text-lg font-semibold mb-3 text-blue-600">
                  Segments
                </h2> */}
            <div className="max-h-64 overflow-y-auto pr-2 text-sm">
              {LoaderDashboard ? (
                <div className="flex justify-center py-4">
                  <Loader className="animate-spin w-6 h-6 text-blue-600" />
                </div>
              ) : (
                <TableComponent
                  columns={unCatCols}
                  data={uncatColsTable}
                  itemsPerPage={3}
                />
              )}
            </div>
          </div>
        </div>

        {LoaderDashboard ? (
          <div className="flex justify-center py-6">
            <Loader className="animate-spin w-6 h-6 text-purple-600" />
          </div>
        ) : selectedCards.length === 0 ? (
          <div className="p-6 text-center text-gray-500 bg-gray-50 rounded-xl">
            No data found
          </div>
        ) : (
          <div className="overflow-x-auto p-3">
            <div className="flex gap-6 pb-4 overflow-x-auto">
              {selectedCards.map((card, idx) => (
                <div
                  key={idx}
                  className="min-w-[320px] shrink-0 bg-white p-6 rounded-xl shadow-md hover:shadow-xl border-t-4 border-purple-600 transition-shadow duration-300"
                >
                  {/* Card Header */}
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-purple-800">
                      {card.title}
                    </h3>
                    {/* <p className="text-xs text-gray-500">
              Detailed stats for {card.title}
            </p> */}
                  </div>

                  {/* Card Content */}
                  <div className="space-y-3 text-sm text-gray-700">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="font-semibold text-purple-700 mb-2">
                        Top Segments
                      </p>
                      <ul className="space-y-1 text-gray-600 text-xs list-disc list-inside">
                        {card.segments.map((item: string, i: number) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="font-semibold text-purple-700 mb-2">
                        Top Qualifications
                      </p>
                      <ul className="space-y-1 text-gray-600 text-xs list-disc list-inside">
                        {card.qualifications.map((item: string, i: number) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="font-semibold text-purple-700 mb-2">
                        Top Cities
                      </p>
                      <ul className="space-y-1 text-gray-600 text-xs list-disc list-inside">
                        {card.cities.map((item: string, i: number) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* <div className="grid md:grid-cols-2 gap-4 mt-6"> */}
        {/* UnTapped Table */}
        {/* <div className="bg-white shadow rounded-xl p-4">
            <h2 className="text-lg font-semibold mb-3 text-blue-600">
              Untapped Data for Works
            </h2>
            <div className="overflow-x-auto text-sm">
              <TableComponent
                columns={untappedData}
                data={UnTappedTable}
                itemsPerPage={5}
              />
            </div>
          </div> */}

        {/* Map Table */}
        {/* <div className="bg-white shadow rounded-xl p-4">
            <h2 className="text-lg font-semibold mb-3 text-blue-600">Map</h2>
          </div>
        </div> */}
      </div>
    </Layout>
  );
};
export default Dashboard;
