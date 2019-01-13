import Serie from "./class/Serie";

const start_program = `
**********************************************************
*                                                        *
*                Welcome to ALGORITHM APP                *
*                by: Ezequiel Gonzalez                   *
*                                                        *
**********************************************************

Please input at least 2 digits or more separate by spaces:`;

let standard_input = process.stdin;
standard_input.setEncoding("utf-8");

console.log(start_program);

standard_input.on("data", function(data) {
  console.log("User Input Data : " + data);

  let output = new Serie(data);

  if (output.isValid()) {
    output.process();

    if (output.apply) {
      console.log(`**********************************************************`);
      console.log(`*                       Results                          *`);
      console.log(`*                                                        *`);
      console.log(`* Type : ${output.type}`);
      console.log(`* Serie : ${output.data}`);
      console.log(`*                                                        *`);
      console.log(`**********************************************************
      `);
    } else {
      console.log(`**********************************************************`);
      console.log(`*                   Mismatched Series                    *`);
      console.log(`**********************************************************`);
    }

    process.exit();
  } else {
    console.log(
      `Please try again!!, input at least 2 digits separate by spaces`
    );
  }
});
