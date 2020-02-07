import * as React from "react";
import {
  FooterLayout,
  HeaderLayout,
  MainLayout,
  CenteredBodyContainerLayout
} from "layouts";

import { SearchMembersComponent, MembersListComponent } from "components";

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
