import AbstractSeriesCriteria from "./AbstractSeriesCriteria";

export default class Composed extends AbstractSeriesCriteria {
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
