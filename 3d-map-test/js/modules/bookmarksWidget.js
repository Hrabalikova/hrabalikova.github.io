// Setting up the basic map widgets  like the home button, scale bar, zoom, and basemap gallery.
define([
    "esri/widgets/Bookmarks",
    "esri/widgets/Expand"
  ], function(Bookmarks, Expand) {
    return {
      setupBookmarksWidget: function(mapView) {

        const bookmarks = new Bookmarks({
          view: mapView,
          // allows bookmarks to be added, edited, or deleted
          editingEnabled: true,
          visibleElements: {
            time: false // don't show the time (h:m:s) next to the date
          },
          container: "bookmarks-container"
        });

       /* const bkExpand = new Expand({
          view: mapView,
          content: bookmarks,
          expanded: false,
          container: "bookmarks-container"
        });
*/

/*
      // create bookmarks for Skagi and Hekla
      const skagiBookmark = new Bookmark({
        name: "Skagi",
        viewpoint: new Viewpoint({
          targetGeometry: skagiCenter,
          scale: 100000
        })
      });

      const HeklaBookmark = new Bookmark({
        name: "Hekla",
        viewpoint: new Viewpoint({
          targetGeometry: heklaCenter,
          scale: 2500
        })
      });

      const bookmarksCollection = new Collection();
      bookmarksCollection.addMany([skagiBookmark, heklaBookmark]);

      // add a Bookmarks widget
      const bookmarks = new Bookmarks({
        bookmarks: bookmarksCollection,
        view
      });
*/
        




        
      },
    };
  });