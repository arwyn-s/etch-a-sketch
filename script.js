// Create a grid inside canvas
CanvasWidth = {
  x1: 32,
  x2: 64,
  x3: 96,
  x5: 160,
};
CanvasHeight = {
  x1: 16,
  x2: 32,
  x3: 48,
  x5: 80,
};

function RGBColor(r, g, b) {
  this.r = r;
  this.g = g;
  this.b = b;
}

window.onload = initGrid;

function initGrid() {
  createGrid("x1");
}

function createGrid(resolution) {
  // Remove all child if exists.

  document.documentElement.style.setProperty(
    "--grid-sides",
    960 / CanvasWidth[resolution] + "px"
  );
  for (var i = 0; i < CanvasHeight[resolution] * CanvasWidth[resolution]; i++) {
    var grids = document.createElement("div");
    grids.classList.add("pixels");
    canvas.appendChild(grids);
  }
}

function resetGrid() {
  var canvas = document.getElementById("canvas");
  while (canvas.hasChildNodes()) {
    canvas.removeChild(canvas.lastChild);
  }
}

function resetAndCreate(resolution = "x1") {
  resetGrid();
  createGrid(resolution);
}
// change the size of grid , selected from drop down.

document
  .querySelector("select")
  .addEventListener("change", () =>
    resetAndCreate(document.querySelector("select").value)
  );
/// Buttons listeners
var isRandom = false;
// Random Color generators
function getColor(isRandom) {
  if (isRandom) {
    let r = Math.floor(Math.random() * 128 + 128),
      g = Math.floor(Math.random() * 128 + 128),
      b = Math.floor(Math.random() * 128 + 128);
    return new RGBColor(r, g, b);
  } else {
    return new RGBColor(0, 0, 0);
  }
}
function colorString(colors) {
  return "rgb(" + colors.r + ", " + colors.g + ", " + colors.b + ")";
}

function stringColor(string) {
  var rgb = string.replace(/[^\d,]/g, "").split(",");
  this.r = Number(rgb[0]);
  this.g = Number(rgb[1]);
  this.b = Number(rgb[2]);
}

function darkenColor(colors) {
  return (
    "rgb(" +
    Math.floor((3 * colors.r) / 4) +
    ", " +
    Math.floor((3 * colors.g) / 4) +
    ", " +
    Math.floor((3 * colors.b) / 4) +
    ")"
  );
}

document
  .getElementById("blackColor")
  .addEventListener("click", () => (isRandom = false));
document
  .getElementById("randomColor")
  .addEventListener("click", () => (isRandom = true));
///Reset BUtton
document
  .getElementById("clearButton")
  .addEventListener("click", () => resetAndCreate(document.querySelector("select").value));
//Drawing.
//Toggle drawing by clicking canvas.
//Hover over the canvas and 'darken'.
let draw = false;
document
  .querySelector("#canvas")
  .addEventListener("click", () => (draw = !draw));
//Add eventListeners for each div in canvas.

//Delegated Event.
//Add colors to each div.

document.querySelector("#canvas").addEventListener("mouseover", function (e) {
  if (draw && e.target.matches("div.pixels.colored")) {
    e.target.style.background = darkenColor(
      new stringColor(e.target.style.background)
    );
  } else if (draw && e.target.matches("div.pixels")) {
    e.target.classList.add("colored");
    e.target.style.background = colorString(getColor(isRandom));
  }
});
