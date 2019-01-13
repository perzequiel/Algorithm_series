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

var Multiplied = function (_AbstractSeriesCriter) {
  _inherits(Multiplied, _AbstractSeriesCriter);

  function Multiplied() {
    _classCallCheck(this, Multiplied);

    return _possibleConstructorReturn(this, (Multiplied.__proto__ || Object.getPrototypeOf(Multiplied)).apply(this, arguments));
  }

  _createClass(Multiplied, [{
    key: "process",
    value: function process(serie) {
      var apply = true;
      var type = "";

      // potential pattern
      var potential_pattern = 0;

      for (var index = 1; index < serie.length; index++) {
        var delta = serie[index] / serie[index - 1];

        if (index == 1) {
          potential_pattern = delta;
        } else {
          if (potential_pattern != delta) {
            apply = false;
          }
        }
      }

      if (apply) {
        for (var _index = serie.length; _index < 10; _index++) {
          serie[_index] = serie[_index - 1] * potential_pattern;
        }
        type = "Multiplication steps by " + potential_pattern + " ";
      }

      return { type: type, apply: apply };
    }
  }]);

  return Multiplied;
}(_AbstractSeriesCriteria2.default);

exports.default = Multiplied;