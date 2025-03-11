import "chart.js"; // Import for module augmentation

declare module "chart.js" {
  // Augment the plugin options interface for all chart types
  interface PluginOptionsByType {
    background?: {
      showBackgroundImage?: boolean;
    };
  }
}
