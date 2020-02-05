import * as React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";

const logoImg = require("../img/logo_2.png");

const useStyles = makeStyles(() =>
  createStyles({
    head: {
      padding: `1.5rem`,
      textAlign: "center",
      color: "white"
    },
    title: {
      fontSize: `2rem`,
      fontWeight: "bold"
    },
    img: {
      maxHeight: `6rem`,
      margin: `0.5rem 0 2rem 0`
    }
  })
);

interface Props {}

export const HeaderLayout = (props: Props) => {
  const classes = useStyles(props);

  return (
    <header className={classes.head}>
      <img
        className={classes.img}
        alt=""
        src={logoImg}
      />
      <Typography variant="h1" component="h1" className={classes.title}>
        Welcome to the React exercise!
      </Typography>
    </header>
  );
};
