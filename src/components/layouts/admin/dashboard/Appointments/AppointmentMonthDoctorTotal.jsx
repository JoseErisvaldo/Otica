import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import supabaseRequest from "../../../../../services/api/supabaseRequest";

const AppointmentMonthDoctorTotal = () => {
  const [chartData, setChartData] = useState({
    series: [],
    options: {
      chart: {
        type: "bar",
        height: 350,
        stacked: true,
        toolbar: {
          show: true,
        },
        zoom: {
          enabled: true,
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: "bottom",
              offsetX: -10,
              offsetY: 0,
            },
          },
        },
      ],
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 10,
          dataLabels: {
            total: {
              enabled: true,
              style: {
                fontSize: "13px",
                fontWeight: 900,
              },
            },
          },
        },
      },
      xaxis: {
        type: "category",
        categories: [], // Será preenchido com as datas
      },
      legend: {
        position: "right",
        offsetY: 40,
      },
      fill: {
        opacity: 1,
      },
    },
  });

  // Função para buscar e processar os dados da API
  const fetchData = async () => {
    try {
      const response = await supabaseRequest({
        table: "dashboard_view_appointment_month_doctor",
        method: "GET",
      });

      const apiData = response; // Dados da API
      const categories = [...new Set(apiData.map((item) => item.appointment_date))]; // Datas únicas
      const seriesData = [...new Set(apiData.map((item) => item.name))].map((name) => {
        return {
          name, // Nome do médico
          data: categories.map(
            (date) =>
              apiData.find(
                (item) => item.appointment_date === date && item.name === name
              )?.count || 0 // Contagem de consultas
          ),
        };
      });

      // Atualizar os dados do gráfico
      setChartData((prev) => ({
        ...prev,
        series: seriesData,
        options: {
          ...prev.options,
          xaxis: {
            ...prev.options.xaxis,
            categories: categories, // Atualizar categorias no eixo X
          },
        },
      }));
    } catch (error) {
      console.error("Erro ao buscar dados da API:", error);
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

export default AppointmentMonthDoctorTotal;
