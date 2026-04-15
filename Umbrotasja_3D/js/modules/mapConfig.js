// mapConfig.js  Define the webScene and setting the environment

define([
  //"esri/WebScene",
  "esri/views/SceneView"
], function(
    //WebScene,
    SceneView) {
  return {
    setupScene: function(map) {

      // Make new 3D SceneView
      const mapView = new SceneView({
        container: "mapContainer", //changed from "viewDiv" to "mapContainer"
        map: map,
        viewingMode: "global", 
        camera: {
          position: [-22, 62.5, 150000],
          heading: 0,
          tilt: 45
        },
        environment: {
          weather: {
            type: "cloudy",
            cloudCover: 0.2
          },
          atmosphere: {
            quality: "high"
          },
        }
      });
      
      // Read URL parameters
      const urlParams = new URLSearchParams(window.location.search);
      const x = parseFloat(urlParams.get('x'));
      const y = parseFloat(urlParams.get('y'));
      const z = parseFloat(urlParams.get('z'));
      const tilt = parseFloat(urlParams.get('tilt'));
      const heading = parseFloat(urlParams.get('heading'));

      // If x, y, and z are valid, set the camera
      if (x && y && z) {
        mapView.when(() => {
          mapView.camera = {
            position: {
              x: x,
              y: y,
              z: z,
              spatialReference: mapView.spatialReference
            },
            tilt: tilt || 0,  // Default to 0 if not provided
            heading: heading || 0  // Default to 0 if not provided
          };
        });
      }
      
      return mapView;
    }    
  };
});
