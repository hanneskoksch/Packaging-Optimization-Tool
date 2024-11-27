import { useEffect, useRef } from "react";
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
);

const DivergingBarChart = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const ctx = canvasRef.current.getContext("2d");

    const data = {
      labels: ["Banana", "Orange", "Grape", "Peach", "Plum", "Apple"],
      datasets: [
        {
          label: "Store A",
          data: [-11.8, -50.2, -51.7, -56.9, -74, -81], // Negative values for left
          backgroundColor: "rgba(75, 192, 192, 0.8)",
        },
        {
          label: "Store B",
          data: [89.2, 49.8, 48.3, 43.1, 26, 19], // Positive values for right
          backgroundColor: "rgba(255, 99, 132, 0.8)",
        },
      ],
    };

    const myChart = new Chart(ctx!, {
      type: "bar",
      data: data,
      options: {
        indexAxis: "y", // Horizontal chart
        responsive: true,
        plugins: {
          legend: {
            position: "bottom", // Legend below the chart
          },
          tooltip: {
            callbacks: {
              label: (tooltipItem) => {
                const value = Number(tooltipItem.raw);
                return `${tooltipItem.dataset.label}: ${Math.abs(value)}%`; // Show only absolute values
              },
            },
          },
        },
        scales: {
          x: {
            beginAtZero: true,
            ticks: {
              callback: (value) => `${Math.abs(Number(value))}%`, // Show only absolute values
            },
          },
          y: {
            stacked: true, // Bars of the same group on same height
          },
        },
      },
    });

    // Cleanup function to destroy chart instance
    return () => {
      myChart.destroy();
    };
  }, []);

  return <canvas ref={canvasRef}></canvas>;
};

export default DivergingBarChart;
