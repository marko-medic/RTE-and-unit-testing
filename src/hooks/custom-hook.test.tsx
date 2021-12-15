import { act, renderHook } from "@testing-library/react-hooks";
import { useCheckInfo } from "./custom-hook";

describe("Validate custom hook", () => {
  it("Should show correct message", () => {
    const { result } = renderHook(useCheckInfo);
    expect(result.current.infoState).toBe("");
    act(() => {
      result.current.setUserInfo("fo", "bar");
    });
    expect(result.current.infoState).toBe("User info not secured");
    act(() => {
      result.current.setUserInfo("fozzzzz", "foobzbwwar");
    });
    expect(result.current.infoState).toBe("User info ok");
  });
});
