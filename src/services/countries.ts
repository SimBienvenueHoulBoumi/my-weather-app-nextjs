// src/services/apiService.ts

const REST_COUNTRIES_URL = "https://restcountries.com/v3.1/all";
const GEO_API_URL = "https://api.opencagedata.com/geocode/v1/json";
const API_KEY = "5831efb20ee34286ba7f708a5c966a0a"; 

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
