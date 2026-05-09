const product = {
    name: 'shirt',
    price: 500,
    quantity: 5,
};

// const discount = product.price * 20 / 100;
// const pay = product.price - discount;
// const vat = product.price * 7 / 100;
// const total = pay + vat;

// const price = product.price 
// const discount = price * 20 / 100;
// const pay = price - discount;
// const vat = price * 7 / 100;
// const total = pay + vat;

const {price, quantity, tax=9} = {
    name: 'shirt',
    price: 500,
    quantity: 5,
};
console.log(price, quantity, tax);
// const price = product.price 
// const discount = price * 20 / 100;
// const pay = price - discount;
// const vat = price * 7 / 100;
// const total = pay + vat;

const device = {name: 'phone', brand: 'sumsung', price: 1500};
const {brand} = device;
console.log(brand)