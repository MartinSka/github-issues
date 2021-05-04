import { FC } from "react";
import { Text, Center } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

type Props = {
  query: string;
};

const NotFound: FC<Props> = ({ query }) => (
  <Center p="6" flex={1} flexDirection="column">
    <SearchIcon width="8" height="8" mb="4" />
    <Text>
      We couldn’t find any issues matching <strong>'{query}'</strong>
    </Text>
  </Center>
);

export default NotFound;
