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

var Composed = function (_AbstractSeriesCriter) {
  _inherits(Composed, _AbstractSeriesCriter);

  function Composed() {
    _classCallCheck(this, Composed);

    return _possibleConstructorReturn(this, (Composed.__proto__ || Object.getPrototypeOf(Composed)).apply(this, arguments));
  }

  _createClass(Composed, [{
    key: "process",
    value: function process(serie) {
      var apply = true;
      var type = "";

      // pattern index
      var pattern_value = [];
      var pattern_index = 0;
      var current_pattern = {};

      for (var index = 1; index < serie.length; index++) {
        pattern_value[pattern_index] = {
          mult: parseInt(serie[index] / serie[index - 1]),
          sum: serie[index] % serie[index - 1]
        };

        if (index == 1) {
          current_pattern.mult = pattern_value[pattern_index].mult;
          current_pattern.sum = pattern_value[pattern_index].sum;
        } else {
          // save all existing patterns
          pattern_value.forEach(function (val) {
            if (current_pattern.mult != val.mult && current_pattern.sum != val.sum) {
              pattern_index++;

              pattern_value[pattern_index] = {
                mult: current_pattern.mult,
                sum: current_pattern.sum
              };
            }
          });
        }
      }

      // validate if any pattern apply in all numbers of the serie
      pattern_value.forEach(function (val) {
        val.discard = false;
        for (var _index = 1; _index < serie.length; _index++) {
          if (serie[_index] != serie[_index - 1] * val.mult + val.sum) {
            val.discard = true;
          }
        }
      });

      apply = this.checkComposedPattern(pattern_value, serie);

      pattern_value.forEach(function (val) {
        if (!val.discard) {
          type = "Composed multiplied by " + val.mult + " plus " + val.sum;
          for (var _index2 = serie.length; _index2 < 10; _index2++) {
            serie[_index2] = serie[_index2 - 1] * val.mult + val.sum;
          }
        }
      });

      return { type: type, apply: apply };
    }
  }, {
    key: "checkComposedPattern",
    value: function checkComposedPattern(patterns, serie) {
      var checked = false;
      // validate if any pattern apply in all numbers of the serie
      patterns.forEach(function (val) {
        val.discard = false;
        for (var index = 1; index < serie.length; index++) {
          if (serie[index] != serie[index - 1] * val.mult + val.sum) {
            val.discard = true;
          }
        }
        if (!checked) checked = !val.discard;
      });

      return checked;
    }
  }]);

  return Composed;
}(_AbstractSeriesCriteria2.default);

exports.default = Composed;