import { render, fireEvent } from "../test-utils";
import Header from "./Header";

const mockProps = {
  repository: "repository name",
  onRepositoryChange: jest.fn(),
  onOrganizationChange: jest.fn(),
  organization: "organization name",
};

describe("Main Header Component", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test("Sets inputs value", () => {
    const { getByDisplayValue } = render(<Header {...mockProps} />);

    const repositoryInput = getByDisplayValue(/repository/i);
    expect(repositoryInput).toBeInTheDocument();

    const organizationInput = getByDisplayValue(/organization/i);
    expect(organizationInput).toBeInTheDocument();
  });

  test("Trigger onChange when the value changes", async () => {
    const { getByDisplayValue } = render(<Header {...mockProps} />);

    const repositoryInput = getByDisplayValue(/repository/i);
    const organizationInput = getByDisplayValue(/organization/i);

    await fireEvent.change(repositoryInput, {
      target: { value: "new repository" },
    });
    expect(mockProps.onRepositoryChange).toBeCalledTimes(1);

    await fireEvent.change(organizationInput, {
      target: { value: "new organization" },
    });
    expect(mockProps.onOrganizationChange).toBeCalledTimes(1);
  });
});
