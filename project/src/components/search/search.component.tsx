import * as React from "react";
import debounce from "lodash.debounce";
import { TextField, InputAdornment } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

import { memberAPI } from "api/memberAPI";
import { MemberEntity } from "models/member";

interface Props {}

export const SearchComponent = (props: Props) => {
  const [members, setMembers] = React.useState<MemberEntity[]>([]);
  const [areMembersLoaded, setMembersLoaded] = React.useState<boolean>(false);

  let searchTerm: string = "";
  const waitingTime: number = 500;

  const updateSearchTerm = event => {
    searchTerm = event.target.value;
    loadMemberDebounced();
  };

  const loadMembers = () => {
    setMembersLoaded(false);
    memberAPI.getAllMembers(searchTerm).then(members => {
      setMembers(members);
      setMembersLoaded(true);
    });
  };

  const loadMemberDebounced = debounce(loadMembers, waitingTime, {
    leading: false,
    trailing: true
  });

  return (
    <TextField
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
  );
};
