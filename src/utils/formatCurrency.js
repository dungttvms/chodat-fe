export const formatCurrency = (curr) => {
  const string = String(curr);
  let result = "";
  for (let i = string.length - 1; i >= 0; i--) {
    result = string[i] + result;
    if ((string.length - i) % 3 === 0 && i !== 0) {
      result = "." + result;
    }
  }
  return result;
};
