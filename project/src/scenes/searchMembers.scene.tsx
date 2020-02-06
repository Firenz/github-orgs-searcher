import * as React from "react";
import {
  FooterLayout,
  HeaderLayout,
  MainLayout,
  CenteredBodyContainerLayout
} from "layouts";

import { MembersListComponent } from "components";
import { SearchMembersComponent } from "components/searchMembers/searchMembers.component";

interface Props {}

export const SearchMembersScene = (props: Props) => {
  const [updatedSearchTerm, setUpdatedSearchTerm] = React.useState<string>("");
  
  const handleUpdatedSearchTerm = (newTerm: string) => {
    setUpdatedSearchTerm(newTerm);
  }

  return (
    <CenteredBodyContainerLayout>
      <HeaderLayout />
      <MainLayout>
        <SearchMembersComponent onUpdateSearchTerm={handleUpdatedSearchTerm}/>
        <MembersListComponent newSearchTerm={updatedSearchTerm}/>
      </MainLayout>
      <FooterLayout />
    </CenteredBodyContainerLayout>
  );
};
