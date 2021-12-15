import { act, render, screen, waitFor, cleanup } from "@testing-library/react";
import { useEffect, useState } from "react";
import axios from "axios";

jest.mock("axios", () => ({
  get: () =>
    Promise.resolve({
      data: [
        { id: 1, title: "Foo" },
        { id: 2, title: "Bar" },
      ],
    }),
}));

const myFunction = (a: number, b: number) => {
  return a + b;
};

const countLogger = (count: number) => {
  console.log("@count: ", count);
};

const CustomComponent = ({
  count,
  countLogger,
  someStr,
}: {
  count: number;
  countLogger: any;
  someStr: string;
}) => {
  const [state, setState] = useState(0);
  const [todos, setTodos] = useState<any>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setState(myFunction(count, 11));
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setState(myFunction(count, 15));
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let shouldFetch = true;
    const fetch = async () => {
      const resp = await axios.get(
        "https://jsonplaceholder.typicode.com/todos/"
      );
      shouldFetch && setTodos(resp.data);
    };
    fetch();
    return () => (shouldFetch = false);
  }, []);

  useEffect(() => {
    console.log("@state changed", someStr);
    countLogger(count);
  }, [state]);

  return (
    <>
      <p data-testid="myParag">Number is: {state}</p>
      <div data-testid="elem">Hello {count} times</div>
      {todos && (
        <div>
          Todo list:
          {todos.map((todo) => (
            <p key={todo.id}>{todo.title}</p>
          ))}
        </div>
      )}
    </>
  );
};

describe.only("Validate custom logic", () => {
  const loggerSpy = jest.fn();

  const someStr = new loggerSpy();
  beforeEach(() => {
    cleanup();
    loggerSpy.mockClear();
  });

  it("Should test async", async () => {
    render(
      <CustomComponent
        count={3}
        countLogger={loggerSpy}
        someStr={loggerSpy.mockReturnValueOnce("Hello")()}
      />
    );

    const todoText = screen.queryByText(/Todo list/i);
    expect(todoText).not.toBeInTheDocument();
    expect(screen.queryByText(/foo/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/bar/i)).not.toBeInTheDocument();

    await act(async () => {
      cleanup();
      render(
        <CustomComponent
          count={3}
          countLogger={loggerSpy}
          someStr={loggerSpy.mockReturnValueOnce("Hello")()}
        />
      );
    });

    const newTodoText = screen.queryByText(/Todo list/i);
    expect(newTodoText).toBeInTheDocument();
    expect(screen.getByText(/foo/i)).toBeInTheDocument();
    expect(screen.getByText(/bar/i)).toBeInTheDocument();
  });

  it("Should test myFunction", () => {
    expect(myFunction(2, 3)).toBe(5);
  });

  it("Should test CustomComponent", async () => {
    await act(async () => {
      render(
        <CustomComponent
          count={3}
          countLogger={loggerSpy}
          someStr={loggerSpy.mockReturnValueOnce("Hello")()}
        />
      );
    });
    expect(screen.getByTestId("elem").textContent).toContain(`Hello ${3}`);
  });
  it("Should test CustomComponent state", async () => {
    await act(async () => {
      render(
        <CustomComponent
          count={3}
          countLogger={loggerSpy}
          someStr={loggerSpy.mockReturnValueOnce("Hello")()}
        />
      );
    });
    let paragElem = await screen.findByTestId("myParag");
    expect(paragElem).toBeInTheDocument();
    // await act(async () => {
    //   cleanup();
    //   render(<CustomComponent count={3} countLogger />);
    // });
    await waitFor(async () => {
      const myElem = await screen.findByTestId("myParag");
      expect(myElem.textContent).toContain(`Number is: ${14}`);
    });
    expect(loggerSpy).toBeCalledTimes(3);
    await waitFor(async () => {
      const myElem2 = await screen.findByTestId("myParag");
      expect(myElem2.textContent).toContain(`Number is: ${18}`);
    });
    expect(loggerSpy).toBeCalledTimes(4);
  });
});
