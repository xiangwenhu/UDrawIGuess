export default class Drawer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.rect = canvas.getBoundingClientRect();
    this.strokeStyle = "#000";
    this.lineWidth = 1;
    this.init();
  }

  init() {
    /*     var canvas = this.canvas;
    var rate = this.getPixelRatio();
    this.canvas.width = this.canvas.width * this.getPixelRatio();
    this.canvas.height = this.canvas.height * this.getPixelRatio();
    // this.ctx.scale(1 / rate, 1 / rate);
    canvas.style.transformOrigin = "0 0"; //scale from top left
    // canvas.style.transform = "scale(" + 1 / rate + ")"; */

    this.setContexts({
      shadowColor: "#000",
      shadowBlur: 0.25,
      shadowOffsetX: 0,
      shadowOffsetY: 0.25
    });

    this.ctx.imageSmoothingEnabled = true;
  }

  getPixelRatio() {
    var ctx = this.ctx;
    var backingStore =
      ctx.backingStorePixelRatio ||
      ctx.webkitBackingStorePixelRatio ||
      ctx.mozBackingStorePixelRatio ||
      ctx.msBackingStorePixelRatio ||
      ctx.oBackingStorePixelRatio ||
      ctx.backingStorePixelRatio ||
      1;
    return (window.devicePixelRatio || 1) / backingStore;
  }

  setContexts(kv) {
    for (var p in kv) {
      this.setContext(p, kv[p]);
    }
  }

  setContext(property, value) {
    if (property in this.ctx) {
      this.ctx[property] = value;
    }
  }

  setColor(color) {
    this.strokeStyle = color;
    // this.setContext("shadowColor", color);
    this.ctx.shadowColor = color;
  }

  setWidth(width) {
    this.lineWidth = width;
  }

  clear(point) {
    const { ctx } = this;
    const wh = this.getWH();

    if (!point) {
      this.ctx.clearRect(0, 0, wh.width, wh.height);
    } else {
      ctx.save();
      ctx.beginPath();
      ctx.arc(point.x, point.y, this.lineWidth, 0, Math.PI * 2, false);
      ctx.clip();
      ctx.clearRect(0, 0, wh.width, wh.height);
      ctx.restore();
    }
  }
  getWH() {
    return {
      height: this.canvas.height,
      width: this.canvas.width
    };
  }

  drawStart(point) {
    const { ctx } = this;
    ctx.strokeStyle = this.strokeStyle;
    ctx.lineWidth = this.lineWidth;
    ctx.beginPath();
    ctx.moveTo(point.x, point.y);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineTo(point.x, point.y);
    // ctx.stroke(); //画一个点
  }

  drawMove(point) {
    var ctx = this.ctx;
    ctx.lineTo(point.x, point.y);
    ctx.stroke();
  }

  arcTo(point1, point2, radius) {
    var ctx = this.ctx;
    ctx.arcTo(point1.x, point1.y, point2.x, point2.y, radius);
    ctx.stroke();
  }

  toDataURL(type, quality) {
    return this.canvas.toDataURL(type || "image/png", quality | 0.75);
  }

  drawImage(img, x, y, width, height) {
    this.ctx.drawImage(
      img,
      x,
      y,
      width | this.canvas.width,
      height | this.canvas.height
    );
  }

  quadraticCurveTo(cpx, cpy, x, y) {
    var ctx = this.ctx;
    ctx.quadraticCurveTo(cpx, cpy, x, y);
    ctx.stroke();
  }
}
