import { render } from "@testing-library/react";
import { Issue, State } from "../models/Issue";
import { mockIssue, mockLabels } from "../models/mocks";
import IssueComponent from "./Issue";

describe("Issue Component", () => {
  test("renders an issue", () => {
    const { getByText } = render(<IssueComponent {...mockIssue} />);

    const title = getByText(mockIssue.title);
    expect(title).toBeInTheDocument();
  });

  test("Title should link to the repository", () => {
    const { getByText } = render(<IssueComponent {...mockIssue} />);

    const titleAnchor = getByText(mockIssue.title).closest("a");
    expect(titleAnchor).toHaveAttribute("href", mockIssue.html_url);
  });

  test("Shows the issue state", async () => {
    const { getByRole, rerender } = render(<IssueComponent {...mockIssue} />);

    const openState = getByRole("presentation", { name: State.open });
    expect(openState).toBeInTheDocument();

    const issueStateClose = {
      ...mockIssue,
      state: State.closed,
    };

    await rerender(<IssueComponent {...issueStateClose} />);

    const closeState = getByRole("presentation", { name: State.closed });
    expect(closeState).toBeInTheDocument();
  });

  test("Shows body if is needed", async () => {
    const { getByText, rerender } = render(<IssueComponent {...mockIssue} />);

    const body = getByText(mockIssue.body);
    expect(body).toBeInTheDocument();

    const issueWithoutBody = {
      ...mockIssue,
      body: null,
    };

    await rerender(<IssueComponent {...issueWithoutBody} />);

    expect(body).not.toBeInTheDocument();
  });

  test("Must show labels", async () => {
    const { getByText, rerender } = render(<IssueComponent {...mockIssue} />);

    const label = mockLabels[0];

    const name = getByText(label.name);
    expect(name).toBeInTheDocument();

    const issueWithoutLabels = {
      ...mockIssue,
      labels: [],
    };

    await rerender(<IssueComponent {...issueWithoutLabels} />);
    expect(name).not.toBeInTheDocument();
  });

  test("User name should have a link to the user profile", async () => {
    const { getByText } = render(<IssueComponent {...mockIssue} />);

    const userName = getByText(mockIssue.user.login);
    expect(userName).toBeInTheDocument();
    expect(userName).toHaveAttribute("href", mockIssue.user.html_url);
  });

  test("Create at should by correctly format", async () => {
    const { getByText, rerender } = render(<IssueComponent {...mockIssue} />);

    const date = getByText(/4\/16\/2021/i);
    expect(date).toBeInTheDocument();

    const todaysDate = new Date().toISOString();
    const issueCreatedToday: Issue = {
      ...mockIssue,
      created_at: todaysDate,
    };

    await rerender(<IssueComponent {...issueCreatedToday} />);

    const hours = new Date(todaysDate).getHours();

    const today = getByText(new RegExp(`${hours}:`, "i"));
    expect(today).toBeInTheDocument();

    const yesterdayDate = new Date(todaysDate);
    yesterdayDate.setDate(yesterdayDate.getDate() - 1);

    const issueCreatedYesterday: Issue = {
      ...mockIssue,
      created_at: yesterdayDate.toISOString(),
    };

    await rerender(<IssueComponent {...issueCreatedYesterday} />);

    const yesterday = getByText(/yesterday/i);
    expect(yesterday).toBeInTheDocument();
  });
});
