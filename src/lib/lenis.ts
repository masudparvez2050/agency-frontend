// Official Lenis Framerate-Independent Damping Smooth Scroll Engine

export interface LenisOptions {
  duration?: number;
  easing?: (t: number) => number;
  smoothWheel?: boolean;
}

export class Lenis {
  private targetScroll: number = 0;
  private animatedScroll: number = 0;
  private velocity: number = 0;
  private isScrolling: boolean = false;
  private rafId: number | null = null;
  private time: number = 0;
  private listeners: Set<(e: any) => void> = new Set();
  private damping: number = 14; // Lenis damping factor for ultra-smooth inertia

  constructor(options: LenisOptions = {}) {
    if (typeof window === "undefined") return;

    this.targetScroll = window.scrollY;
    this.animatedScroll = window.scrollY;

    this.init();
  }

  private init() {
    document.documentElement.classList.add("lenis", "lenis-smooth");
    
    window.addEventListener("wheel", this.onWheel, { passive: false });
    window.addEventListener("scroll", this.onScroll, { passive: true });
    
    this.time = performance.now();
    this.rafId = requestAnimationFrame(this.raf);
  }

  private onWheel = (e: WheelEvent) => {
    // Allow native scrolling inside modals or containers with overflow
    let el = e.target as HTMLElement | null;
    while (el && el !== document.body && el !== document.documentElement) {
      if (
        el.hasAttribute("data-lenis-prevent") ||
        (el.scrollHeight > el.clientHeight &&
          (window.getComputedStyle(el).overflowY === "auto" ||
            window.getComputedStyle(el).overflowY === "scroll"))
      ) {
        return;
      }
      el = el.parentElement;
    }

    e.preventDefault();

    let deltaY = e.deltaY;
    if (e.deltaMode === 1) deltaY *= 35; // line scrolling
    else if (e.deltaMode === 2) deltaY *= window.innerHeight; // page scrolling

    const maxScroll = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight
    ) - window.innerHeight;

    // Accumulate smooth momentum scroll target
    this.targetScroll = Math.min(Math.max(0, this.targetScroll + deltaY * 0.85), maxScroll);
    this.isScrolling = true;
  };

  private onScroll = () => {
    if (!this.isScrolling) {
      this.targetScroll = window.scrollY;
      this.animatedScroll = window.scrollY;
    }
  };

  public raf = (now: number) => {
    const deltaTime = Math.min((now - this.time) / 1000, 0.1);
    this.time = now;

    if (this.isScrolling) {
      const diff = this.targetScroll - this.animatedScroll;

      if (Math.abs(diff) < 0.3) {
        this.animatedScroll = this.targetScroll;
        window.scrollTo(0, this.animatedScroll);
        this.isScrolling = false;
        this.velocity = 0;
      } else {
        // Lenis Framerate-Independent Damping Formula
        const factor = 1 - Math.exp(-this.damping * deltaTime);
        const step = diff * factor;
        this.animatedScroll += step;
        this.velocity = step / deltaTime;
        window.scrollTo(0, this.animatedScroll);
      }

      this.notify();
    }

    this.rafId = requestAnimationFrame(this.raf);
  };

  public scrollTo(target: number | HTMLElement, options: { offset?: number } = {}) {
    let y = 0;
    if (typeof target === "number") {
      y = target;
    } else if (target && typeof target.getBoundingClientRect === "function") {
      y = target.getBoundingClientRect().top + window.scrollY + (options.offset || 0);
    }
    const maxScroll = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight
    ) - window.innerHeight;

    this.targetScroll = Math.min(Math.max(0, y), maxScroll);
    this.isScrolling = true;
  }

  public on(callback: (e: any) => void) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  private notify() {
    const event = {
      scroll: this.animatedScroll,
      limit: document.documentElement.scrollHeight - window.innerHeight,
      velocity: this.velocity,
      direction: this.velocity > 0 ? 1 : -1,
    };
    this.listeners.forEach((fn) => fn(event));
  }

  public destroy() {
    if (typeof window === "undefined") return;
    document.documentElement.classList.remove("lenis", "lenis-smooth");
    window.removeEventListener("wheel", this.onWheel);
    window.removeEventListener("scroll", this.onScroll);
    if (this.rafId) cancelAnimationFrame(this.rafId);
  }
}
