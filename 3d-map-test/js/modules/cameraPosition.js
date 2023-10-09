// Setting up the basic map widgets  like the home button, scale bar, zoom, and basemap gallery.
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
        zElement.style.bottom = "20px";
        zElement.style.left = "20px";
        zElement.style.backgroundColor = "#fff";
        zElement.style.padding = "10px";
        zElement.style.zIndex = "1000";
        document.getElementById("viewDiv").appendChild(zElement); // Changed from document.body.appendChild(zElement);
        
  
        // Listen to camera changes
/*        mapView.watch("camera", function(camera) {
          // Update the Z-coordinate display
          zElement.innerHTML = `Z-coordinate: ${camera.position.z.toFixed(2)} meters`;
        });
*/
        // Create an ElevationLayer
        const elevationLayer = new ElevationLayer({
            url: "https://elevation3d.arcgis.com/arcgis/rest/services/WorldElevation3D/Terrain3D/ImageServer"
        });

        // Listen to camera changes
      mapView.watch("camera", function(camera) {
            const cameraPoint = new Point({
                x: camera.position.x,
                y: camera.position.y,
                spatialReference: mapView.spatialReference
            });

            // Query elevation without elevation error correction
/*            elevationLayer.queryElevation(cameraPoint).then(function(result){
                const terrainHeight = result.geometry.z;
                const heightAboveTerrain = camera.position.z - terrainHeight;
                zElement.innerHTML = `Height above terrain: ${heightAboveTerrain.toFixed(2)} meters`;
            });
*/

                // Query elevation and correct the elevation error
                elevationLayer.queryElevation(cameraPoint).then(function(result){
                    const terrainHeight = result.geometry.z;
                    const elevationError = 0; // Elevation error in meters
                    const heightAboveTerrain = camera.position.z - terrainHeight - elevationError;
                    //const minimumHeightAboveTerrain = terrainHeight + elevationError;
                    const tiltAngle = camera.tilt;  // Tilt angle in degrees
                    zElement.innerHTML = `Height above terrain: ${heightAboveTerrain.toFixed(2)} meters<br>Tilt angle: ${tiltAngle.toFixed(2)} degrees`;
                });

                /*if (camera.position.z < minimumHeightAboveTerrain) {
                    // Adjust the camera's Z-coordinate to be above the ground
                    mapView.goTo({
                        position: {
                            z: minimumHeightAboveTerrain
                        }
                    });
                }*/

        });


        
      },
    };
  });