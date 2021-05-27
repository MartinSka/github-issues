import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { mockSearch, render } from "../../../../test-utils";
import { Issue, State } from "../../../../models/Issue";
import { mockIssue } from "../../../../models/mocks";
import IssueComponent from ".";

describe("Issue Component", () => {
  test("renders an issue", () => {
    const history = createMemoryHistory();

    const { getByText } = render(
      <Router history={history}>
        <IssueComponent {...mockIssue} />
      </Router>
    );

    const title = getByText(mockIssue.title);
    expect(title).toBeInTheDocument();
  });

  test("Title should link to the issue detials", () => {
    const history = createMemoryHistory();

    const { getByText } = render(
      <Router history={history}>
        <IssueComponent {...mockIssue} />
      </Router>
    );

    const { organization, repository } = mockSearch.initialValues;

    const url = `/${organization}/${repository}/issues/1`;
    const titleAnchor = getByText(mockIssue.title).closest("a");
    expect(titleAnchor).toHaveAttribute("href", url);
  });

  test("Shows the issue state", async () => {
    const history = createMemoryHistory();

    const { getByRole, rerender } = render(
      <Router history={history}>
        <IssueComponent {...mockIssue} />
      </Router>
    );

    const openState = getByRole("presentation", { name: State.open });
    expect(openState).toBeInTheDocument();

    const issueStateClose = {
      ...mockIssue,
      state: State.closed,
    };

    await rerender(
      <Router history={history}>
        <IssueComponent {...issueStateClose} />
      </Router>
    );

    const closeState = getByRole("presentation", { name: State.closed });
    expect(closeState).toBeInTheDocument();
  });

  test("User name should have a link to the user profile", async () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={history}>
        <IssueComponent {...mockIssue} />
      </Router>
    );

    const userName = getByText(mockIssue.user.login);
    expect(userName).toBeInTheDocument();
    expect(userName).toHaveAttribute("href", mockIssue.user.html_url);
  });

  test("Create at should by correctly format", async () => {
    const history = createMemoryHistory();
    const { getByText, rerender } = render(
      <Router history={history}>
        <IssueComponent {...mockIssue} />
      </Router>
    );

    const date = getByText(/4\/16\/2021/i);
    expect(date).toBeInTheDocument();

    const todaysDate = new Date().toISOString();
    const issueCreatedToday: Issue = {
      ...mockIssue,
      created_at: todaysDate,
    };

    await rerender(
      <Router history={history}>
        <IssueComponent {...issueCreatedToday} />
      </Router>
    );

    const hours = new Date(todaysDate).getHours();

    const today = getByText(new RegExp(`${hours}:`, "i"));
    expect(today).toBeInTheDocument();

    const yesterdayDate = new Date(todaysDate);
    yesterdayDate.setDate(yesterdayDate.getDate() - 1);

    const issueCreatedYesterday: Issue = {
      ...mockIssue,
      created_at: yesterdayDate.toISOString(),
    };

    await rerender(
      <Router history={history}>
        <IssueComponent {...issueCreatedYesterday} />
      </Router>
    );

    const yesterday = getByText(/yesterday/i);
    expect(yesterday).toBeInTheDocument();
  });
});
