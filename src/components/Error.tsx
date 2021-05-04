import {
  Box,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { FC } from "react";

type Props = {
  message?: string;
};

const ErrorMessage: FC<Props> = ({ message }) => {
  return (
    <Alert status="error">
      <AlertIcon />
      <Box flex="1">
        <AlertTitle mr={2}>Oops something went wrong!</AlertTitle>
        <AlertDescription display="block" fontSize="sm">
          {message}
        </AlertDescription>
      </Box>
    </Alert>
  );
};

export default ErrorMessage;
