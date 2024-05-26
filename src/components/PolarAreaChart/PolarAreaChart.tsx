import { PolarArea } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

interface GenerationMix {
  fuel: string;
  perc: number;
}

interface PolarAreaChartProps {
  generationMix: GenerationMix[];
}

function PolarAreaChart({ generationMix }: PolarAreaChartProps) {
  const data = generationMix.map((mix) => mix.perc);
  const labels = generationMix.map((mix) => mix.fuel);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Energy Generation",
        data,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(199, 199, 199, 0.2)",
          "rgba(83, 102, 255, 0.2)",
          "rgba(60, 179, 113, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(199, 199, 199, 1)",
          "rgba(83, 102, 255, 1)",
          "rgba(60, 179, 113, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<"polarArea"> = {
    maintainAspectRatio: false,
    scales: {
      r: {
        grid: {
          color: "rgba(255, 255, 255, 0.1)", // Change the color of the grid lines (circles)
        },
      },
    },
  };

  return (
    <div>
      <div style={{ width: "80vw", height: "80vh" }}>
        <PolarArea data={chartData} options={options} />
      </div>
    </div>
  );
}

export default PolarAreaChart;
