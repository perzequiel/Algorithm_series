"use strict";

var _Serie = require("./class/Serie");

var _Serie2 = _interopRequireDefault(_Serie);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var start_program = "\n**********************************************************\n*                                                        *\n*                Welcome to ALGORITHM APP                *\n*                by: Ezequiel Gonzalez                   *\n*                                                        *\n**********************************************************\n\nPlease input at least 2 digits or more separate by spaces:";

var standard_input = process.stdin;
standard_input.setEncoding("utf-8");

console.log(start_program);

standard_input.on("data", function (data) {
  console.log("User Input Data : " + data);

  var output = new _Serie2.default(data);

  if (output.isValid()) {
    output.process();

    if (output.apply) {
      console.log("**********************************************************");
      console.log("*                       Results                          *");
      console.log("*                                                        *");
      console.log("* Type : " + output.type);
      console.log("* Serie : " + output.data);
      console.log("*                                                        *");
      console.log("**********************************************************\n      ");
    } else {
      console.log("**********************************************************");
      console.log("*                   Mismatched Series                    *");
      console.log("**********************************************************");
    }

    process.exit();
  } else {
    console.log("Please try again!!, input at least 2 digits separate by spaces");
  }
});