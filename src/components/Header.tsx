import { ChangeEvent, FC } from "react";
import { Input, Box, Progress, Container } from "@chakra-ui/react";
import { useIsFetching } from "react-query";
import { ReactComponent as Logo } from "../logo.svg";

type Props = {
  repository: string;
  organization: string;
  onRepositoryChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onOrganizationChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const Header: FC<Props> = ({
  repository,
  organization,
  onRepositoryChange,
  onOrganizationChange,
}) => {
  const isFetching = useIsFetching();

  return (
    <>
      <Box boxShadow="xs" w="100%" pt="4" pb="4">
        <Container maxW="container.lg" display="flex" alignItems="center">
          <Logo height="35" width="70" />
          <Input
            ml="4"
            value={organization}
            onChange={onOrganizationChange}
            placeholder="Enter an Organization"
          />
          <Input
            ml="4"
            value={repository}
            onChange={onRepositoryChange}
            placeholder="Enter a Repository"
          />
        </Container>
      </Box>
      <Box height="1">
        <Progress size="xs" isIndeterminate={!!isFetching} />
      </Box>
    </>
  );
};

export default Header;
