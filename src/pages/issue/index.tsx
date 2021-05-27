import {
  Box,
  Container,
  HStack,
  Heading,
  Tag,
  Text,
  IconButton,
} from "@chakra-ui/react";
import { find } from "lodash";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router";
import { useStoredIssues } from "../../context/Issues";
import { useIssue } from "../../hooks/useIssue";
import { StarIcon } from "@chakra-ui/icons";
import Header from "../../components/header";
import Spinner from "../../components/spinner";
import { formatDate } from "../../utils/date";

const Issue = () => {
  const { id, organization, repository } =
    useParams<{ id: string; organization: string; repository: string }>();

  const { status, data } = useIssue(organization, repository, id);

  const { storedIssues, storeIssue } = useStoredIssues();

  const isBookmarked = find(
    storedIssues,
    (issue) => issue.number.toString() === id
  );

  return (
    <>
      <Header />

      {status === "loading" && <Spinner />}

      {status === "success" && (
        <Container maxW="container.lg" flex={1}>
          <Heading as="h5" size="lg" mt="5">
            {data?.title}
            <IconButton
              ml="4"
              isRound
              variant="ghost"
              colorScheme={isBookmarked ? "teal" : "gray"}
              onClick={() => storeIssue(data)}
              aria-label="Bookmark issue"
              icon={<StarIcon />}
            />
          </Heading>

          <HStack mt="4">
            <Tag size="sm">{data?.state}</Tag>

            <Text fontSize="sm">
              {data?.user.login} opened on {formatDate(data?.created_at)}
            </Text>
          </HStack>

          {data?.body && (
            <Box
              p="4"
              mt="4"
              width="100%"
              borderWidth="1px"
              borderRadius="lg"
              overflowX="auto"
            >
              <ReactMarkdown renderers={ChakraUIRenderer()}>
                {data?.body}
              </ReactMarkdown>
            </Box>
          )}
        </Container>
      )}
    </>
  );
};

export default Issue;
