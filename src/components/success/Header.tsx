import { FC } from "react";
import { IconButton, Text, HStack } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { perPage } from "../../hooks/useIssues";

type Props = {
  page: number;
  issuesFound?: number;
  prevPage: () => void;
  nextPage: () => void;
};
const SuccessHeader: FC<Props> = ({
  page,
  prevPage,
  nextPage,
  issuesFound = 0,
}) => {
  const prevDisable = page <= 1;
  const nextDisable = issuesFound < perPage;

  return (
    <HStack spacing={4} justify="flex-end" mb="2">
      <HStack spacing={2}>
        {/* Back button */}
        <IconButton
          onClick={prevPage}
          disabled={prevDisable}
          aria-label="Previous page"
          icon={<ChevronLeftIcon />}
        />

        <Text fontSize="xs">{page}</Text>

        {/* Next button */}
        <IconButton
          onClick={nextPage}
          disabled={nextDisable}
          aria-label="Next page"
          icon={<ChevronRightIcon />}
        />
      </HStack>
    </HStack>
  );
};

export default SuccessHeader;
