import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import supabaseRequest from "../../../../../services/api/supabaseRequest";

const AppointmentMonthDoctorPiewTotal  = () => {
  const [chartData, setChartData] = useState({
    series: [], // Will hold appointment counts
    options: {
      chart: {
        width: 380,
        type: 'pie',
      },
      labels: [], // Will hold doctor names
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    },
  });

  // Fetch data from the API
  const fetchData = async () => {
    try {
      const response = await supabaseRequest({
        table: "dashboard_view_appointment_month_doctor",
        method: "GET",
      });

      const apiData = response; // Data from API
      const doctorNames = [...new Set(apiData.map((item) => item.name))]; // Unique doctor names
      const appointmentCounts = doctorNames.map((name) => {
        return apiData
          .filter((item) => item.name === name)
          .reduce((total, item) => total + item.count, 0); // Sum appointments for each doctor
      });

      // Update the chart data
      setChartData({
        series: appointmentCounts,
        options: {
          ...chartData.options,
          labels: doctorNames, // Set doctor names as labels
        },
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="pie"
        width={380}
      />
    </div>
  );
};

export default AppointmentMonthDoctorPiewTotal;
