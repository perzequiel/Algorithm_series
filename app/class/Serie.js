import SeriesCriteria from "./SeriesCriteria";
import Sumarized from "./Sumarized";
import Multiplied from "./Multiplied";
import Composed from "./Composed";
import Fibonacci from "./Fibonacci";

export default class Serie {
  constructor(data) {
    this._data = data.replace("\n", "").split(" ");
    this.seriesCriteria = new SeriesCriteria();
  }
  // input data
  set data(data) {
    this._data = data.replace("\n", "").split(" ");
  }
  get data() {
    return this._data;
  }
  // type
  set type(type) {
    this._type = type;
  }
  get type() {
    return this._type;
  }
  // apply
  set apply(apply) {
    this._apply = apply;
  }
  get apply() {
    return this._apply;
  }
  // methods
  isValid() {
    let valid = true;

    if (this._data.length < 2 && this._data.length > 10) {
      valid = false;
    } else {
      for (let index = 0; index < this._data.length; index++) {
        let value = this._data[index];

        if (isNaN(value)) {
          valid = false;
        } else {
          if (!Number.isInteger(parseInt(value))) {
            valid = false;
          }
        }
        this._data[index] = parseInt(this._data[index]);
      }
    }

    return valid;
  }

  process() {
    let r = {};

    switch (true) {
      case (r = this.sumarized()).apply:
        break;
      case (r = this.multiplied()).apply:
        break;
      case (r = this.composed()).apply:
        break;
      case (r = this.fibonacci()).apply:
        break;

      default:
        break;
    }

    this._type = r.type;
    this._apply = r.apply;
  }

  sumarized() {
    this.seriesCriteria = new Sumarized();
    return this.seriesCriteria.process(this._data);
  }

  multiplied() {
    this.seriesCriteria = new Multiplied();
    return this.seriesCriteria.process(this._data);
  }

  composed() {
    this.seriesCriteria = new Composed();
    return this.seriesCriteria.process(this._data);
  }

  fibonacci() {
    this.seriesCriteria = new Fibonacci();
    return this.seriesCriteria.process(this._data);
  }
}
