class SoftNum {
  static ATTRACTION = 0.2;
  static DAMPING = 0.5;
  static EPSILON = 0.00001;

  value = 0;
  velocity = 0;
  acceleration = 0;

  damping = 0;
  attraction = 0;

  targeting = false;
  target = 0;


  constructor(value, damping, attraction) {
    this.value = value || 0;
    this.damping = damping || SoftNum.DAMPING;
    this.attraction = attraction || SoftNum.ATTRACTION;
  }


  set(value) {
    this.value = value;
    this.target = value;
    this.targeting = false;
  }


  // fix to the target value, or pass in a new target and pin to that
  pin() {
    if (arguments.length == 1) {
      this.target = arguments[0];
    }
    this.value = this.target;
    this.targeting = false;
  }


  get() {
    return this.value;
  }


  getInt() {
    return Math.floor(this.value);
  }


  update() {
    if (this.targeting) {
      this.acceleration += this.attraction * (this.target - this.value);
      this.velocity = (this.velocity + this.acceleration) * this.damping;
      this.value += this.velocity;
      this.acceleration = 0;

      if (Math.abs(this.velocity) > SoftNum.EPSILON) {
        // still updating
        return true;

      } else {
        // done updating; within EPSILON, so set to the exact target
        this.value = this.target;
        this.targeting = false;
      }
    }
    return false;
  }


  setTarget(target) {
    this.targeting = true;
    this.target = target;
  }


  getTarget() {
    return this.target;
  }
}
