"use server"

const REST_COUNTRIES_URL = process.env.NEXT_PUBLIC_REST_COUNTRIES_URL;
const GEO_API_URL = process.env.NEXT_PUBLIC_GEO_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY; 

if (!REST_COUNTRIES_URL) {
  throw new Error("REST_COUNTRIES_URL is not defined");
}

if (!GEO_API_URL) {
  throw new Error("GEO_API_URL is not defined");
}

if (!API_KEY) {
  throw new Error("API_KEY is not defined");
}

export const fetchCountries = async () => {
  try {
    const response = await fetch(REST_COUNTRIES_URL);
    
    if (!response.ok) {
      throw new Error("Failed to fetch countries");
    }

    const data = await response.json();
    return data.map((country: any) => ({
      name: country.name.common,
      alpha2Code: country.cca2, // Code pays
    }));
  } catch (error) {
    console.error("Error fetching countries:", error);
    return [];
  }
};

export const fetchCoordinates = async (countryName: string) => {
  try {
    const response = await fetch(`${GEO_API_URL}?q=${countryName}&key=${API_KEY}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch coordinates for ${countryName}`);
    }

    const data = await response.json();
    return data.results[0].geometry; // Renvoie la première géométrie
  } catch (error) {
    console.error(`Error fetching coordinates for ${countryName}:`, error);
    return null;
  }
};
