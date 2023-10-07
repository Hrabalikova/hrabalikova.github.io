// Setting up the basic map widgets  like the home button, scale bar, zoom, and basemap gallery.
define([
    "esri/widgets/Bookmarks"
  ], function(Bookmarks) {
    return {
      setupBookmarksWidget: function(mapView) {
        const homeBtn = new Home({
          view: mapView  
        });
  
        mapView.ui.add(homeBtn, "top-left");
        mapView.ui.move("zoom", "bottom-right");
  
        const basemaps = new BasemapGallery({
          view: mapView,
          container: "basemaps-container"
        });
  
        const layerList = new LayerList({
          view: mapView,
          selectionEnabled: true,
          container: "layers-container"
        }); 
        
      },
    };
  });