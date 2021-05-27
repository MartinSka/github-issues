import { ChangeEvent, FC } from "react";
import { Input } from "@chakra-ui/react";
import Header from "../../../components/header";
import { useSearch } from "../../../context/Search";

const HeaderComponent: FC = () => {
  const { repository, organization, setRepository, setOrganization } =
    useSearch();

  const handleOrgChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOrganization(e.target.value);
  };

  const handleRepoChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRepository(e.target.value);
  };

  return (
    <Header>
      <Input
        ml="4"
        value={organization}
        onChange={handleOrgChange}
        placeholder="Enter an Organization"
      />
      <Input
        ml="4"
        value={repository}
        onChange={handleRepoChange}
        placeholder="Enter a Repository"
      />
    </Header>
  );
};

export default HeaderComponent;
