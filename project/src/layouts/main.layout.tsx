import * as React from "react";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      backgroundColor: "white",
      fontFamily: `"Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
        "Lucida Sans Unicode", Geneva, Verdana, sans-serif`,
      color: "teal",
      height: `75%`,
      padding: `1rem 0`,
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignContent: "stretch",
      flexGrow: 1
    }
  })
);

interface Props {
  children: any
}

export const MainLayout = (props: Props) => {
  const classes = useStyles(props);

  return (
    <main className={classes.main}>
      {props.children}
    </main>
  );
};