import React, { useState } from "react";
import Plot from "react-plotly.js";

const Graph = ({ attendanceData }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const filterDataByDateRange = () => {
    if (!startDate || !endDate || !attendanceData) return []; 

    const start = new Date(startDate);
    const end = new Date(endDate);

    return attendanceData.filter((entry) => {
      const date = new Date(entry.date);
      return date >= start && date <= end;
    });
  };

  const filteredData = filterDataByDateRange();
  const xValues = filteredData.map((entry) => new Date(entry.date));
  const yValues = filteredData.map((entry) => entry.totalHours);

  const plotData = {
    x: xValues,
    y: yValues,
    type: "bar",
  };

  return (
    <div className="p-4 md:p-8">
      <div className="mb-4 text-center">
        <label className="mr-2">Start Date:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1"
        />
      </div>
      <div className="mb-4 text-center">
        <label className="mr-2">End Date:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1"
        />
      </div>
      <div className="border border-gray-300 rounded-lg shadow-md overflow-hidden">
        <Plot
          data={[plotData]}
          layout={{
            autosize: true,
            margin: { t: 50, b: 50, l: 50, r: 50 },
            title: "Attendance Report",
            xaxis: { title: "Date", automargin: true },
            yaxis: { title: "Total Hours", automargin: true },
          }}
          style={{ width: "100%", height: "100%" }}
          className="md:max-w-xl md:mx-auto"
        />
      </div>
    </div>
  );
};

export default Graph;
