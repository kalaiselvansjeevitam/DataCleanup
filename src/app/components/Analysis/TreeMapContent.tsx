const TreeMapGapContent = (props: any) => {
  const { x, y, width, height, name, size, fill } = props;

  const gap = 4;

  // Skip tiny blocks
  if (width <= gap || height <= gap) return null;

  return (
    <g>
      {/* White background block for spacing */}
      <rect x={x} y={y} width={width} height={height} fill="#fff" />

      {/* Colored inner block */}
      <rect
        x={x + gap / 2}
        y={y + gap / 2}
        width={width - gap}
        height={height - gap}
        fill={fill}
        rx={3}
      />

      {/* Normal weight name text */}
      <text
        x={x + width / 2}
        y={y + height / 2 - 4}
        textAnchor="middle"
        fill="#000"
        fontSize={10}
        pointerEvents="none"
      >
        {name}
      </text>

      {/* Count */}
      <text
        x={x + width / 2}
        y={y + height / 2 + 8}
        textAnchor="middle"
        fill="#333"
        fontSize={10}
        pointerEvents="none"
      >
        {size}
      </text>
    </g>
  );
};

export default TreeMapGapContent;
