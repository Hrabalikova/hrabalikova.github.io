// Setting up the slides alias bookmarks.
define([
    "esri/webscene/Slide",
    "esri/WebScene" // Import WebScene if needed
  ], function(Slide, WebScene) {
    return {
        setupSlidesWidget: function(mapView) {
        // Access the scene object via mapView.map
        const scene = mapView.map;

        // Function to create the UI for a slide
        function createSlideUI(slide, placement) {
            // Create a new <div> element for the slide
            const slideElement = document.createElement("div");
            slideElement.id = slide.id;
            slideElement.classList.add("slide");

            // Get the slidesDiv container and insert the new slide element
            const slidesDiv = document.getElementById("slidesDiv"); //tady jsem to zmenila ze slidesDiv
            if (placement === "first") {
            slidesDiv.insertBefore(slideElement, slidesDiv.firstChild);
            } else {
            slidesDiv.appendChild(slideElement);
            }

            // Create an <img> element for the slide thumbnail
            const img = new Image();
            img.src = slide.thumbnail.url;
            img.title = slide.title.text;
            slideElement.appendChild(img); // Append the image first

            // Create a <div> element for the slide title
            const title = document.createElement("div");
            title.innerText = slide.title.text;
            title.className = "title";  // Add this line to assign a class to the title
            slideElement.appendChild(title);  // Append the title second

            // Create a delete button element for the slide
            const deleteButton = document.createElement("button");
            deleteButton.innerText = "Delete";
            deleteButton.className = "delete-slide-button";  // Add this line to assign a class to the button
            slideElement.appendChild(deleteButton);

            // Add click event listener to the delete button
            deleteButton.addEventListener("click", (e) => {
                e.stopPropagation();  // Prevent triggering the slide's click event
                // Remove the slide from the scene presentation
                scene.presentation.slides.remove(slide);
                // Remove the slide element from the UI
                slideElement.remove();
            });

            // start of the the code for generating share link
            // New code for creating Share button
            const shareButton = document.createElement("button");
            shareButton.innerText = "Share";
            shareButton.addEventListener("click", function() {
            // Logic to generate and share the link
            const shareLink = generateShareLink(slide); // Implement this function
            alert(`Share this link: ${shareLink}`);
            });
            slideElement.appendChild(shareButton);


            function generateShareLink(slideId) {
                const baseUrl = window.location.origin + window.location.pathname;
                const newUrl = new URL(baseUrl);
                newUrl.searchParams.append('slideId', slideId);
                return newUrl.toString();
            }
// end of the code for generating share link 

            // Add click event listener to the slide element
            slideElement.addEventListener("click", () => {
            // Remove "active" class from all slides
            const slides = document.querySelectorAll(".slide");
            Array.from(slides).forEach((node) => {
                node.classList.remove("active");
            });

            // Add "active" class to the clicked slide
            slideElement.classList.add("active");

            // Apply the slide's settings to the SceneView
            slide.applyTo(mapView);
            });
        } //end of the function

        // Initialize slides when the view is ready
        mapView.when(() => {
            // Make the slidesDiv visible 
            document.getElementById("slidesDiv").style.visibility = "visible";

            // Get the slides from the scene presentation
            const slides = scene.presentation.slides;

            // Create UI for each slide
            slides.forEach(createSlideUI);

            // Add event listener to the "Create Slide" button
            document.getElementById("createSlideButton").addEventListener("click", () => {
            // Create a new slide from the current view
            Slide.createFrom(mapView).then((slide) => {
                // Set the slide title
                slide.title.text = document.getElementById("createSlideTitleInput").value;

                // Add the slide to the scene presentation
                scene.presentation.slides.add(slide);

                // Create UI for the new slide
                createSlideUI(slide, "first");
            });
            });
        });

////start
        function loadSlideById(slideId) {
            const slide = scene.presentation.slides.find(s => s.id === slideId);
            if (slide) {
              slide.applyTo(mapView);
            }
          };
    ////  end    

        
      }, //end of the setup function 
////
      loadSlideById: loadSlideById  // expose this function so that it can be called from main.js.
    }; //end of return
  });