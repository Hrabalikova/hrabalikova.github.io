/*
  Author: LMI
  Description: JavaScript for a 3D map application for wind energy projects evaluated within the 5th phase of Rammaæátlun, www.ramma.is
  License: MIT License
*/


require([
  "esri/WebScene",
  "esri/views/SceneView",
  "esri/widgets/Home",

  "esri/widgets/Expand",
  "esri/widgets/BasemapGallery",
 // "esri/widgets/Print", //not supported for 3D
  "esri/widgets/LayerList", //Layer list to turn on/off layers visibility
  "esri/widgets/Bookmarks",

  "esri/widgets/Weather",
  "esri/widgets/Daylight",

  "esri/widgets/LineOfSight", //Line of sight widget + point and graphic
  "esri/geometry/Point",
  "esri/Graphic",

  "esri/widgets/DirectLineMeasurement3D",
  "esri/widgets/AreaMeasurement3D",
  "esri/core/promiseUtils",

  "esri/widgets/ScaleBar",
  "esri/widgets/Sketch",
  "esri/layers/GraphicsLayer",
  "esri/geometry/geometryEngine"
], (WebScene, 
    SceneView, 
    Home,

    Expand, 
    BasemapGallery,
    //Print, //not supported for 3D map
    LayerList,
    Bookmarks,

    Weather, 
    Daylight, 

    LineOfSight, 
    Point, 
    Graphic,

    DirectLineMeasurement3D,
    AreaMeasurement3D,
    promiseUtils,

    ScaleBar,
    Sketch,
    GraphicsLayer,
    geometryEngine
  ) => {   
  let activeWidget = null;
 
/******************************************************
* Create the SceneView and setting up the initial view
********************************************************/
 // Load a webscene
  const scene = new WebScene({
    portalItem: {
      id: "f3b79c16e4a84c278ab69d94a938f49e"
    },
  });

 // Create a new SceneView and set the weather to cloudy
  const view = new SceneView({ 
    map: scene,
    container: "viewDiv", //This is the main map container
    qualityProfile: "high",
    padding: {right: 49},
    
    environment: { //set the overall envirinmebt
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

  //initialize the ArcGIS Maps SDK for JavaScript widgets and placing them placing in containers
    view.ui.move("zoom", "bottom-right");
    const basemaps = new BasemapGallery({
      view,
      container: "basemaps-container"
    });
    const bookmarks = new Bookmarks({
      view,
      container: "bookmarks-container"
    });
    const layerList = new LayerList({
      view,
      selectionEnabled: true,
      container: "layers-container"
    });
//    const print = new Print({
//     view,
//      container: "print-container"
//    });

//    view.when(() => {
//      const { title, description, thumbnailUrl, avgRating } = scene.portalItem;
//      document.querySelector("#header-title").textContent = title;
//      document.querySelector("#item-description").innerHTML = description;
//      document.querySelector("#item-thumbnail").src = thumbnailUrl;
//      document.querySelector("#item-rating").value = avgRating;
//    }); 
//    let activeWidget;

    const handleActionBarClick = ({ target }) => {
      if (target.tagName !== "CALCITE-ACTION") {
        return;
      }

      if (activeWidget) {
        document.querySelector(`[data-action-id=${activeWidget}]`).active = false;
        document.querySelector(`[data-panel-id=${activeWidget}]`).hidden = true;
      }

      const nextWidget = target.dataset.actionId;
      if (nextWidget !== activeWidget) {
        document.querySelector(`[data-action-id=${nextWidget}]`).active = true;
        document.querySelector(`[data-panel-id=${nextWidget}]`).hidden = false;
        activeWidget = nextWidget;
      } else {
        activeWidget = null;
      }
    };

    document.querySelector("calcite-action-bar").addEventListener("click", handleActionBarClick);
    
    let actionBarExpanded = false;

    document.addEventListener("calciteActionBarToggle", event => {
      actionBarExpanded = !actionBarExpanded;
      view.padding = {
        left: actionBarExpanded ? 135 : 49
      };
    });
    document.querySelector("calcite-shell").hidden = false;
    document.querySelector("calcite-loader").hidden = true;


  // create home button 
  const homeBtn = new Home({
    view: view
  });

  view.ui.add(homeBtn, "top-left"); //home button on the left

/***********************************
* run splash screen  
***********************************/
  // run splash screen function 
  function showSplashScreen() {
    var splash = document.getElementById("mySplash");
    var splashContent = document.querySelector(".splash-content");
    var span = document.getElementsByClassName("close")[0];
    var offsetX, offsetY, isDragging = false;
  
    // Center the splash initially
    splashContent.style.left = "50%";
    splashContent.style.top = "50%";
    splashContent.style.transform = "translate(-50%, -50%)";
  
    splash.style.display = "block";
  
    span.onclick = function() {
      splash.style.display = "none";
    }
  
    // Dragging logic
    splashContent.addEventListener('mousedown', function(e) {
      isDragging = true;
      offsetX = e.clientX - splashContent.getBoundingClientRect().left;
      offsetY = e.clientY - splashContent.getBoundingClientRect().top;
      splashContent.style.transform = "none"; // Remove the transform to allow dragging
    });
  
    window.addEventListener('mousemove', function(e) {
      if (isDragging) {
        splashContent.style.left = e.clientX - offsetX + 'px';
        splashContent.style.top = e.clientY - offsetY + 'px';
      }
    });
  
    window.addEventListener('mouseup', function() {
      isDragging = false;
    });
  }

  view.when(() => {
    showSplashScreen();
    // the function run splash screen
    // Tooltip code
    // Get the tooltip and its trigger
    const tooltip = document.querySelector('.splash-tooltip');
    const trigger = document.querySelector('.splash-tooltip-trigger');
    // Show tooltip on hover
    trigger.addEventListener('mouseover', function() {
      tooltip.style.display = 'block';
    });
    // Hide tooltip when mouse leaves
    trigger.addEventListener('mouseout', function() {
      tooltip.style.display = 'none';
    });
    // Or: Show tooltip on click instead of hover
    //trigger.addEventListener('click', function() {
    //   tooltip.style.display = tooltip.style.display === 'block' ? 'none' : 'block';
    // });
  });
  

  




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









});