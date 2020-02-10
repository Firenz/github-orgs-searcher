import * as React from "react";
import {
  FooterLayout,
  HeaderLayout,
  MainLayout,
  CenteredBodyContainerLayout
} from "layouts";

import { SearchMembersComponent, MembersListComponent } from "components";
import { SearchTermContext } from "context";

interface Props {}

export const SearchMembersPage = (props: Props) => {
  const [searchTerm, setSearchTerm] = React.useState<string>("");

  // const handleUpdatedSearchTerm = (newTerm: string) => {
  //   setUpdatedSearchTerm(newTerm);
  // };

  return (
    <CenteredBodyContainerLayout>
      <HeaderLayout />
      <MainLayout>
        <SearchTermContext.Provider value={{searchTerm, setSearchTerm}}>
          <SearchMembersComponent
            // onUpdateSearchTerm={handleUpdatedSearchTerm}
          />
          <MembersListComponent
            // newSearchTerm={updatedSearchTerm}
          />
        </SearchTermContext.Provider>
      </MainLayout>
      <FooterLayout />
    </CenteredBodyContainerLayout>
  );
};
