import Drawer from "./drawer.mjs";
import { getEventPoint, eventsName } from "./util.mjs";

export default class PlayerDrawer extends Drawer {
  constructor(canvas, emitter) {
    super(canvas);
    this.emitter = emitter || new EventEmitter();
    // 1:绘制 2:擦除
    this.mode = 1;
    this.init();
  }

  init() {
    this.registerEvents();
  }

  registerEvents() {
    const { canvas } = this;
    canvas[`on${eventsName.mousedown}`] = this.onMouseDown.bind(this);
    canvas[`on${eventsName.mouseup}`] = this.onMouseUp.bind(this);
    canvas[`on${eventsName.mousemove}`] = this.onMouseMove.bind(this);
    canvas[`on${eventsName.mouseleave}`] = this.onMouseLeave.bind(this);

    document.addEventListener(eventsName.mouseup, () => {
      if (this.isDrawing) {
        this.isDrawing = false;
      }
    });
  }

  onMouseDown(ev) {
    const point = getEventPoint(ev, this.rect);
    if (this.mode === 1) {
      super.drawStart(point);
    } else {
      super.clear(point);
    }
    this.dispatch("mousedown", { point });
    ev.preventDefault();
  }

  onMouseUp(ev) {
    this.isDrawing = false;
    this.dispatch("mouseup");
  }

  onMouseMove(ev) {
    const point = getEventPoint(ev, this.rect);
    if (this.mode === 1 && this.isDrawing) {
      super.drawMove(point);
      this.dispatch("mousemove", { point });
    } else if (this.mode === 2) {
      super.clear(point);
      this.dispatch("mousemove", { point });
    }
    ev.preventDefault();
  }

  onMouseLeave(ev) {
    //this.isDrawing = false;
  }

  on(type, fn) {
    if (this.emitter) {
      this.emitter.on(type, fn);
    }
  }

  dispatch(type, data, ...args) {
    if (this.emitter) {
      if (typeof data === "object") {
        const d = Object.assign({}, data, {
          width: this.canvas.width,
          mode: this.mode
        });
        this.emitter.emit(type, d, ...args);
        return;
      }
      this.emitter.emit(type, data, ...args);
    }
  }

  clear(point) {
    super.clear(point);
    this.dispatch("clear", { point });
  }

  set color(value) {
    super.setColor(value);
    this.dispatch("setColor", value);
  }

  set width(value) {
    super.setWidth(value);
    this.dispatch("setWidth", value);
  }
}
