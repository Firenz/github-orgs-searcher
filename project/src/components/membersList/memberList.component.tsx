import * as React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

import { memberAPI } from "api/memberAPI";
import { MemberEntity } from "models/member";
import { SearchTermContext } from "context";
import { MembersNotDisplayingComponent } from "./membersNotDisplaying.component";
import { MemberCardComponent } from "./memberCard.component";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    gridSection: {
      margin: `3rem 1rem`
    },
    grid: {
      margin: `0 auto`,
      width: `55rem`,
      maxWidth: `90%`,
      flexDirection: "row",
      flexFlow: `row wrap`,
      justifyContent: "center",
      alignItems: "center"
    }
  })
);

interface Props {
  // newSearchTerm: string;
}

export const MembersListComponent = (props: Props) => {
  const classes = useStyles(props);
  const context = React.useContext(SearchTermContext);

  const [members, setMembers] = React.useState<MemberEntity[]>([]);
  const [areMembersLoaded, setAreMembersLoaded] = React.useState<boolean>(
    false
  );
  const [isNotSearchedYet, setIsNotSearchedYet] = React.useState<boolean>(true);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  let firstLoad: boolean = true;

  const loadMembers = (searchTerm: string) => {
    setAreMembersLoaded(false);
    setIsLoading(true);
    memberAPI
      .getAllMembers(searchTerm)
      .then(members => {
        setIsLoading(false);
        setMembers(members);

        if (members && members.length > 0) {
          setAreMembersLoaded(true);
        } else {
          setAreMembersLoaded(false);
        }
      })
      .catch(() => {
        setIsLoading(false);
        setAreMembersLoaded(false);
      });
  };

  React.useEffect(() => {
    if(isNotSearchedYet && context.searchTerm === ""){
      return;
    }
    else{
      setIsNotSearchedYet(false);
      loadMembers(context.searchTerm);
    }
  }, []);

  React.useEffect(() => {
    if(isNotSearchedYet && context.searchTerm === ""){
      return;
    }
    else{
      setIsNotSearchedYet(false);
      loadMembers(context.searchTerm);
    }
  }, [context.searchTerm]);

  return (
    <React.Fragment>
      <section className={classes.gridSection}>
        {/* {isNotSearchedYet && <MembersNotDisplayingComponent displayingText="Please search for an organization"/>} */}
        {isLoading && (
          <MembersNotDisplayingComponent displayingText="Searching..." />
        )}
        {(!isLoading && !areMembersLoaded) && (
          <MembersNotDisplayingComponent displayingText="There are no members to display" />
        )}
        {areMembersLoaded && (
          <Grid container className={classes.grid}>
            {members.map((member: MemberEntity) => (
              <Grid item key={member.id}>
                <MemberCardComponent member={member} />
              </Grid>
            ))}
          </Grid>
        )}
      </section>
    </React.Fragment>
  );
};
