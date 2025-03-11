import { Plugin } from "chart.js";

const image = new Image();
image.src = "scatter_chart_overlay.png";

export const backgroundImagePlugin: Plugin<"scatter"> = {
  id: "background",
  beforeDraw: (chart) => {
    // Read custom plugin option
    const shouldDisplayBackground =
      chart.options.plugins?.background?.showBackgroundImage;

    if (!shouldDisplayBackground) return;

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
