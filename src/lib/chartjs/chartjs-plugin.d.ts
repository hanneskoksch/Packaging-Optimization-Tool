import "chart.js"; // Import for module augmentation

// Augment the plugin options interface for all chart types
// enabling a custom option for the background plugin.
// see https://www.chartjs.org/docs/latest/general/options.html#plugin-options
declare module "chart.js" {
  interface PluginOptionsByType {
    background?: {
      showBackgroundImage?: boolean;
    };
  }
}
