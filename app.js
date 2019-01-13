"use strict";

/*******************************************
 *
 *  Class Serie
 *
 ******************************************/

class Serie {
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

/*******************************************
 *
 *  Series Criteria
 *
 ******************************************/

class AbstractSeriesCriteria {
  process(serie) {
    return { type: "", apply: false };
  }
}

class SeriesCriteria extends AbstractSeriesCriteria {}

class Sumarized extends AbstractSeriesCriteria {
  process(serie) {
    let apply = true;
    let type = "";

    // incremental pattern
    let incremental_pattern = 0;

    for (let index = 1; index < serie.length; index++) {
      const delta = serie[index] - serie[index - 1];

      if (index == 1) {
        incremental_pattern = delta;
      } else {
        if (incremental_pattern != delta) {
          apply = false;
        }
      }
    }

    if (apply) {
      for (let index = serie.length; index < 10; index++) {
        serie[index] = serie[index - 1] + incremental_pattern;
      }
      type = `Sum steps by ${incremental_pattern} `;
    }

    return { type, apply };
  }
}

class Multiplied extends AbstractSeriesCriteria {
  process(serie) {
    let apply = true;
    let type = "";

    // potential pattern
    let potential_pattern = 0;

    for (let index = 1; index < serie.length; index++) {
      const delta = serie[index] / serie[index - 1];

      if (index == 1) {
        potential_pattern = delta;
      } else {
        if (potential_pattern != delta) {
          apply = false;
        }
      }
    }

    if (apply) {
      for (let index = serie.length; index < 10; index++) {
        serie[index] = serie[index - 1] * potential_pattern;
      }
      type = `Multiplication steps by ${potential_pattern} `;
    }

    return { type, apply };
  }
}

class Composed extends AbstractSeriesCriteria {
  process(serie) {
    let apply = true;
    let type = "";

    // pattern index
    let pattern_value = [];
    let pattern_index = 0;
    let current_pattern = {};

    for (let index = 1; index < serie.length; index++) {
      pattern_value[pattern_index] = {
        mult: parseInt(serie[index] / serie[index - 1]),
        sum: serie[index] % serie[index - 1]
      };

      if (index == 1) {
        current_pattern.mult = pattern_value[pattern_index].mult;
        current_pattern.sum = pattern_value[pattern_index].sum;
      } else {
        // save all existing patterns
        pattern_value.forEach(val => {
          if (
            current_pattern.mult != val.mult &&
            current_pattern.sum != val.sum
          ) {
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
    pattern_value.forEach(val => {
      val.discard = false;
      for (let index = 1; index < serie.length; index++) {
        if (serie[index] != serie[index - 1] * val.mult + val.sum) {
          val.discard = true;
        }
      }
    });

    apply = this.checkComposedPattern(pattern_value, serie);

    pattern_value.forEach(val => {
      if (!val.discard) {
        type = `Composed multiplied by ${val.mult} plus ${val.sum}`;
        for (let index = serie.length; index < 10; index++) {
          serie[index] = serie[index - 1] * val.mult + val.sum;
        }
      }
    });

    return { type, apply };
  }

  checkComposedPattern(patterns, serie) {
    let checked = false;
    // validate if any pattern apply in all numbers of the serie
    patterns.forEach(val => {
      val.discard = false;
      for (let index = 1; index < serie.length; index++) {
        if (serie[index] != serie[index - 1] * val.mult + val.sum) {
          val.discard = true;
        }
      }
      if (!checked) checked = !val.discard;
    });

    return checked;
  }
}

class Fibonacci extends AbstractSeriesCriteria {
  process(serie) {
    let apply = true;
    let type = "";

    if (serie.length < 3) {
      apply = false;
    } else {
      for (let index = 0; index < serie.length; index++) {
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
      for (let index = serie.length; index < 10; index++) {
        serie[index] = serie[index - 1] + serie[index - 2];
      }
      type = `Fibonacci`;
    }

    return { type, apply };
  }

  checkNumber(num) {
    const base = 5 * Math.pow(num, 2);
    const posBias = Math.sqrt(base + 4) % 1 === 0;
    const negBias = Math.sqrt(base - 4) % 1 === 0;

    //filter true conditions
    if (posBias || negBias) {
      return true;
    }
    return false;
  }
}

/*******************************************
 *
 *  Main Program
 *
 ******************************************/

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
