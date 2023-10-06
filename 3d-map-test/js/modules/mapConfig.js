// mapConfig.js

define([
  "esri/WebScene",
  "esri/views/SceneView"
], function(WebScene, SceneView) {
  return {
    setupScene: function() {
      let activeWidget;

      const scene = new WebScene({
        portalItem: {
          id: "f3b79c16e4a84c278ab69d94a938f49e"
        },
      });

      const mapView = new SceneView({
        map: scene,
        container: "viewDiv",
        qualityProfile: "high",
        padding: {left: 49},
        environment: {
          weather: {
            type: "cloudy",
            cloudCover: 0.2
          },
          atmosphere: {
            quality: "high"
          },
          lighting: {
            waterReflectionEnabled: true,
            ambientOcclusionEnabled: true
          }
        }
      });
      return mapView;
    }
  };
});
