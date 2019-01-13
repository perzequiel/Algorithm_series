import AbstractSeriesCriteria from "./AbstractSeriesCriteria";

export default class Sumarized extends AbstractSeriesCriteria {
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
