import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { CenteredBodyContainerLayout, HeaderLayout, MainLayout, FooterLayout } from "layouts";
import { MemberDetailsCardComponent } from "components/memberDetails";

interface ParamProps {
  username: string;
}

interface Props extends RouteComponentProps<ParamProps> {}

export const MemberDetailsPage: React.FunctionComponent<Props> = props => {
  return (<CenteredBodyContainerLayout>
    <HeaderLayout />
    <MainLayout>
      <MemberDetailsCardComponent username={props.match.params.username} />      
    </MainLayout>
    <FooterLayout />
  </CenteredBodyContainerLayout>);
};