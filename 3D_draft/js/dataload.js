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
], 
   (
    WebScene, SceneView, Expand, Weather, Daylight, Map, GeoJSONLayer, LineOfSight, Point, GraphicLayer, LayerList
    ) => {

/********************************
* upload layers
***********************************/
  // sample: https://developers.arcgis.com/javascript/latest/sample-code/layers-geojson/
  // or https://developers.arcgis.com/javascript/latest/sample-code/sandbox/?sample=layers-geojson-refresh
  const url =
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
    url: url,
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
      id: "4526032f665f45a2bc4305af00dc29d9"
    },
    layers: [vidkomustadir]
  });


});
  
  


