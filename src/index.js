// ------------------------------------
// CITY INFORMATION
// ------------------------------------

const cities = {
  "America/Los_Angeles": {
    name: "Los Angeles",
  },

  "Europe/Paris": {
    name: "Paris",
  },

  "Asia/Tokyo": {
    name: "Tokyo",
  },

  "Africa/Lagos": {
    name: "Lagos",
  },

  "America/New_York": {
    name: "New York",
  },
};

// ------------------------------------
// FORMAT TIME
// ------------------------------------

function getTime(timeZone) {
  const now = new Date();

  return new Intl.DateTimeFormat("en-US", {
    timeZone: timeZone,

    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",

    hour12: true,
  }).format(now);
}

// ------------------------------------
// FORMAT DATE
// ------------------------------------

function getDate(timeZone) {
  const now = new Date();

  return new Intl.DateTimeFormat("en-US", {
    timeZone: timeZone,

    weekday: "long",

    month: "long",

    day: "numeric",

    year: "numeric",
  }).format(now);
}

// ------------------------------------
// UPDATE WORLD CLOCKS
// ------------------------------------

function updateWorldClocks() {
  // Los Angeles

  document.getElementById("la-time").textContent = getTime(
    "America/Los_Angeles",
  );

  document.getElementById("la-date").textContent = getDate(
    "America/Los_Angeles",
  );

  // Paris

  document.getElementById("paris-time").textContent = getTime("Europe/Paris");

  document.getElementById("paris-date").textContent = getDate("Europe/Paris");

  // Tokyo

  document.getElementById("tokyo-time").textContent = getTime("Asia/Tokyo");

  document.getElementById("tokyo-date").textContent = getDate("Asia/Tokyo");
}

// ------------------------------------
// USER'S CURRENT LOCATION
// ------------------------------------

function updateLocalTime() {
  const localTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  document.getElementById("local-location").textContent =
    "Your time zone: " + localTimeZone;

  document.getElementById("local-time").textContent = getTime(localTimeZone);

  document.getElementById("local-date").textContent = getDate(localTimeZone);
}

// ------------------------------------
// DROPDOWN
// ------------------------------------

const citySelect = document.getElementById("citySelect");

citySelect.addEventListener("change", function () {
  const selectedTimeZone = this.value;

  const selectedCity = document.getElementById("selectedCity");

  const homeLink = document.getElementById("homeLink");

  // Nothing selected

  if (selectedTimeZone === "") {
    selectedCity.innerHTML = "";

    homeLink.style.display = "none";

    return;
  }

  // Get city

  const city = cities[selectedTimeZone];

  // Show selected city

  selectedCity.innerHTML = `

        <div class="selected-city">

            <h2>${city.name}</h2>

            <p>${getDate(selectedTimeZone)}</p>

            <div class="selected-time">

                ${getTime(selectedTimeZone)}

            </div>

        </div>

    `;

  // Show homepage link

  homeLink.style.display = "inline-block";
});

// ------------------------------------
// START CLOCK
// ------------------------------------

updateWorldClocks();

updateLocalTime();

// Update every second

setInterval(function () {
  updateWorldClocks();

  updateLocalTime();
}, 1000);
