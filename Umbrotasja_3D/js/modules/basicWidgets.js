// Setting up the basic map widgets  like the home button, scale bar, zoom, and basemap gallery.
define([
  "esri/widgets/Home",
  "esri/widgets/BasemapGallery",
  "esri/widgets/LayerList",
  "esri/widgets/Search",
  "esri/widgets/Legend",
], function(Home, BasemapGallery, LayerList, Search, Legend) {
  return {
    setupBasicWidgets: function(mapView) {
      const homeBtn = new Home({
        view: mapView  
      });

      mapView.ui.add(homeBtn, "top-right");
      mapView.ui.move("zoom", "top-right"); //bottom-right

      const basemaps = new BasemapGallery({
        view: mapView,
        container: "basemaps-container"
      });

      const layerList = new LayerList({
        view: mapView,
        selectionEnabled: true,
        container: "layers-container"
      }); 

      // Initialize the Search widget
      const search = new Search({
        view: mapView,
        container: "search-container"
      });

      // Legend widget
      const legend = new Legend({
        view: mapView,
        container: "legend-container"
      });

      // toggle logic if you're using a button with ID "legendBtn"
      const legendBtn = document.getElementById("legendBtn");
      if (legendBtn) {
        legendBtn.addEventListener("click", function () {
          const panel = document.getElementById("legendPanel");
          if (panel) {
            panel.style.display = panel.style.display === "none" ? "block" : "none";
          }
        });
      }






    },
  };
});
