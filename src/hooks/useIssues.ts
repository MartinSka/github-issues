import { useQuery } from "react-query";
import { Issue, IssueResponseError, State, Sort } from "../models/Issue";
import { apiUrl, config } from "../utils/fetch";

export const perPage = 10;

type Params = {
  page: number;
  state: State;
  sort: Sort | "";
  repository: string;
  organization: string;
};

export function useIssues({
  sort,
  page,
  state,
  repository,
  organization,
}: Params) {
  const getIssues = async () => {
    if (!repository || !organization) {
      return;
    }

    const url = `${apiUrl}/${organization}/${repository}/issues?&per_page=${perPage}&page=${page}&state=${state}&sort=${sort}`;

    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return data;
  };

  const result = useQuery<Issue[], IssueResponseError>(
    ["issues", repository, organization, state, sort, page],
    getIssues
  );

  return {
    ...result,
    issues: result.data,
  };
}
