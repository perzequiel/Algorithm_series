import AbstractSeriesCriteria from "./AbstractSeriesCriteria";

export default class Multiplied extends AbstractSeriesCriteria {
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
