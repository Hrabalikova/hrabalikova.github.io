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

/********************************
* upload layers - this is just try
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


 
  
/******************************************************
* Create the SceneView and setting up the initial view
********************************************************/
 // Load a webscene - I have two option, create Scene in AGOL or create a new scene directly here
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

// Add Layer list to the Scene
const layerList = new LayerList({
  view: view,
  container: "LayerList"
});

//view.ui.add(layerList, "bottom-right");

// create home button 
  const homeBtn = new Home({
    view: view
  });

  view.ui.add(homeBtn, "top-left"); //I want home button on the left



/***********************************
* Add measurement widget
***********************************/
  document
    .getElementById("distanceButton")
    .addEventListener("click", (event) => {
      setActiveWidget(null);
      if (!event.target.classList.contains("active")) {
        setActiveWidget("distance");
      } else {
        setActiveButton(null);
      }
    });

  document
    .getElementById("areaButton")
    .addEventListener("click", (event) => {
      setActiveWidget(null);
      if (!event.target.classList.contains("active")) {
        setActiveWidget("area");
      } else {
        setActiveButton(null);
      }
    });

  function setActiveWidget(type) {
    switch (type) {
      case "distance":
        activeWidget = new DirectLineMeasurement3D({
          view: view
        });

        // skip the initial 'new measurement' button
        activeWidget.viewModel.start().catch((error) => {
          if (promiseUtils.isAbortError(error)) {
            return; // don't display abort errors
          }
          throw error; // throw other errors since they are of interest
        });

        view.ui.add(activeWidget, "top-right");
        setActiveButton(document.getElementById("distanceButton"));
        break;
      case "area":
        activeWidget = new AreaMeasurement3D({
          view: view
        });

        // skip the initial 'new measurement' button
        activeWidget.viewModel.start().catch((error) => {
          if (promiseUtils.isAbortError(error)) {
            return; // don't display abort errors
          }
          throw error; // throw other errors since they are of interest
        });

        view.ui.add(activeWidget, "top-right");
        setActiveButton(document.getElementById("areaButton"));
        break;
      case null:
        if (activeWidget) {
          view.ui.remove(activeWidget);
          activeWidget.destroy();
          activeWidget = null;
        }
        break;
    }
  }

  function setActiveButton(selectedButton) {
    // focus the view to activate keyboard shortcuts for sketching
    view.focus();
    const elements = document.getElementsByClassName("active");
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.remove("active");
    }
    if (selectedButton) {
      selectedButton.classList.add("active");
    }
  }

  view.ui.add("topbar", "top-right"); // add the toolbar for the measurement widgets


/***********************************
* Add weather and day widget
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


      
/**************************************
* LineOfSight widget
**************************************/
  //add widget and let......
  const lineOfSight = new LineOfSight({
    view: view,
    container: "losWidget"
  });


  //Add symbols to mark the intersections for the line of sight
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
        height: 5,
        depth: 5,
        width: 5,
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

  // add an Expand widget to make the menu responsive
  const expand = new Expand({
    expandTooltip: "Expand line of sight widget",
    view: view,
  //  content: document.getElementById("menu"),
    content: new LineOfSight({
      view: view,
      content: document.getElementById("menu")
    }),
    group: "top-right",
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