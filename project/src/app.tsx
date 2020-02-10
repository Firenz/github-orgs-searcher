import * as React from "react";

import { Router } from "router";
import { SearchTermContext } from "context";

export const App: React.FunctionComponent = () => {
  const [searchTerm, setSearchTerm] = React.useState<string>("");

  return (
    <React.Fragment>
      <SearchTermContext.Provider value={{ searchTerm, setSearchTerm }}>
        <Router />
      </SearchTermContext.Provider>
    </React.Fragment>
  );
};
