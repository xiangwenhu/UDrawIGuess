import Drawer from "./drawer.mjs";
import { getEventPoint, eventsName } from "./util.mjs";

export default class GuessDrawer extends Drawer {
  constructor(canvas, emitter) {
    super(canvas);
    this.emitter = emitter;
    this.init();
  }

  init() {
    this.registerEvents();
  }

  registerEvents() {
    if (!this.emitter) {
      return;
    }
    this.emitter.on("mousedown", this.onMouseDown.bind(this));
    this.emitter.on("mousemove", this.onMouseMove.bind(this));
    this.emitter.on("setColor", this.onSetColor.bind(this));
    this.emitter.on("setWidth", this.onSetWidth.bind(this));
    this.emitter.on("clear", this.onClear.bind(this));
  }

  onMouseDown({ point, mode, width }) {
    const p = this.getComputedPoint(point, width);
    if (mode === 1) {
      super.drawStart(p);
    } else {
      super.clear(p);
    }
  }

  onMouseMove({ point, mode, width }) {
    const p = this.getComputedPoint(point, width);
    if (mode === 1) {
      super.drawMove(p);
    } else {
      super.clear(p);
    }
  }

  onSetColor(color) {
    super.setColor(color);
  }

  onSetWidth(width) {
    super.setWidth(width);
  }

  onClear({ point }) {
    super.clear(point);
  }

  getComputedPoint(point, sourceWith) {
    if (!sourceWith) {
      return point;
    }
    const width = this.canvas.width;
    const percent = width / sourceWith;
    return {
      x: percent * point.x,
      y: percent * point.y
    };
  }
}
