import * as React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paragraph: {
      margin: `1rem`
    }
  })
);

interface Props {
  displayingText: string
}

export const MembersNotDisplayingComponent = (props: Props) => {
  const classes = useStyles(props);

  return (
    <Typography className={classes.paragraph} variant="body2" component="p">
      {/* There are no members to display. */}
      {props.displayingText}
    </Typography>
  );
};
