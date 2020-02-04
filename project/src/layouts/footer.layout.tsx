import * as React from "react";
import { Typography, Link } from "@material-ui/core";

import { makeStyles, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() =>
  createStyles({
    footer: {
      position: "fixed",
      bottom: 0,
      width: `100%`,
      margin: 0,
      backgroundColor: "#bb6554",
      color: "white",
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center"
    },
    link: {
      color: "#c6f8ff",
      paddingLeft: `0.3rem`
    }
  })
);

interface Props {}

export const FooterLayout = (props: Props) => {
  const classes = useStyles(props);

  return (
    <footer>
      <Typography variant="subtitle1" className={classes.footer}>
        Created with React, made by
        <Link
          variant="subtitle1"
          className={classes.link}
          href="mailto:alicia.guardenoalbertos@gmail.com"
        >
          Alicia G.
        </Link>
      </Typography>
    </footer>
  );
};
