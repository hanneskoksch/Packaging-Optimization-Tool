import { Plugin } from "chart.js";

const image = new Image();
image.src = "scatter_chart_overlay.png";

/**
 * A Chart.js plugin that displays a background image behind the chart.
 *
 * Can be configured to show or hide the background image using the custom plugin option `showBackgroundImage`.
 *
 * See https://www.chartjs.org/docs/latest/developers/plugins.html
 * and https://www.chartjs.org/docs/latest/general/options.html#plugin-options
 */
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
