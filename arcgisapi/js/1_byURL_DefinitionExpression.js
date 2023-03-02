require([
    "esri/config",
    "esri/WebScene",
    "esri/views/SceneView",
    "esri/widgets/Expand",
  
    "esri/widgets/Home"
  ], (EsriConfig,
      WebScene, 
      SceneView, 
      Expand, 
  
      Home
    ) => {
  
    //EsriConfig.apiKey = "my api key" //for now I do not need to generate api, it is mostly for living atlas, basemaps and ready-to-use tools
    
    let activeWidget = null;

    myKey //musim tu mit definovany muj API key

    

/**********************
ODSUD ZACINA TA UKAZKA
*************************/
    const layer = new featureLayer({
        url: "",
        defintionExpression: "STATE_NAME = 'California'" //
    }); 


