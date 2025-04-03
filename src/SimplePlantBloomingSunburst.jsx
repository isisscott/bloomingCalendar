//SimplePlantBloomingSunburst

import React, { useState } from "react";
import { PieChart, Pie, Cell, Sector } from "recharts";

const SimplePlantBloomingSunburst = () => {
  // Data structure for the sunburst chart
  const seasons = [
    { name: "Winter", months: ["February", "January", "December"] },
    { name: "Fall", months: ["November", "October", "September"] },
    { name: "Summer", months: ["August", "July", "June"] },
    { name: "Spring", months: ["May", "April", "March"] },
  ];

  // Plant blooming data by month
  const plantData = {
    March: ["Daffodil", "Tulip", "Hyacinth"],
    April: ["Tulip", "Daffodil", "Cherry Blossom", "Azalea"],
    May: ["Peony", "Lilac", "Rose", "Iris"],
    June: ["Rose", "Peony", "Lavender"],
    July: ["Lily", "Sunflower", "Hydrangea", "Daylily"],
    August: ["Sunflower", "Dahlia", "Black-eyed Susan", "Coneflower"],
    September: ["Dahlia", "Aster", "Mum", "Goldenrod", "Sedum"],
    October: ["Mum", "Aster", "Stonecrop", "Goldenrod"],
    November: ["Mum", "Camellia", "Winter Jasmine"],
    December: ["Camellia", "Winter Jasmine", "Hellebore"],
    January: ["Hellebore", "Winter Aconite", "Snowdrop"],
    February: ["Snowdrop", "Winter Aconite"],
  };

  // Create data for the season ring (outer)
  const seasonData = seasons.map((season) => ({
    name: season.name,
    value: season.months.length,
  }));

  // Create data for the month ring (inner)
  const monthData = [];
  // Changed order to make it clockwise - we now iterate through seasons in reverse
  [...seasons].forEach((season) => {
    // We also reverse the months within each season
    [...season.months].forEach((month) => {
      monthData.push({
        name: month,
        season: season.name,
        value: 1,
      });
    });
  });

  // Colors for seasons
  const seasonColors = {
    Spring: "#c6d7b9",
    Summer: "#ff4e50",
    Fall: "#e49b0f",
    Winter: "#e3e3ff",
  };

  // State for active index
  const [activeIndex, setActiveIndex] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);

  // Handle mouse enter for pie slices
  const onPieEnter = (_, index) => {
    setActiveIndex(index);
    const month = monthData[index].name;
    setSelectedMonth(month);
  };

  // Handle mouse leave for pie slices
  const onPieLeave = () => {
    setActiveIndex(null);
    setSelectedMonth(null);
  };

  // Render active shape with pointer to center
  const renderActiveShape = (props) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } =
      props;

    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 6}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
      </g>
    );
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2
        style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}
      >
        Plant Blooming Calendar
      </h2>
      <div style={{ position: "relative", marginBottom: "32px" }}>
        <PieChart width={500} height={500}>
          <Pie
            data={seasonData}
            dataKey="value"
            cx={250}
            cy={250}
            outerRadius={200}
            innerRadius={150}
            fill="#8884d8"
          >
            {seasonData.map((entry, index) => (
              <Cell
                key={`cell-season-${index}`}
                fill={seasonColors[entry.name]}
              />
            ))}
          </Pie>
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={monthData}
            dataKey="value"
            cx={250}
            cy={250}
            innerRadius={80}
            outerRadius={140}
            onMouseEnter={onPieEnter}
            onMouseLeave={onPieLeave}
          >
            {monthData.map((entry, index) => (
              <Cell
                key={`cell-month-${index}`}
                fill={seasonColors[entry.season]}
                opacity={0.8}
              />
            ))}
          </Pie>
        </PieChart>
        {/* Season Labels */}
        <div style={{ position: "absolute", top: "128px", left: "128px" }}>
          <div style={{ position: "absolute", left: "205px", top: "250px" }}>
            <div style={{ fontWeight: "bold", fontSize: "18px" }}>Spring</div>
          </div>
          <div style={{ position: "absolute", left: "-40px", top: "220px" }}>
            <div style={{ fontWeight: "bold", fontSize: "18px" }}>Summer</div>
          </div>
          <div style={{ position: "absolute", left: "-30px", top: "10px" }}>
            <div style={{ fontWeight: "bold", fontSize: "18px" }}>Fall</div>
          </div>
          <div style={{ position: "absolute", left: "210px", top: "-18px" }}>
            <div style={{ fontWeight: "bold", fontSize: "18px" }}>Winter</div>
          </div>
        </div>

        {/* Month Labels */}
        {monthData.map((entry, index) => {
          const angle = 1800 - (index / monthData.length) * 360;
          const radians = angle * (Math.PI / 180);
          const x = 230 + Math.cos(radians) * 110;
          const y = 270 + Math.sin(radians) * 110;
          return (
            <div
              key={`month-label-${index}`}
              style={{
                position: "absolute",
                fontSize: "10px",
                fontWeight: "500",
                left: `${x}px`,
                top: `${y}px`,
                transform: "translate(-50%, -50%)",
              }}
            >
              {entry.name}
            </div>
          );
        })}

        {/* Center Content */}
        <div
          style={{
            position: "absolute",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            width: "140px",
            height: "140px",
            top: "180px",
            left: "180px",
          }}
        >
          {selectedMonth ? (
            <>
              <div style={{ fontWeight: "bold" }}>{selectedMonth}</div>
              <div style={{ fontSize: "12px", marginTop: "4px" }}>
                Blooming:
              </div>
              <div style={{ fontSize: "12px", marginTop: "4px" }}>
                {plantData[selectedMonth].slice(0, 3).join(", ")}
                {plantData[selectedMonth].length > 3 && "..."}
              </div>
            </>
          ) : (
            <div style={{ fontWeight: "bold" }}>
              Hover over a month to see plants
            </div>
          )}
        </div>
      </div>

      {/* Legend */}
      <div style={{ width: "100%", maxWidth: "400px" }}>
        {selectedMonth && (
          <div
            style={{
              backgroundColor: "#f1f1f1",
              padding: "16px",
              borderRadius: "8px",
            }}
          >
            <h3 style={{ fontWeight: "bold", marginBottom: "8px" }}>
              {selectedMonth} Blooming Plants:
            </h3>
            <ul style={{ paddingLeft: "20px" }}>
              {plantData[selectedMonth].map((plant, index) => (
                <li key={index}>{plant}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SimplePlantBloomingSunburst;
