import { screen } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { useIssues } from "./hooks/useIssues";
import { useIssue } from "./hooks/useIssue";
import { render } from "./test-utils";
import App from "./App";

jest.mock("./hooks/useIssues");
const useIssuesMocked = useIssues as jest.MockedFunction<any>;

jest.mock("./hooks/useIssue");
const useIssueMocked = useIssue as jest.MockedFunction<any>;

describe("App Component", () => {
  test("full app rendering", () => {
    useIssuesMocked.mockReturnValue({});
    const history = createMemoryHistory();

    render(
      <Router history={history}>
        <App />
      </Router>
    );

    expect(screen.getByText(/bookmarked issues/i)).toBeInTheDocument();
  });

  test("issue details rendering", () => {
    useIssueMocked.mockReturnValue({
      status: "success",
      data: { title: "mock issue", user: { login: "test user" } },
    });

    const history = createMemoryHistory();
    history.push("/organization/repository/issues/id");
    render(
      <Router history={history}>
        <App />
      </Router>
    );

    expect(screen.getByText(/mock issue/i)).toBeInTheDocument();
  });
});
