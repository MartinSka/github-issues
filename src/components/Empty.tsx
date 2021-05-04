import { FC } from "react";
import { Text, Center } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

type Props = {
  organization: string;
  repository: string;
};

const EmptyView: FC<Props> = ({ organization, repository }) => (
  <Center p="6" flex={1} flexDirection="column">
    <SearchIcon width="8" height="8" mb="4" />
    {!organization && !repository && (
      <Text>Please enter an Organization and a Repository</Text>
    )}
    {!organization && repository && <Text>Please enter an Organization</Text>}
    {organization && !repository && <Text>Please enter a Repository</Text>}
  </Center>
);

export default EmptyView;
