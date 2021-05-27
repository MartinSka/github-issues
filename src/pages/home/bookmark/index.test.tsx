import { render } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { useStoredIssues } from "../../../context/Issues";
import Bookmark from ".";
import { mockIssue } from "../../../models/mocks";

jest.mock("../../../context/Issues");
const useStoredIssuesMocked = useStoredIssues as jest.MockedFunction<any>;

describe("Bookmark Component", () => {
  test("render empty message", () => {
    useStoredIssuesMocked.mockReturnValue({ storedIssues: [] });
    const { getByText } = render(<Bookmark />);

    expect(getByText(/sorry/i)).toBeInTheDocument();
  });

  test("render bookmark issues", () => {
    useStoredIssuesMocked.mockReturnValue({ storedIssues: [mockIssue] });
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={history}>
        <Bookmark />
      </Router>
    );

    expect(getByText(/title/i)).toBeInTheDocument();
  });
});
