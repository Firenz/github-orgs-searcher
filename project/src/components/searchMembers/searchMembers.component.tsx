import * as React from "react";
import { Typography, TextField, InputAdornment } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";

import { useDebounce } from "common";
import { SearchTermContext } from "context";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    searchSection: {
      width: "80%",
      margin: `0 auto`
    },
    search: {
      width: `20rem`
    }
  })
);

interface Props {}

export const SearchMembersComponent = (props: Props) => {
  const classes = useStyles(props);
  const context = React.useContext(SearchTermContext);

  const [searchTerm, setSearchTerm] = React.useState<string>(context.searchTerm);

  const waitingTime: number = 500;
  const debouncedSearchTerm = useDebounce(searchTerm, waitingTime);

  React.useEffect(() => {
    context.setSearchTerm(searchTerm);
  }, []);

  React.useEffect(() => {
    context.setSearchTerm(debouncedSearchTerm);
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
          value={searchTerm}
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
    </React.Fragment>
  );
};
