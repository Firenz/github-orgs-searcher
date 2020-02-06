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
  const [searchTerm, setSearchTerm] = React.useState<string>('');
  const [areMembersLoaded, setAreMembersLoaded] = React.useState<boolean>(
    false
  );

  const waitingTime: number = 500;
  const debouncedSearchTerm = useDebounce(searchTerm, waitingTime);

  const loadMembers = () => {
    setAreMembersLoaded(false);
    memberAPI
      .getAllMembers(searchTerm)
      .then(members => {
        setMembers(members);
        setAreMembersLoaded(true);
      })
      .catch(() => {
        setAreMembersLoaded(false);
      });
  };

  React.useEffect(() => {
    debouncedSearchTerm ? loadMembers() : [];
  }, [debouncedSearchTerm]);

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
          onChange={e => setSearchTerm(e.target.value)}
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

// From https://usehooks.com/useDebounce/

function useDebounce(value, delay) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  React.useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },

    [value, delay] // Only re-call effect if value or delay changes
  );

  return debouncedValue;
}
