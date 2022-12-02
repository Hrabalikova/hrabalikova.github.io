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
* experiment with layers
***********************************/
  const url =
        "https://gis.is/geoserver/ferdamalastofa/wfs?request=GetFeature&service=WFS&version=1.1.0&typeName=ferdamalastofa:vidkomustadir&outputFormat=json";//"https://gis.lmi.is/geoserver/ferdamalastofa/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=ferdamalastofa%3Avidkomustadir&maxFeatures=100000&outputFormat=application%2Fjson";
        //"https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";

  // Paste the url into a browser's address bar to download and view the attributes
  // in the GeoJSON file. These attributes include:
  // * heiti - name
  // * svf_nafn - municipaly
  // * lysing - the story behind
  // * flokkar - type of landmark
  // * addrattarafl
  // * adgengi - .....
  // sample: https://developers.arcgis.com/javascript/latest/sample-code/layers-geojson/
  // or https://developers.arcgis.com/javascript/latest/sample-code/sandbox/?sample=layers-geojson-refresh

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

  const geojsonLayer = new GeoJSONLayer({
    url: url,
    copyright: "Ferðumálastofnun",
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
      id: "4526032f665f45a2bc4305af00dc29d9"
    },
     layers: [geojsonLayer]
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
  
  
  


 
    
/**************************************
* LineOfSight widget
**************************************/
//add widget and let......

  
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