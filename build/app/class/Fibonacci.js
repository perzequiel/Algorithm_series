"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _AbstractSeriesCriteria = require("./AbstractSeriesCriteria");

var _AbstractSeriesCriteria2 = _interopRequireDefault(_AbstractSeriesCriteria);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Fibonacci = function (_AbstractSeriesCriter) {
  _inherits(Fibonacci, _AbstractSeriesCriter);

  function Fibonacci() {
    _classCallCheck(this, Fibonacci);

    return _possibleConstructorReturn(this, (Fibonacci.__proto__ || Object.getPrototypeOf(Fibonacci)).apply(this, arguments));
  }

  _createClass(Fibonacci, [{
    key: "process",
    value: function process(serie) {
      var apply = true;
      var type = "";

      if (serie.length < 3) {
        apply = false;
      } else {
        for (var index = 0; index < serie.length; index++) {
          if (index >= 2) {
            if (!(serie[index] == serie[index - 1] + serie[index - 2])) {
              apply = false;
            }
          }
          if (!this.checkNumber(serie[index])) {
            apply = false;
          }
        }
      }

      if (apply) {
        for (var _index = serie.length; _index < 10; _index++) {
          serie[_index] = serie[_index - 1] + serie[_index - 2];
        }
        type = "Fibonacci";
      }

      return { type: type, apply: apply };
    }
  }, {
    key: "checkNumber",
    value: function checkNumber(num) {
      var base = 5 * Math.pow(num, 2);
      var posBias = Math.sqrt(base + 4) % 1 === 0;
      var negBias = Math.sqrt(base - 4) % 1 === 0;

      //filter true conditions
      if (posBias || negBias) {
        return true;
      }
      return false;
    }
  }]);

  return Fibonacci;
}(_AbstractSeriesCriteria2.default);

exports.default = Fibonacci;