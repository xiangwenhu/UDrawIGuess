export default class Drawer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.rect = canvas.getBoundingClientRect();
    this.isDrawing = false;
    this.strokeStyle = "#000";
    this.lineWidth = 1;
    this.init();
  }

  setColor(color) {
    this.strokeStyle = color;
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
    this.isDrawing = true;
    ctx.strokeStyle = this.strokeStyle;
    ctx.lineWidth = this.lineWidth;
    ctx.beginPath();
    ctx.moveTo(point.x, point.y);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineTo(point.x, point.y);
    ctx.stroke(); //画一个点
  }

  drawMove(point) {
    if (this.isDrawing) {
      this.ctx.lineTo(point.x, point.y);
      this.ctx.strokeStyle = this.strokeStyle;
      this.ctx.lineWidth = this.lineWidth;
      this.ctx.stroke();
    }
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
}
