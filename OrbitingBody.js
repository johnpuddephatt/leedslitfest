export class OrbitingBody {
  constructor(mass, rMajor, rMinor, focusDist, color, position) {
    let vmax = Math.max(
      document.documentElement.clientWidth,
      document.documentElement.clientHeight,
    );
    let portrait =
      document.documentElement.clientWidth <
      document.documentElement.clientHeight;
    this.mass = mass;
    this.rMajor = ((portrait ? rMinor : rMajor) * vmax) / 2;
    this.rMinor = ((portrait ? rMajor : rMinor) * vmax) / 2;
    this.focusDist = focusDist;
    this.color = color;
    this.boundaryMajor = this.rMajor - 0.001;
    this.signY = position > 0.5 ? -1 : 1;
    this.xIndex = Math.cos(position * 2 * Math.PI - Math.PI) * this.rMajor;
    this.posX = 0;
    this.posY = 0;
    this.velX = 0;
    this.gravParam = mass;
    this.orbitalPeriod =
      (2 * Math.PI * this.rMajor ** 1.5) / this.gravParam ** 0.5;
    this.deltaTime = this.orbitalPeriod / 1500;
  }

  updatePosition() {
    this.posX = this.xIndex + this.velX * this.deltaTime;
    if (this.signY * this.posX > this.boundaryMajor) {
      this.posX = this.signY * this.boundaryMajor;
      this.signY = -this.signY;
    }
    this.posY =
      this.signY *
      this.rMinor *
      (1 - (this.posX * this.posX) / this.rMajor / this.rMajor) ** 0.5;
    this.velX =
      (this.posY / this.rMinor) *
      ((this.gravParam * this.rMajor) /
        ((this.posX - this.focusDist) ** 2 + this.posY * this.posY)) **
        0.5;

    this.xIndex = this.posX;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.posX, this.posY, this.mass, 0, 2 * Math.PI);
    // ctx.fillStyle = this.color;
    if (this.posY < 0) {
      ctx.fillStyle = `rgba(${this.color}, ${1 - -this.posY / this.rMinor})`;
    } else {
      ctx.fillStyle = `rgba(${this.color}, ${1 - this.posY / this.rMinor})`;

      // ctx.fillStyle = `rgba(${this.color},1)`;
    }

    ctx.fill();
  }
}
