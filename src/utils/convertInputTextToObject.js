import { removeAccents } from "./removeAccents";

export const convertInputTextToObject = (text) => {
  const formatText = removeAccents(text);
  const textArray = formatText.split(" ");
  const textArrayLowerCase = textArray.map((item) => item.toLowerCase());
  const textValue = textArrayLowerCase.join("_");
  return {
    label: text,
    value: textValue,
  };
};
