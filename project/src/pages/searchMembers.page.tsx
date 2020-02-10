import * as React from "react";
import {
  FooterLayout,
  HeaderLayout,
  MainLayout,
  CenteredBodyContainerLayout
} from "layouts";

import { SearchMembersComponent, MembersListComponent } from "components";

interface Props {}

export const SearchMembersPage = (props: Props) => {
  return (
    <CenteredBodyContainerLayout>
      <HeaderLayout />
      <MainLayout>
        <SearchMembersComponent />
        <MembersListComponent />
      </MainLayout>
      <FooterLayout />
    </CenteredBodyContainerLayout>
  );
};
