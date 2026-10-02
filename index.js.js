const defaultZones = {
  "los-angeles": "America/Los_Angeles",
  "paris": "Europe/Paris",
};

const citySelect = document.querySelector("#city");
const citiesBox = document.querySelector("#cities");
const backLink = document.querySelector("#back");
let selectedZone = null;

function fmtDate(t) { return t.format("MMMM Do YYYY"); }
function fmtTime(t) { return t.format("h:mm:ss") + " <small>" + t.format("A") + "</small>"; }

function renderDefaults() {
  for (const id in defaultZones) {
    const el = document.getElementById(id);
    if (!el) continue;
    const t = moment().tz(defaultZones[id]);
    el.querySelector(".date").innerHTML = fmtDate(t);
    el.querySelector(".time").innerHTML = fmtTime(t);
  }
}

function renderSelected() {
  const t = moment().tz(selectedZone);
  const name = selectedZone.replace(/_/g, " ").split("/").pop();
  citiesBox.innerHTML =
    '<div class="city"><div><h2>' + name + '</h2><div class="date">' +
    fmtDate(t) + '</div></div><div class="time">' + fmtTime(t) + "</div></div>";
}

function showAll() {
  selectedZone = null;
  citySelect.value = "";
  backLink.style.display = "none";
  citiesBox.innerHTML = Object.keys(defaultZones).map(function (id) {
    const label = id === "los-angeles" ? "Los Angeles" : "Paris";
    return '<div class="city" id="' + id + '"><div><h2>' + label +
      '</h2><div class="date"></div></div><div class="time"></div></div>';
  }).join("");
  renderDefaults();
}

citySelect.addEventListener("change", function (event) {
  const value = event.target.value;
  if (!value) { showAll(); return; }
  selectedZone = value === "current" ? moment.tz.guess() : value;
  backLink.style.display = "inline-block";
  renderSelected();
});

backLink.addEventListener("click", function (e) {
  e.preventDefault();
  showAll();
});

renderDefaults();
setInterval(function () {
  if (selectedZone) renderSelected();
  else renderDefaults();
}, 1000);
