import { render } from "./test-utils";
import App from "./App";
import { useIssues } from "./hooks/useIssues";

jest.mock("./hooks/useIssues");
const mockedDependency = useIssues as jest.MockedFunction<any>;

describe("App Component", () => {
  test("renders loading status", async () => {
    mockedDependency.mockReturnValue({ status: "loading" });
    const { getByText } = render(<App />);

    const header = getByText(/loading/i);
    expect(header).toBeInTheDocument();
  });

  test("renders error status", async () => {
    mockedDependency.mockReturnValue({ status: "error" });
    const { getByText } = render(<App />);

    const header = getByText(/Oops something went wrong/i);
    expect(header).toBeInTheDocument();
  });
});
