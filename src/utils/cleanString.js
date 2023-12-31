import latinize from "latinize";

export const cleanString = (str) =>
latinize(str)
  .toLowerCase()
  .replace(/[\W_]+/g, "");