document.addEventListener("DOMContentLoaded", function() {
    // Initialize the map
    const map = L.map("map").setView([37.076, -8.115], 10); // Centered around Vilamoura

    // Add OpenStreetMap tiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors"
    }).addTo(map);

    // Points of Interest Data (from previous research)
    const pointsOfInterest = [
        { name: "Faro Airport (FAO)", position: [37.0144, -7.9658], details: "Arrival and Departure Point" },
        { name: "Accommodation: Avenida Tivoli - Edifício Orion", position: [37.0768, -8.1174], details: "Your stay in Vilamoura" },
        { name: "Vilamoura Marina", position: [37.0760, -8.1150], details: "Upscale area with restaurants, shops, and nightlife." },
        { name: "Cerro da Vila Roman Ruins", position: [37.0800, -8.1199], details: "Roman ruins and mosaics." },
        { name: "Praia de Vilamoura", position: [37.0717, -8.1162], details: "Main beach in Vilamoura." },
        { name: "Loulé", position: [37.1379, -8.0202], details: "Charming traditional town." },
        { name: "Loulé Market (Mercado Municipal de Loulé)", position: [37.1382, -8.0223], details: "Vibrant daily market." },
        { name: "Loulé Castle", position: [37.1397, -8.0234], details: "Historic castle in Loulé." },
        { name: "Benagil Cave", position: [37.0872, -8.4250], details: "Famous sea cave, access by boat." },
        { name: "Praia da Marinha", position: [37.0899, -8.4116], details: "One of Portugal’s most beautiful beaches." },
        { name: "Praia da Falésia", position: [37.0861, -8.1679], details: "Beach with distinctive orange cliffs and hiking trails." },
        { name: "Faro (City)", position: [37.0193, -7.9304], details: "Capital of the Algarve." },
        { name: "Faro Old Town (Cidade Velha)", position: [37.0138, -7.9350], details: "Historic center of Faro." },
        { name: "Arco da Vila (Faro)", position: [37.0145, -7.9351], details: "Monumental archway into the Old Town." },
        { name: "Faro Cathedral (Sé Catedral de Faro)", position: [37.0135, -7.9351], details: "Main cathedral in Faro." },
        { name: "Ria Formosa Natural Park", position: [37.0182, -8.0032], details: "Beautiful lagoon system, general park area." },
        { name: "Praia de Faro (Beach)", position: [37.0076, -7.9952], details: "Long sandy beach accessible by bridge." },
        { name: "Lagos", position: [37.1020, -8.6742], details: "Historic and touristic city." },
        { name: "Ponta da Piedade (Lagos)", position: [37.0795, -8.6686], details: "Headland with stunning rock formations." },
        { name: "Praia Dona Ana (Lagos)", position: [37.0913, -8.6694], details: "Picturesque beach in Lagos." },
        { name: "Praia do Camilo (Lagos)", position: [37.0873, -8.6686], details: "Beautiful beach accessed by a long staircase." },
        { name: "Silves", position: [37.1892, -8.4388], details: "Historic town with a red sandstone castle." },
        { name: "Silves Castle", position: [37.1906, -8.4378], details: "Magnificent red sandstone castle." },
        { name: "Parque Ambiental de Vilamoura", position: [37.1072, -8.1513], details: "Protected wetland with walking paths." },
        { name: "Quarteira", position: [37.0695, -8.1006], details: "Traditional fishing town." }
    ];

    // Add markers to the map
    pointsOfInterest.forEach(point => {
        const marker = L.marker(point.position).addTo(map);
        let popupContent = `<strong>${point.name}</strong>`;
        if (point.details) {
            popupContent += `<br>${point.details}`;
        }
        marker.bindPopup(popupContent);
    });

    // Itinerary Content (Embedded)
    const itineraryMarkdown = `
# Draft Travel Itinerary: Vilamoura, Portugal (May 7th - May 17th)

**Group:** 4 people
**Accommodation:** Avenida Tivoli - Edifício Orion, Bloco C, 8125-507 Vilamoura, Portugal
**Car Rental:** May 8th - May 12th
**Preferences:** Outdoor activities, nature, cuisine, historical sites, beaches, relaxed pace, late morning starts (around 10:00-11:00 AM).
**Dietary Needs:** One member requires gluten-free and milk-free options.

**Important Note:** For each day involving meals outside the accommodation, proactive research will be needed to identify restaurants offering suitable gluten-free and milk-free options. It is advisable to call ahead or check online menus/reviews.

---

**Day 1: Wednesday, May 7th - Arrival in Vilamoura (No Car)**

*   **Evening (around 21:00):** Arrive at Faro Airport (FAO).
*   **Transfer:** Take a pre-booked transfer, taxi, or ride-sharing service to your accommodation in Vilamoura (approx. 30-40 minutes).
*   **Settle In:** Check into your accommodation.
*   **Dinner:** Given the late arrival and travel, a simple dinner at the accommodation might be best if facilities allow and you can grab some basics. Alternatively, if energy permits, a very casual, quick option near your accommodation. Research nearby late-night spots that might cater to dietary needs beforehand if choosing to eat out.

**Day 2: Thursday, May 8th - Vilamoura Exploration & Car Pickup (Car Available)**

*   **Morning (Late Start):** Enjoy a leisurely breakfast.
*   **Late Morning:** Pick up your rental car.
*   **Lunch:** Explore options in Vilamoura Marina. Begin your search for gluten-free/milk-free friendly restaurants.
*   **Afternoon:**
    *   Familiarize yourselves with Vilamoura. Stroll around the **Vilamoura Marina**, admiring the yachts and browsing the shops.
    *   Visit the **Cerro da Vila Roman Ruins** for a dose of local history.
    *   Relax and enjoy the sun at **Praia de Vilamoura**.
*   **Evening:** Dinner in Vilamoura. Perhaps try a restaurant with a view at the Marina.

**Day 3: Friday, May 9th - Loulé Market & Traditional Portugal (Car Available)**

*   **Morning (Late Start):** Breakfast.
*   **Late Morning/Early Afternoon:** Drive to **Loulé** (approx. 20-25 minutes).
    *   Explore the historic town center and its charming streets.
    *   Visit the **Loulé Market** (Mercado Municipal de Loulé – check opening hours, typically closes early afternoon and may be closed on Sundays). This is a great place for local produce, crafts, and atmosphere.
*   **Lunch:** In Loulé. Research gluten-free/milk-free options in advance.
*   **Afternoon:** Continue exploring Loulé, perhaps visit the Loulé Castle or simply enjoy the ambiance. Alternatively, you could drive through the scenic countryside surrounding Loulé.
*   **Evening:** Return to Vilamoura for dinner, or dine in Loulé if you find a suitable spot.

**Day 4: Saturday, May 10th - Coastal Scenery & Benagil Cave (Car Available)**

*   **Morning (Late Start):** Breakfast.
*   **Late Morning:** Embark on a **boat trip to the Benagil Cave**. Tours often depart from Vilamoura Marina or other nearby ports (e.g., Portimão, Albufeira – check which is most convenient and offers the best experience). These tours showcase stunning coastal rock formations and beaches. Book in advance, especially for a weekend.
*   **Lunch:** Depending on the boat tour (some might offer snacks, or you might pack a light picnic). Alternatively, have lunch at a coastal restaurant near the tour departure/arrival point or back in Vilamoura.
*   **Afternoon:**
    *   Relax on a picturesque beach. **Praia da Marinha**, often cited as one of Portugal’s most beautiful beaches, is accessible with your car and worth a visit.
    *   Alternatively, if you prefer hiking, explore the **cliff-top trails at Praia da Falésia** (accessible from Vilamoura) for breathtaking views.
*   **Evening:** Dinner in Vilamoura.

**Day 5: Sunday, May 11th - Historic Faro & Ria Formosa (Car Available)**

*   **Morning (Late Start):** Breakfast.
*   **Late Morning/Early Afternoon:** Drive to **Faro** (approx. 30-40 minutes), the capital of the Algarve.
    *   Explore the **Faro Old Town (Cidade Velha)**, walk through the Arco da Vila, and visit the Faro Cathedral (Sé Catedral de Faro).
*   **Lunch:** In Faro. Research gluten-free/milk-free options in the Old Town or Marina area.
*   **Afternoon:**
    *   Consider a boat trip through the **Ria Formosa Natural Park**, a beautiful lagoon system with diverse birdlife and islands. Trips depart from Faro Marina.
    *   Alternatively, visit **Praia de Faro**, a long sandy beach accessible by bridge.
*   **Evening:** Enjoy dinner in Faro to experience its evening atmosphere, or return to Vilamoura.

**Day 6: Monday, May 12th - Western Algarve Charm or Inland History (Last Day with Car)**

*   **Morning (Late Start):** Breakfast.
*   **Late Morning:** Choose your adventure for the last day with the car:
    *   **Option 1 (Coastal Focus):** Drive further west to **Lagos** (approx. 45-60 minutes). Explore the stunning rock formations of **Ponta da Piedade** (consider a small boat trip here too), and visit beautiful beaches like Praia Dona Ana or Praia do Camilo.
    *   **Option 2 (Historical Focus):** Visit **Silves** (approx. 30-40 minutes), a historic town dominated by a magnificent red sandstone castle. Explore the castle and the old town.
    *   **Option 3 (Relaxed Nature):** If not yet visited, spend time at the **Parque Ambiental de Vilamoura** for a peaceful walk and birdwatching.
*   **Lunch:** At your chosen destination (Lagos, Silves, or near Parque Ambiental).
*   **Late Afternoon:** Return the rental car as per your agreement.
*   **Evening:** Dinner in Vilamoura.

**Day 7: Tuesday, May 13th - Vilamoura Relaxation (No Car)**

*   **Morning (Late Start):** Leisurely breakfast.
*   **Day:** Enjoy a relaxed day in Vilamoura.
    *   Spend time at **Praia de Vilamoura** or **Praia da Falésia** (accessible by foot, local bus, or taxi).
    *   Browse local shops for souvenirs.
    *   Consider activities like mini-golf or simply relaxing by a pool if your accommodation has one.
*   **Lunch & Dinner:** In Vilamoura, exploring local restaurants that cater to your group’s needs.

**Day 8: Wednesday, May 14th - Local Discoveries (No Car)**

*   **Morning (Late Start):** Breakfast.
*   **Day:** Further exploration of Vilamoura and nearby areas using local transport or taxis.
    *   You could take a local bus or taxi to **Quarteira** to experience its promenade and perhaps its market (if you missed it or want to revisit – check market days).
    *   Enjoy a long walk along the Vilamoura promenade.
*   **Lunch & Dinner:** In Vilamoura or Quarteira.

**Day 9: Thursday, May 15th - Leisurely Pace (No Car)**

*   **Morning (Late Start):** Breakfast.
*   **Day:** Another day to enjoy at a relaxed pace.
    *   Revisit a favorite beach or spot in Vilamoura.
    *   Enjoy coffee at a local café.
    *   Consider looking for local experiences like a wine tasting (check for accessibility and dietary accommodations) or simply enjoy the resort atmosphere.
*   **Lunch & Dinner:** In Vilamoura.

**Day 10: Friday, May 16th - Last Full Day (No Car)**

*   **Morning (Late Start):** Breakfast.
*   **Day:** Enjoy your last full day in the Algarve.
    *   Do some last-minute souvenir shopping.
    *   Relax and pack at a leisurely pace.
    *   Enjoy a final walk along the beach or marina.
*   **Lunch:** In Vilamoura.
*   **Evening:** Have a special farewell dinner at a pre-researched restaurant in Vilamoura that can accommodate the gluten-free and milk-free dietary requirements well.

**Day 11: Saturday, May 17th - Departure**

*   **Morning:** Enjoy a final breakfast in Vilamoura.
*   **Late Morning:** Complete packing and check out from your accommodation.
*   **Transfer:** Arrange a taxi or pre-booked transfer to Faro Airport (FAO). Allow ample time for travel (approx. 30-40 minutes) and airport procedures.
*   **Departure (around 14:00):** Depart from Faro Airport.

---

This itinerary is a suggestion and can be adjusted based on the group’s energy levels and specific interests each day. Enjoy your trip to the Algarve!
    `;

    const itineraryContentDiv = document.getElementById("itinerary-content");
    if (itineraryContentDiv) {
        // Basic conversion of markdown to HTML (very simplified)
        let htmlContent = itineraryMarkdown.replace(/\n/g, "<br>");
        htmlContent = htmlContent.replace(/^# (.*?)<br>/gm, "<h1>$1</h1>"); // For the main title
        htmlContent = htmlContent.replace(/\*\*Day \d+: (.*?)\*\*<br>/g, "<h3>Day $1</h3>"); // For Day titles
        htmlContent = htmlContent.replace(/\*\*(.*?):\*\* (.*?)<br>/g, "<strong>$1:</strong> $2<br>"); // For bold key-value pairs
        htmlContent = htmlContent.replace(/\*\*Important Note:\*\* (.*?)<br>/g, "<p><strong>Important Note:</strong> $1</p>");
        htmlContent = htmlContent.replace(/\*\* (.*?) \*\*<br>/g, "<strong>$1</strong><br>"); // General bolding
        htmlContent = htmlContent.replace(/\*\s+(.*?)(<br>|$)/g, "<li>$1</li>"); // List items
        // Wrap consecutive list items in ul tags
        htmlContent = htmlContent.replace(/(<li>.*?<\/li>)(?=(<li>|[^<]))/g, "$1"); // Consolidate list items
        htmlContent = htmlContent.replace(/(<li>.*?<\/li>)+/g, "<ul>$&</ul>"); // Wrap in UL
        htmlContent = htmlContent.replace(/---<br>/g, "<hr>"); // Horizontal rule

        itineraryContentDiv.innerHTML = htmlContent;
    } else {
        console.error("Itinerary content div not found.");
    }
});

