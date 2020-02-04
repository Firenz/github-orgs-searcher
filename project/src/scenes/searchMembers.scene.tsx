import * as React from "react";
import { MembersListComponent } from "components";
import {
  FooterLayout,
  HeaderLayout,
  MainLayout,
  CenteredBodyContainerLayout
} from "layouts";

interface Props {}

export const SearchMembersScene = (props: Props) => {
  return (
    <CenteredBodyContainerLayout>
      <HeaderLayout />
      <MainLayout>
        <MembersListComponent />
      </MainLayout>
      <FooterLayout />
    </CenteredBodyContainerLayout>
  );
};
