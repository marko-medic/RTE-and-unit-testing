import { useEffect, useState } from "react";
import {
  getCountryList,
  getTownList,
  getRestCountries,
} from "../services/countryService";

export function dummyFn() {
  console.log("@dummyFnCalled");
  return 5;
}

export const Place = () => {
  const [countryList, setCountryList] = useState<string[]>([]);
  const [cityList, setCityList] = useState<string[]>([]);
  const [restCountryList, setRestCountryList] = useState<any>([]);
  useEffect(() => {
    const fetchCountryList = async () => {
      const cl = await getCountryList();
      setCountryList(cl);
    };
    fetchCountryList();
  }, []);

  useEffect(() => {
    const fetchCityList = async () => {
      const cl = (await getTownList()) as string[];
      console.log("@city list", cl);
      setCityList(cl);
    };
    fetchCityList();
  }, []);

  useEffect(() => {
    const fetchRestCountries = async () => {
      const restCountries = await getRestCountries();
      setRestCountryList(restCountries);
    };
    fetchRestCountries();
  }, []);

  const showCountryList = () => {
    return (
      <ul style={{ listStyle: "none" }}>
        {countryList.map((country) => (
          <li key={country}>{country}</li>
        ))}
      </ul>
    );
  };

  const showCityList = () => {
    return (
      <ul style={{ listStyle: "none" }}>
        {cityList.map((city) => (
          <li key={city}>{city}</li>
        ))}
      </ul>
    );
  };

  const showRestCountryList = () => {
    return (
      <ul style={{ listStyle: "none" }}>
        {restCountryList.slice(0, 20).map((country: any) => (
          <li key={country.population}>
            {country.name} - {country.nativeName}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <h3>Places: </h3>
      {showCountryList()}
      {showCityList()}

      <br />
      <p>Rest countries:</p>
      {showRestCountryList()}
    </div>
  );
};
