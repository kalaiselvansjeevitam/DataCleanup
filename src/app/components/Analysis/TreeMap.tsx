import React from "react";
import {
  ResponsiveContainer,
  Treemap,
  Tooltip,
  type TreemapProps,
} from "recharts";

interface TreemapComponentProps {
  data: TreemapProps["data"];
  width?: number;
  height?: number;
  dataKey?: string;
  content?: TreemapProps["content"];
  isAnimationActive?: boolean; // Add this prop
}

const defaultContent = undefined;

const TreemapComponent: React.FC<TreemapComponentProps> = ({
  data,
  width = 400,
  height = 200,
  dataKey = "size",
  content = defaultContent,
  isAnimationActive = true, // Default to false if you want to disable
}) => {
  const hasData = Array.isArray(data) && data.length > 0;
  return (
    <div className="h-[300px]">
      {hasData ? (
        <ResponsiveContainer width="100%" height="100%">
          <Treemap
            width={width}
            height={height}
            data={data}
            dataKey={dataKey}
            stroke="#fff"
            fill="#b29fc5ff"
            content={content}
            isAnimationActive={isAnimationActive}
          >
            <Tooltip />
          </Treemap>
        </ResponsiveContainer>
      ) : (
        <p className="text-gray-500 text-sm">No data available</p>
      )}
    </div>
  );
};

export default TreemapComponent;
