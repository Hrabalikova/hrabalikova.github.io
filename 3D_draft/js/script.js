require([
  "esri/WebScene",
  "esri/views/SceneView",
  "esri/widgets/Expand",
  "esri/widgets/Weather",
  "esri/widgets/Daylight",
  "esri/Map", //Map and GeoJSON layer is needed for my experiment with adding Json layers.....
  "esri/layers/GeoJSONLayer",
  "esri/widgets/LineOfSight", //Line of sight widget + point and graphic
  "esri/geometry/Point",
  "esri/Graphic",
  "esri/widgets/LayerList" //Layer list to turn on/off layers visibility
], (WebScene, SceneView, Expand, Weather, Daylight, Map, GeoJSONLayer, LineOfSight, Point, GraphicLayer, LayerList) => {

/********************************
* upload layers
***********************************/
  // sample: https://developers.arcgis.com/javascript/latest/sample-code/layers-geojson/
  // or https://developers.arcgis.com/javascript/latest/sample-code/sandbox/?sample=layers-geojson-refresh
  const vidkomustadirUrl =
        "https://gis.is/geoserver/ferdamalastofa/wfs?request=GetFeature&service=WFS&version=1.1.0&typeName=ferdamalastofa:vidkomustadir&outputFormat=json";

  const template = {
    title: "Land marks",
    content: "{heiti} in {svf_nafn} municipitality. <br/><br/> {flokkar}",
  };

  const renderer = {
    type: "simple",
    field: "addrattarafl",
    symbol: {
      type: "simple-marker",
      size: 6,
      color: "orange",
      outline: {
        color: "white"
      }
    }
  };

  const vidkomustadir = new GeoJSONLayer({
    url: vidkomustadirUrl,
    copyright: "Ferðumálastofnun",
    visible: false, 
    popupTemplate: template,
    renderer: renderer,
    title: "Viðkomustaðir",
    orderBy: {
      field: "addrattarafl"
    }
  });


 
  
/***********************************
* Create the SceneView
***********************************/
 // Load a webscene
  const scene = new WebScene({
    portalItem: {
      id: "f3b79c16e4a84c278ab69d94a938f49e"
    },
     layers: [vidkomustadir]
  });

 // Create a new SceneView and set the weather to cloudy
  const view = new SceneView({
    map: scene,
    container: "viewDiv", //This your main container in HTML that contain all the widgeds
    qualityProfile: "high",

    environment: {
      weather: {
        type: "cloudy", // autocasts as new CloudyWeather({ cloudCover: 1 })
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
  
  
/***********************************
* Add the widgets' UI elements to the view
***********************************/
  const weatherExpand = new Expand({
    view: view,
    expandTooltip: "Expand weather widget",
    content: new Weather({
      view: view
    }),
    group: "top-right",
    expanded: false
  });

  const daylightExpand = new Expand({
    view: view,
    expandTooltip: "Expand daylight widget",
    content: new Daylight({
      view: view
    }),
    group: "top-right"
  });
  view.ui.add([weatherExpand, daylightExpand], "top-right");
  
  const layerList = new LayerList({
    view: view,
    container: "LayerList"
  });
  view.ui.add(layerList, "bottom-right");



      
/**************************************
* LineOfSight widget
**************************************/
//add widget and let......
const lineOfSight = new LineOfSight({
  view: view,
  container: "losWidget"
});



/**************************************
 * Add symbols to mark the intersections
 * for the line of sight
 **************************************/

  const viewModel = lineOfSight.viewModel;

  // watch when observer location changes
  viewModel.watch("observer", (value) => {
    setIntersectionMarkers();
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
        height: 10,
        depth: 10,
        width: 10,
        anchor: "relative",
        anchorPosition: { x: 0, y: 0, z: -0.7 }
      }
    ]
  };

  function setIntersectionMarkers() {
    view.graphics.removeAll();
    viewModel.targets.forEach((target) => {
      if (target.intersectedLocation) {
        const graphic = new Graphic({
          symbol: intersectionSymbol,
          geometry: target.intersectedLocation
        });
        view.graphics.add(graphic);
      }
    });
  }

  /**************************************
  * Create an analysis by setting
  * the initial observer and four targets
  **************************************/

  viewModel.observer = new Point({
    latitude: 42.3521,
    longitude: -71.0564,
    z: 2
  });

  viewModel.targets = [
    createTarget(42.3492, -71.0529),
    createTarget(42.3477, -71.0542),
    createTarget(42.3485, -71.0533),
    createTarget(42.3467, -71.0549)
  ];

  function createTarget(lat, lon, z) {
    return {
      location: new Point({
        latitude: lat,
        longitude: lon,
        z: z || 0
      })
    };
  }

  // add an Expand widget to make the menu responsive
  const expand = new Expand({
    expandTooltip: "Expand line of sight widget",
    view: view,
    content: document.getElementById("menu"),
    expanded: false
  });

  view.ui.add(expand, "top-right");

  view.when(() => {
    // allow user to turn the layer with new planned buildings on/off
    // and see how the line of sight analysis changes
    const plannedBuildingsLayer = view.map.layers
      .filter((layer) => {
        return (
          layer.title === "Boston major projects - MajorProjectsBuildings"
        );
      })
      .getItemAt(0);

    document
      .getElementById("layerVisibility")
      .addEventListener("change", (event) => {
        plannedBuildingsLayer.visible = event.target.checked;
      });
  });

});