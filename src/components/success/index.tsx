import { FC } from "react";
import { Divider, VStack } from "@chakra-ui/react";
import Header from "./Header";
import { Issue } from "../../models/Issue";
import IssueComponent from "../Issue";
import NotFound from "./NotFound";

type Props = {
  page: number;
  query: string;
  issues?: Issue[];
  nextPage: () => void;
  prevPage: () => void;
};

const Success: FC<Props> = ({ page, query, issues, prevPage, nextPage }) => {
  const issuesFound = issues?.length;

  return (
    <>
      <Header
        page={page}
        prevPage={prevPage}
        nextPage={nextPage}
        issuesFound={issuesFound}
      />
      <Divider />
      <VStack spacing={4} flex={1}>
        {issuesFound ? (
          issues?.map((issue) => <IssueComponent key={issue.id} {...issue} />)
        ) : (
          <NotFound query={query} />
        )}
      </VStack>
    </>
  );
};

export default Success;
