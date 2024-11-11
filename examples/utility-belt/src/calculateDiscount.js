export const calculateDiscount = (price) => {
  if (price <= 0) {
    throw new Error('Price must be greater than 0');
  }
  if (price >= 1000) {
    return price * 0.2; // 20% off for prices over $1000
  }
  return price * 0.1; //otherwise 10% off
};
