import AbstractSeriesCriteria from "./AbstractSeriesCriteria";

export default class Fibonacci extends AbstractSeriesCriteria {
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
