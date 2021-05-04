import { render, fireEvent } from "../../test-utils";
import Header from "./Header";

const mockProps = {
  page: 1,
  issuesFound: 100,
  prevPage: jest.fn(),
  nextPage: jest.fn(),
};

describe("Success Header Component", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test("Disable back button", async () => {
    const { getByRole, rerender } = render(<Header {...mockProps} />);

    const button = getByRole("button", { name: /prev/i });
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();

    const prevAvailable = {
      ...mockProps,
      page: 2,
    };

    await rerender(<Header {...prevAvailable} />);
    expect(button).not.toBeDisabled();

    await fireEvent.click(button);
    expect(mockProps.prevPage).toBeCalledTimes(1);
  });

  test("Disable next button", async () => {
    const { getByRole, rerender } = render(<Header {...mockProps} />);

    const button = getByRole("button", { name: /next/i });
    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();

    await fireEvent.click(button);
    expect(mockProps.nextPage).toBeCalledTimes(1);

    const prevAvailable = {
      ...mockProps,
      issuesFound: 9,
    };

    await rerender(<Header {...prevAvailable} />);
    expect(button).toBeDisabled();
  });
});
