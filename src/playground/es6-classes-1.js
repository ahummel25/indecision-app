
class Person {
  constructor(name, age = 0) {
    this.name = name;
    this.age = age;
  }
  getGreeting() {
    return `${this.name} is ${this.age} year(s) old.`;
  }
}

class Student extends Person {
  constructor(name, age, major) {
    super(name, age);
    this.major = major;
  }
  hasMajor() {
    return !!this.major;  
  }
  getGreeting() {
    let description = super.getGreeting();

    if (this.hasMajor()) {
      description += ` and majors in ${this.major}`;
    }
    return description;
  }
}

class Traveler extends Person {
  constructor(name, age, homeLocation) {
    super(name, age);
    this.homeLocation = homeLocation;
  }
  hasHomeLocation() {
    return !!this.homeLocation;
  }

  getGreeting() {
    let greeting = super.getGreeting();

    if (this.hasHomeLocation()) {
      greeting += ` His home locaton is ${this.homeLocation}`;
    }
    return greeting;
  }
}

const traveler = new Traveler('Andrew Hummel', 30, 'Saint Louis, MO');
console.log(traveler.getGreeting());

const traveler2 = new Traveler('Billy Bob', 30);
console.log(traveler2.getGreeting());