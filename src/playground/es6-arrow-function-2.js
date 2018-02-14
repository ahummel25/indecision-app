const add = (a, b) => {
    return a + b;
};

console.log(add(55, 1));

const user = {
  name: 'Andrew',
  cities: ['STL', 'Portland'],
  printPlaces() {
    return this.cities.map((city) => this.name + ' lived in ' + city);
  }
};

//console.log(user.printPlaces());

const multiplier = {
    numbers: [1, 10, 23],
    multiplyBy: 12,
    multiply() {
      return this.numbers.map((number) => number * this.multiplyBy);
    }
};

console.log(multiplier.multiply());

