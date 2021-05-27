import { Container, VStack } from "@chakra-ui/react";
import { useDebounce } from "../../hooks/useDebounce";
import { useIssues } from "../../hooks/useIssues";
import ErrorMessage from "../../components/Error";
import EmptyView from "./empty";
import Bookmark from "./bookmark";
import Header from "./header";
import Success from "./success";
import { useSearch } from "../../context/Search";

const Home = () => {
  const { sort, state, page, repository, organization } = useSearch();

  const orgQuery = useDebounce<string>(organization);
  const repoQuery = useDebounce<string>(repository);

  const { error, status, issues, isLoading, isStale } = useIssues({
    page,
    sort,
    state,
    repository: repoQuery,
    organization: orgQuery,
  });

  return (
    <>
      <Header />

      <Container
        flexGrow={1}
        display="flex"
        maxW="container.lg"
        flexDirection="column"
        minHeight={`calc(100vh - 76px)`}
      >
        <VStack pb="4" pt="4" alignItems="normal" flexGrow={1}>
          <Bookmark />

          {status === "error" && <ErrorMessage message={error?.message} />}

          {(status === "success" || isStale) && orgQuery && repoQuery && (
            <Success issues={issues} isLoading={isLoading} />
          )}

          {(!orgQuery || !repoQuery) && (
            <EmptyView organization={orgQuery} repository={repoQuery} />
          )}
        </VStack>
      </Container>
    </>
  );
};

export default Home;
