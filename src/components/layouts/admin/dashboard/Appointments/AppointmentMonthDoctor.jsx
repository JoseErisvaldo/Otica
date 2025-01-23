import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import supabaseRequest from "../../../../../services/api/supabaseRequest";

const AppointmentMonthDoctor = () => {
  const [chartData, setChartData] = useState({
    series: [],
    options: {
      chart: {
        type: "bar",
        height: 350,
        stacked: true,
        stackType: "100%",
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      stroke: {
        width: 1,
        colors: ["#fff"],
      },
      title: {
        text: "",
      },
      xaxis: {
        categories: [],
      },
      tooltip: {
        y: {
          formatter: (val) => `${val} Consultas`,
        },
      },
      fill: {
        opacity: 1,
      },
      legend: {
        position: "top",
        horizontalAlign: "left",
        offsetX: 40,
      },
    },
  });


  const fetchData = async () => {
    try {
      const response = await supabaseRequest({
        table: "dashboard_view_appointment_month_doctor",
        method: "GET",
      });
      const apiData = response;
      // Transformar os dados da API para o formato do gráfico
      const categories = [...new Set(apiData.map((item) => item.appointment_date))];
      const seriesData = [...new Set(apiData.map((item) => item.name))].map((name) => {
        return {
          name,
          data: categories.map(
            (date) =>
              apiData.find(
                (item) => item.appointment_date === date && item.name === name
              )?.count || 0
          ),
        };
      });
      setChartData((prev) => ({
        ...prev,
        series: seriesData,
        options: {
          ...prev.options,
          xaxis: {
            categories: categories,
          },
        },
      }));
    } catch (error) {
      console.error("Erro ao buscar os dados da API:", error);
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
        type="bar"
        height={350}
        className="p-5"
      />
    </div>
  );
};

export default AppointmentMonthDoctor;
