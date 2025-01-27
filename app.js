import { Gradient } from "canvas-mesh-gradient";
import { OrbitingBody } from "./OrbitingBody";

// let bodies = [];

function setupCanvas() {
  let canvas = document.querySelector("#orbits");
  let ctx = canvas.getContext("2d");
  canvas.width = document.body.clientWidth;
  canvas.height = document.body.clientHeight;
  let hw = canvas.width / 2;
  let hh = canvas.height / 2;
  ctx.transform(1, 0, 0, -1, hw, hh);
  ctx.fillStyle = "white";
  return { ctx, canvas };
}

let start = function () {
  let { ctx, canvas } = setupCanvas();

  const bodies = [
    // mass, rMajor, rMinor, focusDist, color, start%
    new OrbitingBody(10, 300, 305, 10, "0,121,207", 0.2),
    new OrbitingBody(25, 350, 275, 10, "255,124,231", 0.56),
    new OrbitingBody(10, 380, 320, 10, "0,121,207", 0.08),
    new OrbitingBody(25, 350, 350, 10, "255,124,231", 0.96),
    new OrbitingBody(10, 320, 300, 10, "0,121,207", 0.5),
    new OrbitingBody(15, 380, 320, -10, "255,124,231", 0.28),
    new OrbitingBody(25, 400, 340, 10, "255,124,231", 0.1),
    new OrbitingBody(20, 450, 380, 10, "255,255,255", 0.32),
    new OrbitingBody(25, 500, 420, 10, "255,255,255", 0.25),
    new OrbitingBody(10, 550, 470, -10, "0,121,207", 0.48),
    // new OrbitingBody(25, 600, 490, 10, "255,124,231", 0.72),
    // new OrbitingBody(30, 650, 550, -20, "255,255,255", 0.88),
    // new OrbitingBody(20, 700, 480, -20, "255,255,255", 0.68),
  ];

  function next() {
    ctx.clearRect(
      -canvas.width / 2,
      -canvas.height / 2,
      canvas.width,
      canvas.height,
    );
    bodies.forEach((body) => {
      body.updatePosition();
      body.draw(ctx);
    });

    window.requestAnimationFrame(next);
  }

  next();
};

window.addEventListener("resize", function () {
  setupCanvas();
});

document.addEventListener("DOMContentLoaded", function () {
  new Gradient({
    canvas: "canvas#gradient",
    colors: ["#FF7CE7", "#FF7CE7", "#0079CF", "#86b4db"],
    // wireframe: true,
    // density: [0.1, 0.7],
    // amplitude: 1000,
    static: false, // Enable non-animating gradient
  });

  document.getElementById("gradient").classList.remove("opacity-0");
  document.getElementById("halo").classList.remove("opacity-0");
  document.getElementById("orbits").classList.remove("opacity-0");
  document.getElementById("fallback").classList.remove("opacity-0");
  start();
});
