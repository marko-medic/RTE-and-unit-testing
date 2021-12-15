import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act, renderHook } from "@testing-library/react-hooks";
import { CustomForm } from "./CustomForm";
import { useCheckInfo } from "../hooks/custom-hook";

describe("Validate custom form Component", () => {
  beforeEach(() => {
    render(<CustomForm />);
  });
  it("Should show username when set", () => {
    userEvent.type(screen.getByRole("textbox"), "Hellow");
    expect(screen.queryByRole("textbox")).toHaveValue("Hellow");

    expect(screen.getByText("Username is: Hellow")).toBeInTheDocument();
  });

  it("Check if password is valid", () => {
    userEvent.type(screen.getByTestId("password"), "12");
    expect(screen.getByTestId("password")).toHaveValue("12");

    expect(screen.queryByText("Invalid password")).not.toBeInTheDocument();
    userEvent.click(screen.getByTestId("submit"));

    expect(screen.queryByText("Invalid password")).toBeInTheDocument();

    userEvent.type(screen.getByTestId("password"), "123456");
    userEvent.click(screen.getByRole("button"));

    expect(screen.queryByText("Invalid password")).not.toBeInTheDocument();
  });
  it("Should work with custom hook", async () => {
    expect(screen.queryByRole("heading", { level: 5 })).not.toBeInTheDocument();
    // const { result } = renderHook(useCheckInfo);
    userEvent.type(screen.getByRole("textbox"), "Hellow");
    userEvent.type(screen.getByTestId("password"), "123");
    userEvent.click(screen.getByTestId("submit"));

    // act(() => {
    //   result.current.setUserInfo("Hellow", "123");
    // });

    expect(screen.getByRole("heading", { level: 5 })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 5 })).toHaveTextContent(
      "User info not secured"
    );

    userEvent.type(screen.getByRole("textbox"), "Hellowwww");
    userEvent.type(screen.getByTestId("password"), "123456");
    userEvent.click(screen.getByTestId("submit"));

    // act(() => {
    //   result.current.setUserInfo("ww", "12");
    // });

    expect(screen.getByRole("heading", { level: 5 })).toHaveTextContent(
      "User info ok"
    );
  });

  it("Should test some async state", async () => {
    expect(screen.queryByText("no str")).toBeInTheDocument();
    await waitFor(
      () => {
        // await new Promise((r) => setTimeout(r, 2000));
        expect(screen.getByText("Some new rand str")).toBeInTheDocument();
      },
      { timeout: 2000 }
    );
  });
});
