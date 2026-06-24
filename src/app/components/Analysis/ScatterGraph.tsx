import React from "react";
import {
  ResponsiveContainer,
  ScatterChart,
  CartesianGrid,
  Tooltip,
  Scatter,
} from "recharts";
import type { XAxisProps, YAxisProps, ScatterProps } from "recharts";

interface ScatterChartComponentProps<T> {
  data: T[];
  height?: string;
  xAxis: React.ReactElement<XAxisProps>;
  yAxis: React.ReactElement<YAxisProps>;
  scatterProps: Partial<ScatterProps>;
}

const ScatterChartComponent = <T,>({
  data,
  height = "h-64",
  xAxis,
  yAxis,
  scatterProps,
}: ScatterChartComponentProps<T>) => {
  const hasData = Array.isArray(data) && data.length > 0;

  return (
    <div className={`flex items-center justify-center ${height}`}>
      {hasData ? (
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 20, bottom: 30, left: 40 }}>
            <CartesianGrid />
            {xAxis}
            {yAxis}
            <Tooltip cursor={{ strokeDasharray: "3 3" }} />
            <Scatter data={data} {...scatterProps} />
          </ScatterChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-gray-500 text-sm">No data found</p>
      )}
    </div>
  );
};

export default ScatterChartComponent;
