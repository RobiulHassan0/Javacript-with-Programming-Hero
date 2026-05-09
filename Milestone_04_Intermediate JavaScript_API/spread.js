
const numbers = [23, 56, 34, 67, 87];
console.log(numbers);
console.log(...numbers);

const max = Math.max(numbers);
console.log(max);
const maxim = Math.max(...numbers);
console.log(maxim);

const first = [1, 2, 3, 4, 5];
const second = [...first];
const third = [87, ...first, 34, 54, 56];
second.push(6);
// console.log(first);
// console.log(second);
// console.log(third);

const ages = [34, 53, 46, 76];
const price = [65, 23, 86, 14];
const all = [20, ...ages, 90, ...price];
console.log(all);

const person = {name: 'person', age: 34};
const employee = {designation: 'developer', ...person};
console.log(employee);

const total = (a, b, c) => a + b + c;
const result = total(32, 43, 54);
console.log(result);
const degits = [23, 54, 90];
console.log(total(...degits));