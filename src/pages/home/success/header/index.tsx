import { FC } from "react";
import {
  IconButton,
  Text,
  HStack,
  Menu,
  Button,
  MenuList,
  MenuButton,
  MenuOptionGroup,
  MenuItemOption,
} from "@chakra-ui/react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon,
} from "@chakra-ui/icons";
import { perPage } from "../../../../hooks/useIssues";
import { Sort, State } from "../../../../models/Issue";
import { useSearch } from "../../../../context/Search";

type Props = {
  issuesFound?: number;
};

const SuccessHeader: FC<Props> = ({ issuesFound = 0 }) => {
  const { page, sort, state, nextPage, prevPage, setState, setSort } =
    useSearch();

  const prevDisable = page <= 1;
  const nextDisable = issuesFound < perPage;

  const handleStateChange = (value: string | string[]) => {
    setState(value as State);
  };

  const handleSortChange = (value: string | string[]) => {
    setSort(value as Sort);
  };

  return (
    <HStack spacing={2} justify="flex-end" backgroundColor="gray.100">
      <Menu gutter={0}>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          State
        </MenuButton>
        <MenuList>
          <MenuOptionGroup defaultValue={state} onChange={handleStateChange}>
            <MenuItemOption value="all">All</MenuItemOption>
            <MenuItemOption value="open">Open</MenuItemOption>
            <MenuItemOption value="closed">Closed</MenuItemOption>
          </MenuOptionGroup>
        </MenuList>
      </Menu>
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          Sort
        </MenuButton>
        <MenuList>
          <MenuOptionGroup defaultValue={sort} onChange={handleSortChange}>
            <MenuItemOption value="created">Created date</MenuItemOption>
            <MenuItemOption value="updated">Updated date</MenuItemOption>
            <MenuItemOption value="comments">Amount of comments</MenuItemOption>
          </MenuOptionGroup>
        </MenuList>
      </Menu>
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
