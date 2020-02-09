import * as React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import { SearchMembersPage, MemberDetailsPage } from "pages";

export const Router: React.FunctionComponent = () => {
  return (
    <HashRouter>
      <Switch>
        <Route exact={true} path="/" component={SearchMembersPage} />
        <Route path="/member/:username" component={MemberDetailsPage} />
      </Switch>
    </HashRouter>
  );
};