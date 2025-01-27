import { Gradient } from "canvas-mesh-gradient";
import { OrbitingBody } from "./OrbitingBody";

document.addEventListener("resize", function () {
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

  let setupCanvas = function () {
    var canvas = document.querySelector("#orbits");
    var ctx = canvas.getContext("2d");
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;
    var hw = canvas.width / 2;
    var hh = canvas.height / 2;
    ctx.transform(1, 0, 0, -1, hw, hh - 50);
    ctx.fillStyle = "white";

    const bodies = [
      // mass, rMajor, rMinor, focusDist, color, start%
      new OrbitingBody(10, 300, 305, 10, "0,121,207", 0.2),
      new OrbitingBody(25, 350, 275, 10, "255,124,231", 0.56),
      new OrbitingBody(10, 380, 180, 10, "0,121,207", 0.08),
      new OrbitingBody(25, 350, 350, 10, "255,124,231", 0.96),
      new OrbitingBody(10, 320, 250, 10, "0,121,207", 0.5),
      new OrbitingBody(15, 380, 280, -10, "255,124,231", 0.28),
      new OrbitingBody(25, 400, 280, 10, "255,124,231", 0.1),
      new OrbitingBody(20, 450, 340, 10, "255,255,255", 0.32),
      new OrbitingBody(25, 500, 380, 10, "255,255,255", 0.25),
      new OrbitingBody(10, 550, 450, -10, "0,121,207", 0.48),
      // new OrbitingBody(25, 600, 490, 10, "255,124,231", 0.72),
      // new OrbitingBody(30, 650, 550, -20, "255,255,255", 0.88),
      // new OrbitingBody(20, 700, 480, -20, "255,255,255", 0.68),
    ];

    function next() {
      ctx.clearRect(
        -canvas.width / 2,
        -canvas.height / 2 - 50,
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

  setupCanvas();
});
