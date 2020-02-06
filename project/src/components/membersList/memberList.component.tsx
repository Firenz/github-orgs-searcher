import * as React from "react";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Grid
} from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import debounce from "lodash.debounce";

import { memberAPI } from "api/memberAPI";
import { MemberEntity } from "models/member";
import { MembersNotDisplaying } from "./membersNotDisplaying.component";
import { MemberCardComponent } from "./memberCard.component";

interface Props {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    searchSection: {
      width: "80%",
      margin: `0 auto`
    },
    search: {
      width: `20rem`
    },
    gridSection: {
      margin: `3rem 1rem`
    },
    grid: {
      margin: `0 auto`,
      width: `55rem`,
      maxWidth: `90%`,
      flexFlow: `row wrap`
    }
  })
);

export const MembersListComponent = (props: Props) => {
  const classes = useStyles(props);

  const [members, setMembers] = React.useState<MemberEntity[]>([]);
  const [areMembersLoaded, setAreMembersLoaded] = React.useState<boolean>(false);
  // const [searchValue, setSearchValue] = React.useState<String>('');

  let searchTerm: string = "";
  const waitingTime: number = 500;

  const updateSearchTerm = event => {
    searchTerm = event.target.value;
    loadMemberDebounced();
  };

  const loadMembers = () => {
    setAreMembersLoaded(false);
    memberAPI.getAllMembers(searchTerm).then(members => {
      setMembers(members);
      setAreMembersLoaded(true);
    })
    .catch(() => {
      setAreMembersLoaded(false);
    });
  };

  const loadMemberDebounced = debounce(loadMembers, waitingTime, {
    leading: false,
    trailing: true
  });

  // React.useEffect(() => {
  //   loadMemberDebounced();
  // }, [searchValue]);

  return (
    <React.Fragment>
      <section className={classes.searchSection}>
        <Typography variant="h2" component="h1" noWrap>
          Members page
        </Typography>
        <TextField
          className={classes.search}
          id="standard-basic"
          label="GitHub Organization"
          type="text"
          placeholder="lemoncode"
          onChange={updateSearchTerm}
          fullWidth
          margin="normal"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            )
          }}
        />
      </section>
      <section className={classes.gridSection}>
        {areMembersLoaded ? (
          <Grid
            container
            className={classes.grid}
            direction="row"
            justify="center"
            alignItems="center"
          >
            {members.map((member: MemberEntity) => (
              <Grid item key={member.id}>
                <MemberCardComponent member={member} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <MembersNotDisplaying />
        )}
      </section>
    </React.Fragment>
  );
};
