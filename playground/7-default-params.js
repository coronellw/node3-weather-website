const greeter = (name = 'user', age) => {
  console.log(`Hello ${name}`);
}

const transaction = (type, { label, stock = 0 } = {}) => {
  console.log(type, label, stock);
}

greeter('Isaac');

greeter();

const product = {label: 'shirt', stock: 100};

transaction('order', product)