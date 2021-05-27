import { Center, Spinner as CUiSpinner } from "@chakra-ui/react";

const Spinner = () => (
  <Center flexGrow={1}>
    <CUiSpinner size="xl" color="blue.500" thickness="4px">
      Loading...
    </CUiSpinner>
  </Center>
);

export default Spinner;
