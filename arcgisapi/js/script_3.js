require([
  "esri/WebScene",
  "esri/views/SceneView",
  "esri/widgets/Expand",
  "esri/widgets/Weather",
  "esri/widgets/Daylight",
  "esri/Map", //Map and GeoJSON layer is needed for my experiment with adding Json layers.....
  "esri/layers/GeoJSONLayer",
  "esri/layers/OGCFeatureLayer",
  "esri/widgets/LineOfSight", //Line of sight widget + point and graphic
  "esri/geometry/Point",
  "esri/Graphic",
  "esri/widgets/LayerList" //Layer list to turn on/off layers visibility
], (WebScene, SceneView, Expand, Weather, Daylight, Map, GeoJSONLayer, OGCFeatureLayer, LineOfSight, Point, GraphicLayer, LayerList) => {



/********************************
* upload layers
***********************************/
// sample: https://developers.arcgis.com/javascript/latest/sample-code/layers-geojson/
// or https://developers.arcgis.com/javascript/latest/sample-code/sandbox/?sample=layers-geojson-refresh
/*
 const Url = 
  "	vjp:gongugrunnur_v0";
  //"https://gis.lmi.is/geoserver/ferdamalastofa/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=ferdamalastofa%3Avidkomustadir&maxFeatures=100000&outputFormat=application%2FjsonINSPIRE:INSPIRE_ProtectedSites";
  //"https://gis.is/geoserver/ramma/wfs?request=GetFeature&service=WFS&version=1.1.0&typeName=ramma:r5_yfirlit&CRS=EPSG%3A4326&outputFormat=json";
  //"https://gis.lmi.is/geoserver/ERM/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=ERM%3ALake_Reservoir&maxFeatures=100000&outputFormat=application%2Fjson";
  //"https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";
  //"hrabalikova.github.io/arcgisapi/json/exp.geojson";      
  //"https://gis.is/geoserver/ferdamalastofa/wfs?request=GetFeature&service=WFS&version=1.1.0&typeName=ferdamalastofa:vidkomustadir&outputFormat=json";//"https://gis.lmi.is/geoserver/ferdamalastofa/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=ferdamalastofa%3Avidkomustadir&maxFeatures=100000&outputFormat=application%2Fjson";

  //pop-up windows
  const template = {
    title: "Land marks",
    content: "{heiti} in {svf_nafn} municipitality. <br/><br/> {flokkar}",
  };

  // visualization........
  const renderer = {
    type: "simple",
    field: "id",
    symbol: {
      type: "simple-marker",
      size: 6,
      color: "orange",
      outline: {
        color: "white"
      }
    }
  };

  const Experiment = new GeoJSONLayer({
    url: Url,
    id: "1",
    copyright: "Ferðumálastofnun",
    visible: false,
    popupTemplate: template,
    renderer: renderer,
    title: "Viðkomustaðir",
    orderBy: {
      field: "id"
    }
  });*/


const Experiment = new OGCFeatureLayer({
  url: "https://gis.is";
//  "https://demo.pygeoapi.io/stable", // url to the OGC service
  collectionId: "ferdamalastofa:vidkomustadir", // unique id of the collection
  // define rendering
  renderer: {
    type: "simple",
    symbol: {
      type: "simple-marker",
      color: "orange"
    }
  },
});
 
  
/***********************************
* Create the SceneView
***********************************/
 // Load a webscene
  const scene = new WebScene({
    portalItem: {
      id: "f3b79c16e4a84c278ab69d94a938f49e"
    },
     layers: [Experiment]
  });

 // Create a new SceneView and set the weather to cloudy
  const view = new SceneView({
    map: scene,
    container: "viewDiv", //This your main container in HTML that contain all the widgeds
    qualityProfile: "high",

    environment: {
      weather: {
        type: "cloudy", // autocasts as new CloudyWeather({ cloudCover: 1 })
        cloudCover: 0.3
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