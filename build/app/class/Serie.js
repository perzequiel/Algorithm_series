"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _SeriesCriteria = require("./SeriesCriteria");

var _SeriesCriteria2 = _interopRequireDefault(_SeriesCriteria);

var _Sumarized = require("./Sumarized");

var _Sumarized2 = _interopRequireDefault(_Sumarized);

var _Multiplied = require("./Multiplied");

var _Multiplied2 = _interopRequireDefault(_Multiplied);

var _Composed = require("./Composed");

var _Composed2 = _interopRequireDefault(_Composed);

var _Fibonacci = require("./Fibonacci");

var _Fibonacci2 = _interopRequireDefault(_Fibonacci);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Serie = function () {
  function Serie(data) {
    _classCallCheck(this, Serie);

    this._data = data.replace("\n", "").split(" ");
    this.seriesCriteria = new _SeriesCriteria2.default();
  }
  // input data


  _createClass(Serie, [{
    key: "isValid",

    // methods
    value: function isValid() {
      var valid = true;

      if (this._data.length < 2 && this._data.length > 10) {
        valid = false;
      } else {
        for (var index = 0; index < this._data.length; index++) {
          var value = this._data[index];

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
  }, {
    key: "process",
    value: function process() {
      var r = {};

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
  }, {
    key: "sumarized",
    value: function sumarized() {
      this.seriesCriteria = new _Sumarized2.default();
      return this.seriesCriteria.process(this._data);
    }
  }, {
    key: "multiplied",
    value: function multiplied() {
      this.seriesCriteria = new _Multiplied2.default();
      return this.seriesCriteria.process(this._data);
    }
  }, {
    key: "composed",
    value: function composed() {
      this.seriesCriteria = new _Composed2.default();
      return this.seriesCriteria.process(this._data);
    }
  }, {
    key: "fibonacci",
    value: function fibonacci() {
      this.seriesCriteria = new _Fibonacci2.default();
      return this.seriesCriteria.process(this._data);
    }
  }, {
    key: "data",
    set: function set(data) {
      this._data = data.replace("\n", "").split(" ");
    },
    get: function get() {
      return this._data;
    }
    // type

  }, {
    key: "type",
    set: function set(type) {
      this._type = type;
    },
    get: function get() {
      return this._type;
    }
    // apply

  }, {
    key: "apply",
    set: function set(apply) {
      this._apply = apply;
    },
    get: function get() {
      return this._apply;
    }
  }]);

  return Serie;
}();

exports.default = Serie;