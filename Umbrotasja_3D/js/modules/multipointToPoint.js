/***********************************
* Convert Multipoint from WFS to single point and add to map()
***********************************/
// author:Náttúrufræðistofnun
define([
"esri/layers/WFSLayer",
"esri/layers/FeatureLayer",
"esri/Graphic",
"esri/geometry/Point",
      ], function(WFSLayer, FeatureLayer, Graphic, Point
        ) {return {
          convertToPoint: function(map, groupLayer) {

// Add WFS Layer toconvert to single point
const ornefniMultipointLayer = new WFSLayer({
    url: "https://gis.natt.is/geoserver/wfs",
    name: "ornefni_punktar", 
    copyright: "Náttúrufræðistofnun"
  });

async function multiPointToPoint(layer) {
  return new Promise((resolve, reject) => {
    layer.load().then(() => {
      // Query all features from the WFSLayer
      layer.queryFeatures().then((response) => {
        const features = response.features;
        // Create a new FeatureLayer to hold the converted single point features
        const singlePointLayer = new FeatureLayer({
          source: [], // Empty source initially
          fields: layer.fields, // Copy fields from the original layer
          objectIdField: layer.objectIdField, // Object ID field from the original layer
          geometryType: "point", // Geometry type for the features
          spatialReference: layer.spatialReference // Spatial reference for the features
        });
        // Iterate through the retrieved features and convert Multipoint to Point features
        const singlePointFeatures = features.map((feature) => {
          const multipointGeometry = feature.geometry;
          const singlePointGeometries = multipointGeometry.points.map((point) => {
            return new Point({
              x: point[0], // Longitude (X-coordinate) of the point
              y: point[1], // Latitude (Y-coordinate) of the point
              spatialReference: multipointGeometry.spatialReference // Spatial reference of the point
            });
          });
          // Create individual point features from the Multipoint
          return singlePointGeometries.map((geometry) => {
            return new Graphic({
              geometry: geometry,
              attributes: feature.attributes, // Copy attributes from the original feature
            });
          });
        }).flat(); // Flatten the array of point features
        // Add the single point features to the new FeatureLayer
        singlePointLayer.source.addMany(singlePointFeatures);
        resolve(singlePointLayer); // Resolve the promise with the created FeatureLayer
      }).catch(reject); // Reject the promise if there is an error querying features
    }).catch(reject); // Reject the promise if there is an error loading the layer
  });
}

async function loadOrnefniPointLayer(map) {
  try {
    const ornefniPointLayer = await multiPointToPoint(ornefniMultipointLayer);

          ornefniPointLayer.title ="Örnefni punktar";
          ornefniPointLayer.visible = false;
          ornefniPointLayer.editable = false;
          ornefniPointLayer.copyright = "<a href='https://www.natt.is/'>Náttúrufræðistofnun</a>";
          ornefniPointLayer.renderer = {
                type: "simple", // autocasts as new SimpleRenderer()
                symbol: {
                  type: "simple-marker",
                  style: "circle", // or "square", "cross", etc., based on your preference
                  color: [0, 0, 0, 0.7],
                  size: 4,
                }, // Apply the defined symbol to the renderer
              };
          ornefniPointLayer.outFields = ["*"];
          ornefniPointLayer.labelingInfo = labelingInfo = [
            {
              // When using callouts on labels, "above-center" is the only allowed position
              labelPlacement: "above-center",
              labelExpressionInfo: {
                value: "{ornefni}"
              },
              symbol: {
                type: "label-3d", // autocasts as new LabelSymbol3D()
                symbolLayers: [
                  {
                    type: "text", // autocasts as new TextSymbol3DLayer()
                    material: {
                      color: "black"
                    },
                    halo: {
                      color: [255, 255, 255, 0.7],
                      size: 2
                    },
                    size: 10
                  }
                ],
                // Labels need a small vertical offset that will be used by the callout
                verticalOffset: {
                  screenLength: 50,
                  maxWorldLength: 2000,
                  minWorldLength: 30
                },
                // The callout has to have a defined type (currently only line is possible)
                // The size, the color and the border color can be customized
                callout: {
                  type: "line", // autocasts as new LineCallout3D()
                  size: 0.5,
                  color: [0, 0, 0],
                  border: {
                    color: [255, 255, 255, 0.7]
                  }
                }
              }
            }
          ];

    // Add the resulting FeatureLayer to the map
    groupLayer.add(ornefniPointLayer,6); // 5 is the index of the layer position in map
    await ornefniPointLayer.when(); // Wait for the layer to load
  } catch (error) {
    console.error("Error:", error);
  }
}

// Call the asynchronous function
loadOrnefniPointLayer(map);
}    
};
});