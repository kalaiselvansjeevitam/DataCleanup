import React from "react";

interface StateItem {
  [state: string]: string;
}

interface QualificationRow {
  qualification: string;
  states: StateItem[];
}

interface HeatmapTableProps {
  data: QualificationRow[];
}

const HeatmapTable: React.FC<HeatmapTableProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex justify-center items-center h-full text-gray-500 text-sm">
        No data available
      </div>
    );
  }

  const locations: string[] = Array.from(
    new Set(data.flatMap((row) => row.states.map((s) => Object.keys(s)[0]))),
  );

  const allScores: number[] = data
    .flatMap((row) => row.states.map((s) => Number(Object.values(s)[0])))
    .filter((n) => !isNaN(n));

  const min = Math.min(...allScores);
  const max = Math.max(...allScores);
  // const colorMap = [
  // "bg-red-100", 
  // "bg-red-100",
  // "bg-yellow-200", 
  // "bg-yellow-200", 
  // "bg-orange-200", 
  // "bg-purple-300", 
  // "bg-purple-400",
  // "bg-blue-400", 
  // "bg-blue-800", 
  // ];

  const colorMap = [
    "bg-blue-100",
    "bg-blue-100",
    "bg-blue-300",
    "bg-blue-300",
    "bg-blue-400",
    "bg-blue-400",
    "bg-blue-600",
    "bg-blue-600",
    "bg-blue-800",
  ];

  const getColor = (score: number | null) => {
    if (score === null || isNaN(score)) return "bg-white";

    const logMin = Math.log(min === 0 ? 1 : min);
    const logMax = Math.log(max);
    const logScore = Math.log(score);

    const normalized = (logScore - logMin) / (logMax - logMin);
    const index = Math.floor(normalized * (colorMap.length - 1));

    return colorMap[index];
  };

  return (
    <div className="relative w-full overflow-x-auto">
      <table className="min-w-full table-fixed border-collapse border border-gray-300 text-xs">
        <thead className="sticky top-0 bg-white z-[5]">
          <tr>
            <th className="border border-gray-300 p-2 bg-gray-100 w-40">
              Qualification
            </th>
            {locations.map((loc) => ( 
              <th
                key={loc}
                className="border border-gray-300 p-2 bg-gray-100 text-center"
              >
                {loc}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.qualification} className="h-[50px]">
              <td className="border border-gray-300 p-2 font-bold whitespace-nowrap">
                {row.qualification}
              </td>

              {locations.map((loc) => {
                const stateObj = row.states.find((s) => s[loc] !== undefined);
                const score = stateObj ? Number(stateObj[loc]) : NaN;
                return (
                  <td
                    key={loc}
                    className={`border border-gray-300 font-bold text-center p-2 ${getColor(
                      isNaN(score) ? null : score,
                    )}`}
                  >
                    {isNaN(score) ? "-" : score.toLocaleString()}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HeatmapTable;
