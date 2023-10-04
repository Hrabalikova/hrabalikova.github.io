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
  let activeWidget; // = null;

 
/********************************************************************
* Create the SceneView and setting up the initial view of th scene
********************************************************************/
 // Load a webscene 
  const scene = new WebScene({
    portalItem: {
      id: "f3b79c16e4a84c278ab69d94a938f49e"
    },
  });

 // Create a new SceneView and set the weather to cloudy
  const mapView = new SceneView({
    map: scene,
    container: "viewDiv", //main map container
    qualityProfile: "high",
    //set the inital weather and lighting conditions for the scene 
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

  //
  /**********************************************************************************
   * Initialize the ArcGIS Maps SDK for JavaScript to set up environment of the app
   * *******************************************************************************/
  // Action bar of secondary header
    document.querySelector("calcite-action-bar").messageOverrides = {
      expand: "Opna",
      collapse: "Loka"
    };
  

  // Popup and panel sync
  /*  mapView.when(function(){
      CalciteMapArcGISSupport.setPopupPanelSync(mapView);
    });
*/


   // Search - add to navbar
  /*  var searchWidget = new Search({
      container: "searchWidgetDiv",
      view: mapView
    });
   /* CalciteMapArcGISSupport.setSearchExpandEvents(searchWidget);*/



    const homeBtn = new Home({// create home button 
      view: mapView  
    });

    mapView.ui.add(homeBtn, "top-left"); //home button on the left
    mapView.ui.move("zoom", "top-left");
      




    const basemaps = new BasemapGallery({
      view: mapView,
      container: "basemaps-container"
    });

  /* const bookmarks = new Bookmarks({
      view: mapView,
      container: "bookmarks-container"
    });*/

    /*const layerList = new LayerList({
      view: mapView,
      selectionEnabled: true,
      container: "layers-container"
    });


    // Add Layer list to the Scene
    //const layerList = new LayerList({
    //  view: mapView,
    //  container: "LayerList"
    //});

  // mapView.ui.add(layerList, "bottom-right");

    // create home button 
  // const homeBtn = new Home({
  //   view: mapView
  // });

  mapView.when(() => {
    /*const { title, description, thumbnailUrl, avgRating } = mapView.portalItem;
    document.querySelector("#header-title").textContent = title;
    document.querySelector("#item-description").innerHTML = description;
    document.querySelector("#item-thumbnail").src = thumbnailUrl;
    document.querySelector("#item-rating").value = avgRating;*/

    //let activeWidget;

   /* const handleActionBarClick = ({ target }) => {
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
      mapView.padding = {
        left: actionBarExpanded ? 150 : 49
      };
    });     
    document.querySelector("calcite-shell").hidden = false;
    document.querySelector("calcite-loader").hidden = true;
  });




















/****************************************************
* run splash screen and it as info into action bar
*******************************************************/
  // run splash screen function 
  function showSplashScreen() {
    var modal = document.getElementById("splashModal");
    var modalContent = document.querySelector(".modal-content");
    var span = document.getElementsByClassName("close")[0];
    var offsetX, offsetY, isDragging = false;
  
    // Center the modal initially
    modalContent.style.left = "50%";
    modalContent.style.top = "50%";
    modalContent.style.transform = "translate(-50%, -50%)";
  
    modal.style.display = "block";
  
    span.onclick = function() {
      modal.style.display = "none";
    } 
  }

  mapView.when(() => {
    showSplashScreen();
    // the function run splash screen
  });
  
  document.getElementById('infoButton').addEventListener('click', showSplashScreen);






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
          view: mapView        });

        // skip the initial 'new measurement' button
        activeWidget.viewModel.start().catch((error) => {
          if (promiseUtils.isAbortError(error)) {
            return; // don't display abort errors
          }
          throw error; // throw other errors since they are of interest
        });

        mapView.ui.add(activeWidget, "top-right");
        setActiveButton(document.getElementById("distanceButton"));
        break;
      case "area":
        activeWidget = new AreaMeasurement3D({
          view: mapView
        });

        // skip the initial 'new measurement' button
        activeWidget.viewModel.start().catch((error) => {
          if (promiseUtils.isAbortError(error)) {
            return; // don't display abort errors
          }
          throw error; // throw other errors since they are of interest
        });

        mapView.ui.add(activeWidget, "top-right");
        setActiveButton(document.getElementById("areaButton"));
        break;
      case null:
        if (activeWidget) {
          mapView.ui.remove(activeWidget);
          activeWidget.destroy();
          activeWidget = null;
        }
        break;
    }
  }

  function setActiveButton(selectedButton) {
    // focus the view to activate keyboard shortcuts for sketching
    mapView.focus();
    const elements = document.getElementsByClassName("active");
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.remove("active");
    }
    if (selectedButton) {
      selectedButton.classList.add("active");
    }
  }

  mapView.ui.add("topbar", "top-right"); // add the toolbar for the measurement widgets


/***********************************
* Add weather and day widget
***********************************/
  const weatherExpand = new Expand({
    view: mapView,
    expandTooltip: "Expand weather widget",
    content: new Weather({
      view: mapView
    }),
    group: "top-right",
    expanded: false
  });

  const daylightExpand = new Expand({
    view: mapView,
    expandTooltip: "Expand daylight widget",
    content: new Daylight({
      view: mapView
    }),
    group: "top-right"
  });

  mapView.ui.add([weatherExpand, daylightExpand], "top-right"); 


      
/**************************************
* LineOfSight widget
**************************************/
  //add widget and let......
  const lineOfSight = new LineOfSight({
    view: mapView,
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
    mapView.graphics.removeAll();
    viewModel.targets.forEach((target) => {
      if (target.intersectedLocation) {
        const graphic = new Graphic({
          symbol: intersectionSymbol,
          geometry: target.intersectedLocation
        });
        mapView.graphics.add(graphic);
      }
    });
  }

  // add an Expand widget to make the menu responsive
  const expand = new Expand({
    expandTooltip: "Expand line of sight widget",
    view: mapView,
  //  content: document.getElementById("menu"),
    content: new LineOfSight({
      view: mapView,
      content: document.getElementById("menu")
    }),
    group: "top-right",
    expanded: false
  });


  mapView.ui.add(expand, "top-right");


  mapView.when(() => {
    // allow user to turn the layer with new planned buildings on/off
    // and see how the line of sight analysis changes
    const plannedBuildingsLayer = mapView.map.layers //tady bylo puvodne jen view nejsem si uplne jista jestli jsem to zmenila spravne
      .filter((layer) => {
        return (
          layer.title === "Visbility Analysis"
        );
      })
      .getItemAt(0);

    document
      .getElementById("layerVisibility")
      .addEventListener("change", (event) => {
        plannedBuildingsLayer.visible = event.target.checked;
      });
  });

/**************************************
* Bookmarks
**************************************/
 /* function generateBookmarkLink(bookmark) {
    const params = new URLSearchParams({
      x: bookmark.extent.x,
      y: bookmark.extent.y,
      z: bookmark.extent.z,
      // Add other state parameters here, like layers
    });
    return `${window.location.origin}${window.location.pathname}?${params.toString()}`;
  }





// bookmarsk
  const bookmarks = new Bookmarks({
    view: mapView,
    editingEnabled: true,
    visibleElements: {
      time: false
    },

  });
  
  
  const bkExpand = new Expand({
    view: mapView,
    content: bookmarks,
    expanded: false
  });

  mapView.ui.add(bkExpand, "top-right");


  bookmarks.on("bookmark-add", function(event) {
    const bookmark = event.bookmark;
    const link = generateBookmarkLink(bookmark);
    console.log("Generated link for bookmark:", link);
    // You can display this link in a tooltip, copy it to the clipboard, etc.
  });

  

 
  function loadFromBookmark() {
    const params = new URLSearchParams(window.location.search);
    const x = parseFloat(params.get("x"));
    const y = parseFloat(params.get("y"));
    const z = parseFloat(params.get("z"));
    // Add other state parameters here, like layers
  
    if (x && y && z) {
      view.goTo({
        target: [x, y, z]
      });
    }
    // Set other map states like layers here
  }
  
  // Call this function when the view is ready
  mapView.when(loadFromBookmark);*/
  









});