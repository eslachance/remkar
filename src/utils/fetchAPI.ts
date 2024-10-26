export const fetchFromAPI = async (url: string, options?: RequestInit) => {
  const response = await fetch(url, options);
  if (response.status !== 200) {
    throw new Error(`Error ${response.status} when fetching data.`);
  }
  const data = await response.json();
  return data;
};
