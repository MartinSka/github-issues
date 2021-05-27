import { FC } from "react";
import { Box, Progress, Container } from "@chakra-ui/react";
import { useIsFetching } from "react-query";
import { ReactComponent as Logo } from "../../logo.svg";
import { Link } from "react-router-dom";

const Header: FC = ({ children }) => {
  const isFetching = useIsFetching();

  return (
    <>
      <Box boxShadow="xs" w="100%" pt="4" pb="4">
        <Container
          maxW="container.lg"
          display="flex"
          alignItems="center"
          minHeight="10"
        >
          <Link to="/">
            <Logo height="35" width="70" />
          </Link>
          {children}
        </Container>
      </Box>
      <Box height="1">
        <Progress size="xs" isIndeterminate={!!isFetching} />
      </Box>
    </>
  );
};

export default Header;
