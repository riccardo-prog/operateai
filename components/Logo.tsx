import React from "react";

interface LogoProps {
  size?: number;
  className?: string;
}

export default function Logo({ size = 28, className }: LogoProps) {
  const cx = 50;
  const cy = 50;
  const radius = 38;
  const centerDotRadius = 6;
  const nodeDotRadius = 4.5;

  // Node positions (angles in radians from top, clockwise)
  // Top: 12 o'clock (270deg), Lower-left: ~7 o'clock (210deg), Right: ~4 o'clock (120deg)
  const nodes = [
    { angle: -90 },   // top (12 o'clock)
    { angle: 210 },   // lower-left (~7 o'clock)
    { angle: 330 },   // right (~4-5 o'clock)
  ].map(({ angle }) => {
    const rad = (angle * Math.PI) / 180;
    return {
      x: cx + radius * Math.cos(rad),
      y: cy + radius * Math.sin(rad),
    };
  });

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer ring */}
      <circle
        cx={cx}
        cy={cy}
        r={radius}
        stroke="currentColor"
        strokeWidth={5}
        fill="none"
        className="text-[#38BDF8]"
      />

      {/* Lines from center to nodes */}
      {nodes.map((node, i) => (
        <line
          key={`line-${i}`}
          x1={cx}
          y1={cy}
          x2={node.x}
          y2={node.y}
          stroke="#F1F5F9"
          strokeWidth={2.5}
          strokeLinecap="round"
        />
      ))}

      {/* Center dot */}
      <circle cx={cx} cy={cy} r={centerDotRadius} fill="#F1F5F9" />

      {/* Outer nodes */}
      {nodes.map((node, i) => (
        <circle
          key={`node-${i}`}
          cx={node.x}
          cy={node.y}
          r={nodeDotRadius}
          fill="#F1F5F9"
        />
      ))}
    </svg>
  );
}
