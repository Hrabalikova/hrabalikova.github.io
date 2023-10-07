/****************************************************
* run splash screen and it as info into action bar
*******************************************************/
// author:LMI

define([], function() {
    return {
        showSplashScreen: function(mapView) {  // <-- Add mapView as an argument here
        // Code for showing the splash screen
        // run splash screen function 
        function showSplashScreen() {
            var modal = document.getElementById("splashModal");
            var modalContent = document.querySelector(".modal-content");
            var span = document.getElementsByClassName("close")[0];
           // var offsetX, offsetY, isDragging = false; //prepared for future adjustment, i.e. window draging
        
            // Center the modal initially
            modalContent.style.left = "50%";
            modalContent.style.top = "50%";
            modalContent.style.transform = "translate(-50%, -50%)";
        
            modal.style.display = "block";
        
            // Close modal when 'x' is clicked
            span.onclick = function() {
            modal.style.display = "none";
            };

            // Close modal when clicking outside of it
            window.onclick = function(event) {
            if (event.target === modal) {
                modal.style.display = "none";
            }
            };
        }

        // Run the function
          mapView.when(() => {
            showSplashScreen();
            // the function run splash screen
        });
        

        // Call the modal from info-button
        document.getElementById('infoButton').addEventListener('click', showSplashScreen);
        }
    };
  });
  