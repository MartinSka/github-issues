import { xorBy } from "lodash";
import { createContext, FC, useContext } from "react";
import { Issue } from "../models/Issue";
import { useLocalstorage } from "../hooks/useLocalstorage";

const StoredIssuesContext = createContext<any>([]);

const StoredIssuesProvider: FC = ({ children }) => {
  const [storedIssues, setStoreIssues] = useLocalstorage<Issue[]>("issues", []);

  const storeIssue = (issue: Issue) => {
    setStoreIssues((issues) => xorBy(issues, [issue], "id"));
  };

  const value = {
    storedIssues,
    storeIssue,
  };

  return (
    <StoredIssuesContext.Provider value={value}>
      {children}
    </StoredIssuesContext.Provider>
  );
};

const useStoredIssues = () => {
  const context = useContext(StoredIssuesContext);

  if (!context) {
    throw new Error(
      `useStoredIssues must be used within a StoredIssuesProvider`
    );
  }

  return context;
};

export { StoredIssuesProvider, useStoredIssues };
