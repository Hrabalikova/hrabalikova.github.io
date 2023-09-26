function showSplashScreen() {
    var modal = document.getElementById("myModal");
    var span = document.getElementsByClassName("close")[0];
    var dragArea = document.getElementsByClassName("drag-area")[0];
    var offsetX, offsetY, isDragging = false;

    modal.style.display = "block";
  
    span.onclick = function() {
      modal.style.display = "none";
    }
  
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
  }
  
  // Dragging functionality
  dragArea.addEventListener('mousedown', function(e) {
    isDragging = true;
    offsetX = e.clientX - modal.getBoundingClientRect().left;
    offsetY = e.clientY - modal.getBoundingClientRect().top;
  });

  window.addEventListener('mousemove', function(e) {
    if (isDragging) {
      modal.style.left = e.clientX - offsetX + 'px';
      modal.style.top = e.clientY - offsetY + 'px';
    }
  });

  window.addEventListener('mouseup', function() {
    isDragging = false;
  });
}
 