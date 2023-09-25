
 // Get the tooltip and its trigger
 const tooltip = document.querySelector('.modal-tooltip');
 const trigger = document.querySelector('.modal-tooltip-trigger');
 
 // Show tooltip on hover
 trigger.addEventListener('mouseover', function() {
   tooltip.style.display = 'block';
 });
 
 // Hide tooltip when mouse leaves
 trigger.addEventListener('mouseout', function() {
   tooltip.style.display = 'none';
 });
 
 // Optional: Show tooltip on click instead of hover
 //trigger.addEventListener('click', function() {
 //   tooltip.style.display = tooltip.style.display === 'block' ? 'none' : 'block';
 // });