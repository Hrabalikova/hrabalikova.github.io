/**************************************
* LineOfSight widget
**************************************/

define([
    "esri/widgets/LineOfSight",
    "esri/geometry/Point",
    "esri/geometry/Polyline",  
    "esri/Graphic",
    "esri/layers/ElevationLayer"
  ], function(LineOfSight, Point, Polyline, Graphic, ElevationLayer) {
    return {
      setupLineOfSightWidget: function(mapView) {
        // create an Elevation layer
        const elevationLayer = new ElevationLayer({
          url: "https://elevation3d.arcgis.com/arcgis/rest/services/WorldElevation3D/Terrain3D/ImageServer"
        });

        function getElevationAtPoint(point, elevationLayer) {
          return elevationLayer.queryElevation(point).then(result => {
          return result.geometry.z;
          });
        }

        // Add widget and other initializations
        const lineOfSight = new LineOfSight({
          view: mapView,
          container: "los-container"
        });

         //Add symbols to mark the intersections for the line of sight
        const viewModel = lineOfSight.viewModel;

        // watch when observer location changes
        viewModel.watch("observer", function(value) {
          getElevationAtPoint(value, elevationLayer)
            .then(elevation => {
              console.log("Elevation:", elevation);  // Debugging
              if (Math.abs(value.z - (elevation + 1.75)) > 0.01) {
                const updatedObserver = new Point({
                  x: value.x,
                  y: value.y,
                  z: elevation + 1.75,
                  spatialReference: value.spatialReference
                });
        
                viewModel.observer = updatedObserver;
                setIntersectionMarkers();
                }
              })
            .catch(error => {
              console.error("An error occurred:", error);
            });
        });
        // watch when a new target is added or removed
        viewModel.targets.on("change", (event) => {
          event.added.forEach((target) => {
            setIntersectionMarkers();
            // for each target watch when the intersection changes
            target.watch("intersectedLocation", setIntersectionMarkers);
          });
          event.removed.forEach(() => {
            // remove intersection markers for removed targets (remove with right click on target)
            setIntersectionMarkers();
          });
        });

        // an inverted cone marks the intersection that occludes the view
        const intersectionSymbol = {
          type: "point-3d",
          symbolLayers: [
            {
              type: "object",
              resource: { primitive: "inverted-cone" },
              material: { color: [255, 100, 100] },
              height: 5,
              depth: 5,
              width: 5,
              anchor: "relative",
              anchorPosition: { x: 0, y: 0, z: -0.7 }
            }
          ]
        };

        function setIntersectionMarkers() {
          mapView.graphics.removeAll();
          viewModel.targets.forEach((target) => {
            if (target.intersectedLocation) {
              const graphic = new Graphic({
                symbol: intersectionSymbol,
                geometry: target.intersectedLocation
              });
              mapView.graphics.add(graphic);
            }
          });
        }

      } //end
    };
  });
  