// Setting up the basic map widgets  like the home button, scale bar, zoom, and basemap gallery.
define([
  "esri/widgets/Home",
  "esri/widgets/BasemapGallery",
  "esri/widgets/LayerList",
  "esri/widgets/Search",
], function(Home, BasemapGallery, LayerList, Search) {
  return {
    setupBasicWidgets: function(mapView) {
      const homeBtn = new Home({
        view: mapView  
      });

      mapView.ui.add(homeBtn, "top-left");
      mapView.ui.move("zoom", "bottom-right"); //top-left

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

    
      
      
    },
  };
});
