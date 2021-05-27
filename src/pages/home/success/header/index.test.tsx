import { render, fireEvent } from "../../../../test-utils";
import Header from ".";

const mockProps = {
  issuesFound: 100,
};

describe("Success Header Component", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test("Disable back button", async () => {
    const { getByRole, getByText } = render(<Header {...mockProps} />);

    const button = getByRole("button", { name: /prev/i });
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();

    const nextButton = getByRole("button", { name: /next/i });

    await fireEvent.click(nextButton);

    expect(button).not.toBeDisabled();
    expect(getByText(/2/i)).toBeInTheDocument();
  });

  test("Disable next button", async () => {
    const { getByRole, rerender } = render(<Header {...mockProps} />);

    const button = getByRole("button", { name: /next/i });
    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();

    await fireEvent.click(button);

    const prevAvailable = {
      issuesFound: 9,
    };

    await rerender(<Header {...prevAvailable} />);
    expect(button).toBeDisabled();
  });
});
