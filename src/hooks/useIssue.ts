import { useQuery } from "react-query";
import { Issue, IssueResponseError } from "../models/Issue";
import { apiUrl, config } from "../utils/fetch";

export function useIssue(organization: string, repository: string, id: string) {
  const getIssue = async () => {
    if (!repository || !organization) {
      return;
    }

    const url = `${apiUrl}/${organization}/${repository}/issues/${id}`;

    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return data;
  };

  return useQuery<Issue, IssueResponseError>(
    ["issue", repository, organization, id],
    getIssue
  );
}
