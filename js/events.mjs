export default class EventEmitter {
  constructor() {
    this.events = Object.create(null);
  }

  on(type, fn) {
    if (typeof type !== "string" || typeof fn !== "function") {
      return;
    }
    this.events[type] = this.events[type] || [];
    this.events[type].push(fn);
  }

  emit(type, ...args) {
    const fns = this.events[type];
    if (Array.isArray(fns)) {
      fns.forEach(function(fn) {
        fn(...args);
      });
    }
  }

  remove(type, fn) {
    if (typeof type !== "string") {
      return;
    }
    if (fn == null) {
      // 批量删除
      this.events[type] = [];
    } else if (typeof fn === "function") {
      // 单个删除
      const fns = this.events[type];
      const index = (fns[type] || []).findIndex(function(f) {
        return f === fn;
      });

      if (index >= 0) {
        fns.splice(index, 1);
      }
    }
  }
}
