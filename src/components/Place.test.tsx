import { act, render, screen, waitFor } from "@testing-library/react";
import { Place, dummyFn } from "./Place";
import {
  getCountryList,
  getTownList,
  getRestCountries,
} from "../services/countryService";

jest.mock("../services/countryService.ts");
const mockedGetCountryList = getCountryList as jest.Mock;
const mockedGetTownList = getTownList as jest.Mock;
const mockedGetRestCountries = getRestCountries as jest.Mock;

describe("Validate custom form Component", () => {
  beforeEach(async () => {
    mockedGetCountryList.mockResolvedValueOnce(["Serbia", "Romania"]);
    mockedGetTownList.mockResolvedValueOnce(["Belgrade", "Sofia"]);
    mockedGetRestCountries.mockResolvedValueOnce([
      { name: "Algeria", nativeName: "Alg", population: 123 },
      { name: "Avganistan", nativeName: "Afganistan", population: 1234 },
    ]);

    // FIRST WAY
    act(() => {
      render(<Place />);
    });
    await waitFor(() => {
      expect(mockedGetCountryList).toHaveBeenCalled();
      expect(mockedGetTownList).toHaveBeenCalled();
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  it("Should show country list", async () => {
    // SECOND_WAY
    // await act(async () => {
    //   render(<Place />);
    // });
    expect(await screen.findByText("Places:")).toBeInTheDocument();
    expect(screen.getByText("Romania")).toBeInTheDocument();
  });

  it("Should show city list", async () => {
    // SECOND_WAY
    // await act(async () => {
    //   render(<Place />);
    // });
    expect(screen.getByText("Belgrade")).toBeInTheDocument();
    expect(screen.getByText("Sofia")).toBeInTheDocument();
    expect(screen.queryByText("Rome")).not.toBeInTheDocument();
  });

  it("Dummy test", () => {
    expect(dummyFn()).toBe(5);
  });
});
