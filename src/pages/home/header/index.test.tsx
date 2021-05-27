import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { render, fireEvent } from "../../../test-utils";
import Header from ".";

describe("Main Header Component", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test("Sets inputs value", () => {
    const history = createMemoryHistory();
    const { getByDisplayValue } = render(
      <Router history={history}>
        <Header />
      </Router>
    );

    const repositoryInput = getByDisplayValue(/repository/i);
    expect(repositoryInput).toBeInTheDocument();

    const organizationInput = getByDisplayValue(/organization/i);
    expect(organizationInput).toBeInTheDocument();
  });

  test("Trigger onChange when the value changes", async () => {
    const history = createMemoryHistory();
    const { getByDisplayValue } = render(
      <Router history={history}>
        <Header />
      </Router>
    );

    const repositoryInput = getByDisplayValue(/repository/i);
    const organizationInput = getByDisplayValue(/organization/i);

    await fireEvent.change(repositoryInput, {
      target: { value: "new repository" },
    });

    await fireEvent.change(organizationInput, {
      target: { value: "new organization" },
    });

    const newRepositoryInput = getByDisplayValue(/new repository/i);
    expect(newRepositoryInput).toBeInTheDocument();

    const newOrganizationInput = getByDisplayValue(/new organization/i);
    expect(newOrganizationInput).toBeInTheDocument();
  });
});
