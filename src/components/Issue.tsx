import { FC } from "react";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import {
  Box,
  Heading,
  Text,
  HStack,
  Tag,
  WrapItem,
  Wrap,
  Link,
  Divider,
} from "@chakra-ui/react";
import { LockIcon, UnlockIcon } from "@chakra-ui/icons";
import ReactMarkdown from "react-markdown";
import { format, isToday, isYesterday } from "date-fns";
import { Issue, State } from "../models/Issue";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  if (isToday(date)) {
    return format(date, "HH:mm");
  }

  if (isYesterday(date)) {
    return "Yesterday";
  }

  return format(date, "M/d/y");
};

const IssueComponent: FC<Issue> = ({
  user,
  body,
  title,
  state,
  labels,
  html_url,
  created_at,
}) => {
  return (
    <Box borderWidth="1px" borderRadius="lg" p="4" width="100%">
      <HStack spacing="2" align="baseline">
        {/* State */}
        {state === State.closed && (
          <LockIcon role="presentation" aria-label="closed" color="gray.300" />
        )}
        {state === State.open && (
          <UnlockIcon role="presentation" aria-label="open" color="gray.300" />
        )}

        {/* Title */}
        <Heading as="h5" size="sm">
          <Link target="_blank" href={html_url}>
            {title}
          </Link>
        </Heading>
      </HStack>

      {/* Body */}
      {body && (
        <>
          <Divider mt="2" mb="2" />
          <Box overflowX="auto">
            <ReactMarkdown renderers={ChakraUIRenderer()}>{body}</ReactMarkdown>
          </Box>
        </>
      )}

      {/* Labels */}
      {!!labels.length && (
        <Wrap spacing="2" mt="4">
          {labels.map((label) => (
            <WrapItem key={label.id}>
              <Tag size="sm">{label.name}</Tag>
            </WrapItem>
          ))}
        </Wrap>
      )}

      {/* User */}
      <Text fontSize="xs" mt="2">
        <Link target="_blank" color="blue.500" href={user.html_url}>
          {user.login}
        </Link>{" "}
        opened on {formatDate(created_at)}
      </Text>
    </Box>
  );
};

export default IssueComponent;
