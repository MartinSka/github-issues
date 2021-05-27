import { FC } from "react";
import { Box, Heading, Text, HStack, Link as CLink } from "@chakra-ui/react";
import { LockIcon, UnlockIcon } from "@chakra-ui/icons";
import { Issue, State } from "../../../../models/Issue";
import { Link } from "react-router-dom";
import { formatDate } from "../../../../utils/date";
import { useSearch } from "../../../../context/Search";

const IssueComponent: FC<Issue> = ({
  user,
  title,
  state,
  number,
  created_at,
}) => {
  const { repository, organization } = useSearch();

  return (
    <Box borderTopWidth="1px" p="4" width="100%">
      <Link to={`/${organization}/${repository}/issues/${number}`}>
        <HStack spacing="2" align="baseline">
          {/* State */}
          {state === State.closed && (
            <LockIcon
              role="presentation"
              aria-label="closed"
              color="gray.300"
            />
          )}
          {state === State.open && (
            <UnlockIcon
              role="presentation"
              aria-label="open"
              color="gray.300"
            />
          )}

          {/* Title */}
          <Heading as="h5" size="sm">
            {title}
          </Heading>
        </HStack>
      </Link>

      {/* User */}
      <Text fontSize="xs" mt="2">
        <CLink target="_blank" color="blue.500" href={user.html_url}>
          {user.login}
        </CLink>{" "}
        opened on {formatDate(created_at)}
      </Text>
    </Box>
  );
};

export default IssueComponent;
