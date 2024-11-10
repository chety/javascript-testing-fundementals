export const add = (a, b) => {
  if (typeof a === 'string') a = Number(a);
  if (typeof b === 'string') b = Number(b);

  if (Number.isNaN(a)) {
    throw new Error('The first argument is not a number');
  }

  if (Number.isNaN(b)) {
    throw new Error('The second argument is not a number');
  }
  return a + b;
};

export const subtract = (a, b) => {
  return a - b;
};

export const multiply = (a, b) => {
  return a * b;
};

export const divide = (a, b) => {
  if (b === 0) {
    throw new Error('Cannot divide by zero');
  }
  return a / b;
};
