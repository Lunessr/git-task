class Calculator {
  constructor(number) {
    this.number = number;
  }

  plus(a) {
    this.number = this.number + a;
    return this;
  }

  minus(b) {
    this.number = this.number - b;
    return this;
  }

  calculate() {
    console.log(this.number);
    return this;
  }
}

const calculator = new Calculator(2);

const result = calculator.plus(2).minus(1).calculate();

const result1 = new Calculator(2).plus(2);
const result2 = result1.minus(1);
const result3 = result2.calculate();
