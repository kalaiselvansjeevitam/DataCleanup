import React from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

interface PieChartComponentProps {
  data: { [key: string]: any }[];
  dataKey: string;
  nameKey: string;
  height?: string;
  colors?: string[];
  isAnimationActive?: boolean;
}

const defaultColors = ["#0088FE", "#FF69B4", "#00C49F", "#FFBB28"];

const PieChartComponent: React.FC<PieChartComponentProps> = ({
  data,
  dataKey,
  nameKey,
  height = "h-64",
  colors = defaultColors,
  isAnimationActive = false,
}) => {
  const hasData = Array.isArray(data) && data.length > 0;

  return (
    <div className="flex flex-col md:flex-row items-center gap-4 justify-center">
      {hasData ? (
        <>
          {/* Chart */}
          <div className={height} style={{ width: "200px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  dataKey={dataKey}
                  nameKey={nameKey}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  innerRadius={20}
                  labelLine={false}
                  isAnimationActive={isAnimationActive}
                >
                  {data.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={colors[index % colors.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="flex flex-col gap-2">
            {data.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-sm"
                  style={{ backgroundColor: colors[index % colors.length] }}
                />
                <span className="text-[10px] font-bold">
                  {item[nameKey]} ({item[dataKey]}%)
                </span>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="text-gray-500 text-sm">No data available</p>
      )}
    </div>
  );
};

export default PieChartComponent;
