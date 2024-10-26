import latinize from 'latinize';

export const cleanString = (str: string) =>
  latinize(str)
    .toLowerCase()
    .replace(/[\W_]+/g, '');
