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


/**************************************
* LineOfSight widget
**************************************/
//add widget and let......
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
    expanded: true
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
//  view.ui.add(layerList, "bottom-right");



});