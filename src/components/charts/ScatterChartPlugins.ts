import { Plugin } from "chart.js";

const image = new Image();
image.src = "scatter_chart_overlay.png";

export const backgroundImageArePlugin: Plugin = {
  id: "background-image",
  beforeDraw: (chart) => {
    if (image.complete) {
      const ctx = chart.ctx;
      const { chartArea } = chart;

      ctx.drawImage(
        image,
        chartArea.left,
        chartArea.top,
        chartArea.right - chartArea.left,
        chartArea.bottom - chartArea.top,
      );
    } else {
      image.onload = () => chart.draw();
    }
  },
};
