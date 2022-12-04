//Always starts with this AMD requirements statement
//to load moduls I need
require([
    "esri/Map", 
    "esri/views/MapView"
], (Map, MapView) => {

//utilize my first API class. And that is the a Map class
//esriConfig.apiKey = myKey;
    const map = new Map({
      basemap: "topo-vector" //give the basemap property and the value topo-vector
    });

//initilialiye the MapView in this 2D application
//the mapview is responsible for rendering the map
//and handles the users interaction on the map
    const view = new MapView({
      container: "viewDiv", // Reference to the view div. For the map to be visible on your app, you must pass aDOM element as a container. So here I am using the div element wit ID of viewDIV
      map: map, // Reference to the map object created before the view
      zoom: 7, // Sets zoom level based on level of detail (LOD)
      center: [-18.5, 64.82] // Sets center point of view using longitude,latitude
    });
  });

// nejake dalsi ptakovinky
//view.ui.add(new Legend({view> view}), "bottom-left")


