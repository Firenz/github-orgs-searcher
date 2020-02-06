import * as React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

import { memberAPI } from "api/memberAPI";
import { MemberEntity } from "models/member";
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
  newSearchTerm: string;
}

export const MembersListComponent = (props: Props) => {
  const classes = useStyles(props);

  const [members, setMembers] = React.useState<MemberEntity[]>([]);
  const [areMembersLoaded, setAreMembersLoaded] = React.useState<boolean>(
    false
  );

  const loadMembers = () => {
    setAreMembersLoaded(false);
    memberAPI
      .getAllMembers(props.newSearchTerm)
      .then(members => {
        setMembers(members);

        if (members && members.length > 0) {
          setAreMembersLoaded(true);
        } else {
          setAreMembersLoaded(false);
        }
      })
      .catch(() => {
        setAreMembersLoaded(false);
      });
  };

  React.useEffect(() => {
    loadMembers();
  }, [props.newSearchTerm]);

  return (
    <React.Fragment>
      <section className={classes.gridSection}>
        {areMembersLoaded ? (
          <Grid container className={classes.grid}>
            {members.map((member: MemberEntity) => (
              <Grid item key={member.id}>
                <MemberCardComponent member={member} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <MembersNotDisplayingComponent />
        )}
      </section>
    </React.Fragment>
  );
};
