export const checkArrayHasItem = (value, array, dept1 = null, dept2 = null) => {
  if (dept2) {
    return array.find((item) => item[dept1][dept2] === value);
  }
  if (dept1) {
    return array.find((item) => item[dept1] === value);
  }
  return array.find((item) => item === value);
};
