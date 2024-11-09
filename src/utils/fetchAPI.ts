const baseAPIURL = import.meta.env.MODE === 'development' ? '/api' : '/api';

export const fetchFromAPI = async (url: string, options?: RequestInit) => {
  const response = await fetch(`${baseAPIURL}${url}`, options);
  if (response.status !== 200) {
    throw new Error(`Error ${response.status} when fetching data.`);
  }
  const data = await response.json();
  return data;
};
