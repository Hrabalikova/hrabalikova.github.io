document.addEventListener("DOMContentLoaded", function () {
    // Initialize the map and set its view to a central Algarve location
    const map = L.map("map").setView([37.0779, -8.1162], 10); // Centered on Vilamoura

    // Add a tile layer to the map (OpenStreetMap)
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors",
    }).addTo(map);

    // Define points of interest with their coordinates and descriptions
    const pointsOfInterest = [
        {
            lat: 37.0780, // Approx. Edifício Orion, Vilamoura (Accommodation)
            lng: -8.1160,
            name: "Accommodation: Edifício Orion, Vilamoura",
            description: "Avenida Tivoli - Edifício Orion, Bloco C, 8125-507 Vilamoura, Portugal."
        },
        {
            lat: 37.0144, 
            lng: -7.9659,
            name: "Faro Airport (FAO)",
            description: "Arrival and Departure Point."
        },
        {
            lat: 37.0763, 
            lng: -8.1153,
            name: "Vilamoura Marina",
            description: "Popular spot for strolling, dining, and boat trips."
        },
        {
            lat: 37.0770, 
            lng: -8.1130,
            name: "Cerro da Vila Roman Ruins",
            description: "Historical site in Vilamoura."
        },
        {
            lat: 37.0738, 
            lng: -8.1115,
            name: "Praia de Vilamoura",
            description: "Main beach in Vilamoura, good for swimming and relaxing."
        },
        {
            lat: 37.1400, 
            lng: -8.0200,
            name: "Loulé",
            description: "Historic town with a traditional market."
        },
        {
            lat: 37.1382, 
            lng: -8.0234,
            name: "Loulé Market (Mercado Municipal)",
            description: "Famous market for local produce and crafts."
        },
        {
            lat: 37.1406, 
            lng: -8.0241,
            name: "Loulé Castle",
            description: "Historic castle in Loulé."
        },
        {
            lat: 37.0875, 
            lng: -8.4433,
            name: "Benagil Cave (Area)",
            description: "Famous sea cave, typically visited by boat."
        },
        {
            lat: 37.0899, 
            lng: -8.4128,
            name: "Praia da Marinha",
            description: "One of Portugal’s most beautiful beaches, great for swimming. Eastern trailhead for Seven Hanging Valleys."
        },
        {
            lat: 37.0914, 
            lng: -8.4560,
            name: "Praia de Vale Centeanes",
            description: "Western trailhead for the Seven Hanging Valleys Trail."
        },
        {
            lat: 37.0800, 
            lng: -8.1450,
            name: "Praia da Falésia",
            description: "Long beach with stunning cliffs, good for swimming and walks."
        },
        {
            lat: 37.0161, 
            lng: -7.9350,
            name: "Faro Old Town (Cidade Velha)",
            description: "Historic center of Faro."
        },
        {
            lat: 37.0147, 
            lng: -7.9349,
            name: "Arco da Vila, Faro",
            description: "Historic archway into Faro Old Town."
        },
        {
            lat: 37.0141, 
            lng: -7.9347,
            name: "Faro Cathedral (Sé Catedral de Faro)",
            description: "Main cathedral in Faro."
        },
        {
            lat: 37.0330, // Approx. Ludo Trail Access Point
            lng: -7.9880,
            name: "Ludo Trail (Ria Formosa)",
            description: "Nature trail in Ria Formosa, great for birdwatching."
        },
        {
            lat: 37.0085, 
            lng: -7.9940,
            name: "Praia de Faro",
            description: "Long sandy beach near Faro, good for swimming."
        },
        {
            lat: 37.1020, 
            lng: -8.6730,
            name: "Lagos",
            description: "Historic coastal town with beautiful rock formations."
        },
        {
            lat: 37.0815, 
            lng: -8.6691,
            name: "Ponta da Piedade",
            description: "Stunning cliffs and grottoes near Lagos."
        },
        {
            lat: 37.0906, 
            lng: -8.6671,
            name: "Praia Dona Ana",
            description: "Picturesque beach in Lagos, good for swimming."
        },
        {
            lat: 37.0870, 
            lng: -8.6680,
            name: "Praia do Camilo",
            description: "Beautiful cove beach in Lagos, good for swimming."
        },
        {
            lat: 37.1895, 
            lng: -8.4396,
            name: "Silves",
            description: "Historic town with a prominent castle."
        },
        {
            lat: 37.1910, 
            lng: -8.4380,
            name: "Silves Castle",
            description: "Impressive red sandstone castle in Silves."
        },
        {
            lat: 37.0908, 
            lng: -8.1153,
            name: "Parque Ambiental de Vilamoura",
            description: "Nature park in Vilamoura for walks and birdwatching."
        },
        {
            lat: 37.2504, 
            lng: -8.0978,
            name: "Rocha da Pena Trailhead",
            description: "Trailhead for a scenic inland hike."
        },
        {
            lat: 37.0680, 
            lng: -8.1000,
            name: "Quarteira",
            description: "Neighboring town with a promenade and market."
        }
    ];

    // Add markers to the map
    pointsOfInterest.forEach(point => {
        L.marker([point.lat, point.lng])
            .addTo(map)
            .bindPopup(`<b>${point.name}</b><br>${point.description}`);
    });

    // Store points for potential export (used by other functions if needed)
    window.mapPoints = pointsOfInterest;
});

