import React from "react";
import {
  ResponsiveContainer,
  FunnelChart,
  Funnel,
  Tooltip,
  LabelList,
  Cell,
} from "recharts";

interface FunnelChartComponentProps {
  data: { name: string; value: number }[];
  height: string;
  isAnimationActive?: boolean;
  colors?: string[];
}

const defaultColors = ["#A855F7", "#D946EF", "#818CF8", "#4ADE80"];

const FunnelFilterChartComponent: React.FC<FunnelChartComponentProps> = ({
  data,
  height,
  isAnimationActive = false,
  colors = defaultColors,
}) => {
  const hasData = Array.isArray(data) && data.length > 0;

  // 🔹 Override values with constant width for static funnel
  // instead of all 100, taper values manually
  const staticData = data.map((d, i) => ({
    ...d,
    fakeValue: 100 - i * 27, // 🔹 taper down each step
  }));

  return (
    <div className={`flex items-center justify-center ${height}`}>
      {hasData ? (
        <ResponsiveContainer width="100%" height="100%">
          <FunnelChart margin={{ right: 80 }}>
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const { name, value } = payload[0].payload;
                  return (
                    <div className="bg-white shadow-md rounded p-2 text-xs text-gray-700">
                      <strong>{name}</strong>: {value}
                    </div>
                  );
                }
                return null;
              }}
            />

            <Funnel
              dataKey="fakeValue"
              data={staticData}
              isAnimationActive={isAnimationActive}
            >
              <LabelList
                position="left"
                dataKey="value"
                content={(props: any) => {
                  const { name, value, x, y, height, width } = props;

                  const safeY = (y ?? 0) + (height ?? 0) / 2;
                  const safeX = (x ?? 0) + (width ?? 0) + 120;

                  return (
                    <text
                      x={safeX}
                      y={safeY}
                      textAnchor="end" // 🔹 align text to the right edge (towards funnel)
                      dominantBaseline="middle"
                      fontSize={12}
                      fontWeight="bold"
                      fill="#111"
                    >
                      {`${name}: ${value}`}
                    </text>
                  );
                }}
              />

              {staticData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Funnel>
          </FunnelChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-gray-500 text-sm">No data available</p>
      )}
    </div>
  );
};

export default FunnelFilterChartComponent;
