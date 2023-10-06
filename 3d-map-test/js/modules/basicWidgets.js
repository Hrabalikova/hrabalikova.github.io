// Setting up the basic map widgets  like the home button, scale bar, zoom, and basemap gallery.
define([
  "esri/widgets/Home",
  "esri/widgets/BasemapGallery"
], function(Home, BasemapGallery) {
  return {
    setupBasicWidgets: function(mapView) {
      let activeWidget;
      const homeBtn = new Home({
        view: mapView  
      });

      mapView.ui.add(homeBtn, "top-left");
      mapView.ui.move("zoom", "bottom-right");

      const basemaps = new BasemapGallery({
        view: mapView,
        container: "basemaps-container"
      });



      






















    }
  };
})