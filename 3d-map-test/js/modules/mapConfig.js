// mapConfig.js  Define the webScene and setting the environment

define([
  "esri/WebScene",
  "esri/views/SceneView"
], function(WebScene, SceneView) {
  return {
    setupScene: function() {

      const scene = new WebScene({
        portalItem: {
          id: "f3b79c16e4a84c278ab69d94a938f49e"
        },
      });

      const mapView = new SceneView({
        map: scene,
        container: "viewDiv",
        qualityProfile: "high",
       // padding: {left: 49}, //for the case that I will add side bar to the left not right and will not be docked in the mapView container
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
