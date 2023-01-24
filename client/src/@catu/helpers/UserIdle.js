class UserIdle {
  timeoutID = null;
  timeout = null;
  goActive = null;
  goInactive = null;
  active = false;
  set = false;

  constructor() {
    this.timeoutID = null;
  }

  setup = (timeout, goActive, goInactive) => {
    if (!parseInt(timeout)) throw new Error("Timeout is not an integer");
    if (typeof goActive !== "function")
      throw new Error("goActive() is not a function");
    if (typeof goInactive !== "function")
      throw new Error("goActive() is not a function");

    this.timeoutID = null;
    this.timeout = timeout;
    this.goActive = goActive;
    this.goInactive = goInactive;
  };

  start = () => {
    if (!this.set) {
      window.addEventListener("mousemove", this.resetTimer, false);
      window.addEventListener("mousedown", this.resetTimer, false);
      window.addEventListener("keypress", this.resetTimer, false);
      window.addEventListener("DOMMouseScroll", this.resetTimer, false);
      window.addEventListener("mousewheel", this.resetTimer, false);
      window.addEventListener("touchmove", this.resetTimer, false);
      window.addEventListener("MSPointerMove", this.resetTimer, false);
      this.startTimer();
      this.set = true;
    }
  };

  stop = () => {
    if (this.set) {
      window.removeEventListener("mousemove", this.resetTimer, false);
      window.removeEventListener("mousedown", this.resetTimer, false);
      window.removeEventListener("keypress", this.resetTimer, false);
      window.removeEventListener("DOMMouseScroll", this.resetTimer, false);
      window.removeEventListener("mousewheel", this.resetTimer, false);
      window.removeEventListener("touchmove", this.resetTimer, false);
      window.removeEventListener("MSPointerMove", this.resetTimer, false);
      this.set = false;
    }
  };

  // Start the timer if no actions
  startTimer = () => {
    if (!this.timeoutID)
      this.timeoutID = window.setTimeout(this.goInactiveHandler, this.timeout);
  };

  // Reset the counter if an action is detected
  resetTimer = () => {
    window.clearTimeout(this.timeoutID);
    this.timeoutID = null;
    this.goActiveHandler();
  };

  // Inactive handler
  goInactiveHandler = () => {
    if (this.active) {
      this.active = false;
      this.goInactive();
    }
  };

  // Active handler
  goActiveHandler = () => {
    this.startTimer();
    if (!this.active) {
      this.goActive();
      this.active = true;
    }
  };
}

export default UserIdle;
