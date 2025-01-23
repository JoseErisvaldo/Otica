import { Card, CardBody, CardHeader, Typography } from "@material-tailwind/react";
import Chart from "react-apexcharts";
import { Square3Stack3DIcon } from "@heroicons/react/24/outline";

const PieChartQtdStock = ({ viewStockMinimum, viewStockMaximum, viewStockLimit }) => {
  const chartConfig = {
    type: "pie",
    width: 280,
    height: 280,
    series: [viewStockMinimum, viewStockMaximum, viewStockLimit],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      title: {
        show: "",
      },
      dataLabels: {
        enabled: true,
        formatter: (val, opts) => {
          const seriesIndex = opts.seriesIndex;
          const labels = ["Estoque abaixo", "Estoque acima", "Estoque no limite"];
          return `${labels[seriesIndex]}: ${val}`;
        },
        style: {
          fontSize: '12px',
          fontWeight: 'bold',
          colors: ['#fff'],
        },
      },
      colors: ["#020617", "#ff8f00", "#00897b", "#1e88e5", "#d81b60"],
      legend: {
        show: false,
      },
    },
  };

  return (
    <Card>
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
      >
        <Chart {...chartConfig} />
s      </CardHeader>
    </Card>
  );
};

export default PieChartQtdStock;
