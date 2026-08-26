import "@testing-library/jest-dom/vitest";

if (!window.matchMedia) {
  window.matchMedia = () => ({
    matches: false,
    media: "",
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  });
}

if (!window.ResizeObserver) {
  window.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}

if (!window.IntersectionObserver) {
  window.IntersectionObserver = class {
    constructor(callback) {
      this.callback = callback;
    }
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return [];
    }
  };
}

// jsdom doesn't implement media playback — without this, every render of a
// <video autoPlay> logs a noisy "not implemented" warning to stderr.
if (window.HTMLMediaElement) {
  window.HTMLMediaElement.prototype.play = () => Promise.resolve();
  window.HTMLMediaElement.prototype.pause = () => {};
}
