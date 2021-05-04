import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Issue, IssueResponseError } from "../models/Issue";

export const perPage = 10;
const initialPage = 1;
const apiUrl = "https://api.github.com/repos";
const config = process.env?.REACT_APP_GITHUB_TOKEN
  ? {
      headers: new Headers({
        Authorization: `Bearer ${process.env?.REACT_APP_GITHUB_TOKEN}`,
      }),
    }
  : {};

export function useIssues(repository: string, organization: string) {
  const [page, setPage] = useState(initialPage);

  useEffect(() => {
    setPage(initialPage);
  }, [repository, organization]);

  const getIssues = async () => {
    if (!repository || !organization) {
      return;
    }

    const url = `${apiUrl}/${organization}/${repository}/issues?&per_page=${perPage}&page=${page}&state=all`;

    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return data;
  };

  const result = useQuery<Issue[], IssueResponseError>(
    ["issues", repository, organization, page],
    getIssues
  );

  const prevPage = () => {
    if (page > 1) {
      setPage((current) => current - 1);
    }
  };

  const nextPage = () => {
    if (result.data?.length === perPage) {
      setPage((current) => current + 1);
    }
  };

  return {
    ...result,
    page,
    nextPage,
    prevPage,
    issues: result.data,
  };
}
