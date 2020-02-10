import * as React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { SearchMembersPage, MemberDetailsPage } from "pages";

export const Router: React.FunctionComponent = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact={true} path="/" component={SearchMembersPage} />
        <Route path="/member/:username" component={MemberDetailsPage} />
      </Switch>
    </BrowserRouter>
  );
};