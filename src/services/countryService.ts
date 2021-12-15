import axios from "axios";

export function getCountryList() {
  return Promise.resolve(["Serbia", "Greece", "Romania", "Russia", "Bulgaria"]);
}

export function getTownList() {
  return new Promise((res) => {
    setTimeout(() => {
      res(["Belgrade", "Atheens", "Bukures", "Moscow", "Sofia"]);
    }, 2500);
  });
}

export async function getRestCountries() {
  const resp = await axios.get("https://restcountries.com/v2/all");
  return resp.data;
}
