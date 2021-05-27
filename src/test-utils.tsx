import React, { FC, ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { SearchProvider, SearchProviderProps } from "./context/Search";
import { Sort, State } from "./models/Issue";

const queryClient = new QueryClient();

type Props = {
  search?: SearchProviderProps;
};

export const mockSearch: SearchProviderProps = {
  initialValues: {
    repository: "repository",
    organization: "organization",
    state: State.all,
    sort: Sort.initial,
  },
};

const wrapper: FC<Props> = ({ children, search = mockSearch }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SearchProvider {...search}>{children}</SearchProvider>
    </QueryClientProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "queries"> & Props
) => render(ui, { wrapper, ...options });

export * from "@testing-library/react";

export { customRender as render };
