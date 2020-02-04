import * as React from "react";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { CssBaseline, Container } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: 0,
      width: `100vw`,
      maxWidth: `100%`,
      height: `100vh`,
      backgroundColor: "indianred",
      textAlign: "center",
      fontFamily: `Arial, Helvetica, sans-serif`,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "stretch"
    }
  })
);

interface Props {
  children: any;
}

export const CenteredBodyContainerLayout = (props: Props) => {
  const classes = useStyles(props);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container className={classes.root}>
        {props.children}
      </Container>
    </React.Fragment>
  );
};
