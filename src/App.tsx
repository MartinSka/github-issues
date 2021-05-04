import { ChangeEvent, useState } from "react";
import { useDebounce } from "./hooks/useDebounce";
import { Spinner, Container, Center } from "@chakra-ui/react";
import { useIssues } from "./hooks/useIssues";
import Header from "./components/Header";
import ErrorMessage from "./components/Error";
import EmptyView from "./components/Empty";
import Success from "./components/success";

function App() {
  const [organization, setOrganization] = useState("");
  const [repository, setRepository] = useState("");
  const orgQuery = useDebounce<string>(organization);
  const repoQuery = useDebounce<string>(repository);

  const handleOrgChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOrganization(e.target.value);
  };

  const handleRepoChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRepository(e.target.value);
  };

  const { page, error, status, issues, nextPage, prevPage } = useIssues(
    repoQuery,
    orgQuery
  );

  return (
    <>
      <Header
        repository={repository}
        organization={organization}
        onOrganizationChange={handleOrgChange}
        onRepositoryChange={handleRepoChange}
      />

      <Container
        pb="4"
        mt="4"
        flexGrow={1}
        display="flex"
        maxW="container.lg"
        flexDirection="column"
      >
        {status === "loading" && (
          <Center flexGrow={1}>
            <Spinner size="xl" color="blue.500" thickness="4px">
              Loading...
            </Spinner>
          </Center>
        )}

        {status === "error" && <ErrorMessage message={error?.message} />}

        {status === "success" && orgQuery && repoQuery && (
          <Success
            page={page}
            issues={issues}
            nextPage={nextPage}
            prevPage={prevPage}
            query={`${orgQuery} and ${repoQuery}`}
          />
        )}

        {(!organization || !repository) && (
          <EmptyView organization={organization} repository={repository} />
        )}
      </Container>
    </>
  );
}

export default App;
