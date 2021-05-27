import {
  Text,
  List,
  ListItem,
  ListIcon,
  Heading,
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionButton,
  Center,
} from "@chakra-ui/react";
import { LockIcon, UnlockIcon } from "@chakra-ui/icons";
import { useStoredIssues } from "../../../context/Issues";
import { Issue, State } from "../../../models/Issue";
import { Link } from "react-router-dom";

const Bookmark = () => {
  const { storedIssues } = useStoredIssues();

  return (
    <Accordion
      mt="2"
      mb="4"
      allowToggle
      borderLeftWidth="1px"
      borderRightWidth="1px"
    >
      <AccordionItem>
        <AccordionButton>
          <Heading size="sm">Bookmarked issues</Heading>
        </AccordionButton>
        <AccordionPanel borderTopWidth="2px">
          <List spacing={3}>
            {storedIssues.map((issue: Issue) => (
              <ListItem borderWidth="1px" p="2" key={issue.id}>
                <Link
                  to={issue?.url?.replace("https://api.github.com/repos", "")}
                >
                  <Text fontSize="sm">
                    <ListIcon
                      as={issue.state === State.open ? UnlockIcon : LockIcon}
                      color="green.500"
                    />
                    {issue.title}
                  </Text>
                </Link>
              </ListItem>
            ))}
            {!storedIssues.length && (
              <Center>
                <Text fontSize="sm" mt="4">
                  Sorry! There are no issues bookmarked.
                </Text>
              </Center>
            )}
          </List>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default Bookmark;
