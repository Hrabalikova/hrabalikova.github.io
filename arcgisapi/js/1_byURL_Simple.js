require([
    "esri/config",
    "esri/WebScene",
    "esri/views/SceneView",
    "esri/widgets/Expand",
  
    "esri/widgets/Home",
  
    "esri/widgets/Weather",
    "esri/widgets/Daylight",
  
    "esri/layers/GeoJSONLayer", //Map and GeoJSON layer is needed for my experiment with adding Json layers.....
  
    "esri/widgets/LineOfSight", //Line of sight widget + point and graphic
    "esri/geometry/Point",
    "esri/Graphic",
  
    "esri/widgets/LayerList", //Layer list to turn on/off layers visibility
  
    "esri/widgets/DirectLineMeasurement3D",
    "esri/widgets/AreaMeasurement3D",
    "esri/core/promiseUtils",
  
    "esri/widgets/ScaleBar",
    "esri/widgets/Sketch",
    "esri/layers/GraphicsLayer",
    "esri/geometry/geometryEngine"
  ], (EsriConfig,
      WebScene, 
      SceneView, 
      Expand, 
  
      Home,
  
      Weather, 
      Daylight, 
  
      GeoJSONLayer, 
  
      LineOfSight, 
      Point, 
      Graphic,
  
      LayerList,
  
      DirectLineMeasurement3D,
      AreaMeasurement3D,
      promiseUtils,
  
      ScaleBar,
      Sketch,
      GraphicsLayer,
      geometryEngine
    ) => {
  
    //EsriConfig.apiKey = "my api key" //for now I do not need to generate api, it is mostly for living atlas, basemaps and ready-to-use tools
    
    let activeWidget = null;

    myKey //musim tu mit definovany muj API key
    

/**********************
ODSUD ZACINA TA UKAZKA
*************************/

// Create the map
    esriConfig.apiKey = myKey;
    const map = new Map({
        basemap: "arcgis-dark-gray" //basemap layer
    });

//Create the MapView
    var view = new MapView({
        container: "viewDiv",
        map: map,
        center: [-100,40]
        zoom: 4
    });

    view.ui.add(new Legend({view: view}), "bottom-left");

    var template = { // mame velkou flexibilitu s pop-up, muzeme s prehledem zobrazit grafy atd......
        //autocasts as new PopupTemplate()
        title: "{STATE_NAME} Tract {ID}",
        content: [
            {
                type: "fields",
                fieldInfos: [
                    {
                        fieldName: "Estimate_Total",
                        label: "Estimate tolal",
                    },
                    {
                        fieldName: "Geography",
                        label: "Location"
                    }
                ]
            }
        ]
    };

    var featureLayer = new featureLayer({
        url: "",
        popupTemplate: template
    });
    map.add(featureLayer);
});