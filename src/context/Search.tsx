import { createContext, FC, useContext, useEffect, useState } from "react";
import { Sort, State } from "../models/Issue";

const SearchContext = createContext<any>([]);

const initialPage = 1;

interface InitialValues {
  organization: string;
  repository: string;
  state: State;
  sort: Sort;
}

export type SearchProviderProps = {
  initialValues?: InitialValues;
};

const defaultValues = {
  organization: "",
  repository: "",
  state: State.all,
  sort: Sort.initial,
};

const SearchProvider: FC<SearchProviderProps> = ({
  initialValues = defaultValues,
  children,
}) => {
  const [page, setPage] = useState(initialPage);

  const [organization, setOrganization] = useState(initialValues.organization);
  const [repository, setRepository] = useState(initialValues.repository);

  const [state, setState] = useState<State>(initialValues.state);
  const [sort, setSort] = useState<Sort>(initialValues.sort);

  useEffect(() => {
    setPage(initialPage);
  }, [repository, organization, sort, state]);

  const nextPage = () => setPage((current) => current + 1);

  const prevPage = () => {
    if (page > 1) {
      setPage((current) => current - 1);
    }
  };

  const value = {
    page,
    sort,
    state,
    repository,
    organization,
    setPage,
    setSort,
    setState,
    setRepository,
    setOrganization,
    nextPage,
    prevPage,
  };

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};

const useSearch = () => {
  const context = useContext(SearchContext);

  if (!context) {
    throw new Error(`useSearch must be used within a SearchProvider`);
  }

  return context;
};

export { SearchProvider, useSearch };
