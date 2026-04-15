// Setting up the camera info.
define([
    "esri/Camera",
    "esri/widgets/Expand",
    "esri/geometry/Point",
    "esri/layers/ElevationLayer"
  ], function(Camera, Expand, Point, ElevationLayer) {
    return {
        setupCameraPosition: function(mapView) {
        //code for creating zElement
        const zElement = document.createElement("div");
        zElement.id = "cameraZ";
        zElement.style.position = "absolute";
        zElement.style.bottom = "32px";
        zElement.style.right = "10px"; //left = "60px" if I doct the widgets to the right side bar
        zElement.style.backgroundColor = "#fff";
        zElement.style.padding = "10px";
        zElement.style.zIndex = "1000";
        document.getElementById("viewDiv").appendChild(zElement); // Changed from document.body.appendChild(zElement);
        
        // Create an ElevationLayer
        const elevationLayer = new ElevationLayer({
            url: "https://elevation3d.arcgis.com/arcgis/rest/services/WorldElevation3D/Terrain3D/ImageServer"
        });

        let currentScale = mapView.scale;

        // Watch for scale changes
        mapView.watch("scale", function(newScale) {
          currentScale = newScale;
        });

        // Listen to camera changes
        mapView.watch("camera", function(camera) {
                const cameraPoint = new Point({
                    x: camera.position.x,
                    y: camera.position.y,
                    spatialReference: mapView.spatialReference
                });

                // Query elevation and correct the elevation error
                elevationLayer.queryElevation(cameraPoint).then(function(result){
                    const terrainHeight = result.geometry.z;
                    const elevationError = 0; // Elevation error in meters
                    const heightAboveTerrain = camera.position.z - terrainHeight - elevationError;
                    //const minimumHeightAboveTerrain = terrainHeight + elevationError;
                    const tiltAngle = camera.tilt;  // Tilt angle in degrees
                    zElement.innerHTML = `
                    Hæð yfir landslagi: ${heightAboveTerrain.toFixed(2)} metrar<br>
                    Hallahorn: ${tiltAngle.toFixed(2)} gráður<br>
                    Mælikvarði: 1:${Math.round(currentScale).toLocaleString()}
                  `;
                });
        });
      },
    };
  });