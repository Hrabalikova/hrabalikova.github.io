// Global variables
//let activeWidget;
//let actionBarExpanded = false;


// main.js
require([
    "modules/mapConfig",
    "modules/basicWidgets",
    "modules/bookmarksWidget",
    "modules/weatherDaylight",
    "modules/measurementWidget",
    "modules/lineOfSightWidget",
    "modules/splashScreen",
    "modules/cameraPosition"
  ], function(
    MapConfig,
    BasicWidgets,
    BookmarksWidget,
    WeatherDaylight,
    MeasurementWidget,
    LineOfSightWidget,
    SplashScreen,
    CameraPosition
  ) {
    // Initialize the map, widgets, etc.
    const mapView = MapConfig.setupScene(); // Capture the returned mapView
    BasicWidgets.setupBasicWidgets(mapView); // <-- Pass mapView as an argument here
    BookmarksWidget.setupBookmarksWidget(mapView);
    WeatherDaylight.setupWeatherDaylight(mapView);
    MeasurementWidget.setupMeasurementWidget(mapView);
    LineOfSightWidget.setupLineOfSightWidget(mapView);
    SplashScreen.showSplashScreen(mapView);  
    CameraPosition.setupCameraPosition(mapView); 

    let activePanel = null;

    document.getElementById("basemapsBtn").addEventListener("click", function() {
      togglePanel("basemapsPanel");
    });
    
    document.getElementById("layersBtn").addEventListener("click", function() {
      togglePanel("layersPanel");
    });
    
    document.getElementById("bookmarksBtn").addEventListener("click", function() {
      togglePanel("bookmarksPanel");
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

    document.getElementById("weatherBtn").addEventListener("click", function() {
        togglePanel("weatherPanel");
      });

    document.getElementById("daylightBtn").addEventListener("click", function() {
        togglePanel("daylightPanel");
    });

    document.getElementById("losBtn").addEventListener("click", function() {
        togglePanel("losPanel");
    });

    // Add other button event listeners here
    
    function togglePanel(panelId) {
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

});