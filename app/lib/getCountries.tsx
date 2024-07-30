import countries from "world-countries";

const countriesFormatted = countries.map((country) => ({
  value: country.cca2,
  label: country.name.common,
  flag: country.flag,
  latlng: country.latlng,
  region: country.region,
}));

export function useCountries() {
  const getAllCountries = () => {
    return countriesFormatted;
  };

  const getCountriesByName = (value: string) => {
    return countriesFormatted.find((country) => country.value === value);
  };

  return { getAllCountries, getCountriesByName };
}
