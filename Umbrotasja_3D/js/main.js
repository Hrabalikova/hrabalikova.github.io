/***********************************
* The main script runnig all the modules
***********************************/
// main.js

require([
    "modules/mapConfig",
    "modules/basicWidgets",
    "modules/weatherDaylight",
    "modules/measurementWidget",
    "modules/lineOfSightWidget",
    "modules/splashScreen",
    "modules/cameraPosition",
    "modules/loadLayers"
  ], function(
    MapConfig,
    BasicWidgets,
    WeatherDaylight,
    MeasurementWidget,
    LineOfSightWidget,
    SplashScreen,
    CameraPosition,
    LoadLayers
  ) {
    // Initialize the map, widgets, etc.
    const map = LoadLayers.setupLayers(); // Prepare Layers
    const mapView = MapConfig.setupScene(map); // Capture the returned mapView

    BasicWidgets.setupBasicWidgets(mapView); // <-- I have to pass mapView as an argument here
    WeatherDaylight.setupWeatherDaylight(mapView);
    MeasurementWidget.setupMeasurementWidget(mapView);
    LineOfSightWidget.setupLineOfSightWidget(mapView);
    SplashScreen.showSplashScreen(mapView);  
    CameraPosition.setupCameraPosition(mapView); 

    let activePanel = null;
    
    // -----------------------------
    // Standard Floating Panels: Event Listeners
    // -----------------------------
    document.getElementById("basemapsBtn").addEventListener("click", function() {
      togglePanel("basemapsPanel");
    });

    document.getElementById("searchBtn").addEventListener("click", function() {
      togglePanel("searchPanel");
    });  

    document.getElementById("distanceBtn").addEventListener("click", function() {
      togglePanel("distancePanel");
    });

    document.getElementById("areaBtn").addEventListener("click", function() {
        togglePanel("areaPanel");
    });

    document.getElementById("clearDistanceBtn").addEventListener("click", function() {
      togglePanel("distancePanel");
    });
    
    document.getElementById("clearAreaBtn").addEventListener("click", function() {
      togglePanel("areaPanel");
    });

    document.getElementById("weatherBtn").addEventListener("click", function() {
        togglePanel("weatherPanel");
      });

    document.getElementById("daylightBtn").addEventListener("click", function() {
        togglePanel("daylightPanel");
    });

    document.getElementById("losBtn").addEventListener("click", function() {
        togglePanel("losPanel");
    });

    document.getElementById("infoButton").addEventListener("click", function () {
      SplashScreen.showSplashScreen(mapView);
    });

    // Toggle pannels
    function togglePanel(panelId) {
      const tabPanel = document.getElementById("leftTabsPanel");
      if (tabPanel) tabPanel.style.display = "none"; // Hide tabbed panel if any other panel is opened
  
      if (activePanel) {
        document.getElementById(activePanel).style.display = "none";
      }
      if (activePanel !== panelId) {
        document.getElementById(panelId).style.display = "block";
        activePanel = panelId;
      } else {
        activePanel = null;
      }
    }

  // --------------------------
  // Docked Left Panel with Tabs (Layers + Legend)
  // --------------------------
  document.getElementById("layersBtn").addEventListener("click", function () {
    toggleLeftTabsPanel("layers");
  });

  document.getElementById("legendBtn").addEventListener("click", function () {
    toggleLeftTabsPanel("legend");
  });

  function toggleLeftTabsPanel(tab) {
    const panel = document.getElementById("leftTabsPanel");
    const legendTab = document.getElementById("legendTabTitle");
    const layersTab = document.getElementById("layersTabTitle");

    const isVisible = panel.style.display !== "none";
    const isActiveTab =
      (tab === "legend" && legendTab.selected) ||
      (tab === "layers" && layersTab.selected);

    // Hide any floating panel that was open
    if (activePanel) {
      document.getElementById(activePanel).style.display = "none";
      activePanel = null;
    }

    // Toggle off if same tab clicked again
    if (isVisible && isActiveTab) {
      panel.style.display = "none";
      return;
    }

    panel.style.display = "block";

    // Set correct tab
    legendTab.selected = tab === "legend";
    layersTab.selected = tab === "layers";
  }

  document.getElementById("closeTabsPanelBtn").addEventListener("click", function () {
    document.getElementById("leftTabsPanel").style.display = "none";
  });

}); //end of the function
