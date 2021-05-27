import { FC } from "react";
import { Divider, Box, VStack } from "@chakra-ui/react";
import { Issue } from "../../../models/Issue";
import IssueComponent from "./issue";
import Header from "./header";
import NotFound from "./not-found";
import { useSearch } from "../../../context/Search";
import Spinner from "../../../components/spinner";

type Props = {
  issues?: Issue[];
  isLoading: boolean;
};

const Success: FC<Props> = ({ issues, isLoading }) => {
  const { repository, organization } = useSearch();
  const issuesFound = issues?.length;

  return (
    <Box
      mb="4"
      width="100%"
      flexGrow={1}
      display="flex"
      borderWidth="1px"
      borderRadius="lg"
      flexDirection="column"
    >
      <Header issuesFound={issuesFound} />

      <Divider />

      {isLoading ? (
        <Spinner />
      ) : (
        <VStack spacing={0} flex={1}>
          {issuesFound ? (
            issues?.map((issue) => <IssueComponent key={issue.id} {...issue} />)
          ) : (
            <NotFound query={`${organization} and ${repository}`} />
          )}
        </VStack>
      )}
    </Box>
  );
};

export default Success;
