import * as React from "react";
import { Link } from "react-router-dom";

import {
  Card,
  CardHeader,
  CardActions,
  Button,
  Typography,
  Divider,
  Avatar,
  IconButton
} from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { GitHub, Mail, Public } from "@material-ui/icons";

import { MemberEntity } from "models/member";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      width: `25rem`,
      margin: theme.spacing(2)
    },
    cardHeader: {
      padding: 0
    },
    cardAction: {
      padding: 0
    },
    title: {
      textAlign: "left",
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1)
    },
    avatar: {
      width: theme.spacing(15),
      height: theme.spacing(15),
      borderRadius: 0
    },
    divider: {
      marginTop: `0.5rem`,
      marginBottom: `0.5rem`
    },
    subHeader: {
      display: "flex",
      flexDirection: "row-reverse",
      marginRight: `0.5rem`
    },
    iconButton: {
      padding: `0.5rem`
    },
    link: {
      width: `100%`,
      color: "inherit",
      textDecoration: "none"
    }
  })
);

export const MemberCardComponent = (props: { member: MemberEntity }) => {
  const classes = useStyles(props);

  return (
    <Card className={classes.card}>
      <CardHeader
        className={classes.cardHeader}
        avatar={
          <Avatar
            alt={props.member.login}
            src={props.member.avatar_url}
            className={classes.avatar}
          />
        }
        title={
          <React.Fragment>
            <Typography variant="h4" className={classes.title}>
              {props.member.login}
            </Typography>
            <Divider variant="inset" className={classes.divider} />
          </React.Fragment>
        }
        subheader={
          <React.Fragment>
            <Typography variant="h5">{props.member.name}</Typography>
            <div className={classes.subHeader}>
              {(props.member.blog && props.member.blog.length > 0) && (
                <a href={props.member.blog} target="_blank">
                  <IconButton
                    aria-label="blog"
                    className={classes.iconButton}
                  >
                    <Public fontSize="large" />
                  </IconButton>
                </a>
              )}
              {props.member.email && (
                <a href={`mailto:${props.member.email}`} target="_blank">
                  <IconButton
                    aria-label="email"
                    className={classes.iconButton}
                  >
                    <Mail fontSize="large" />
                  </IconButton>
                </a>
              )}
              <a href={props.member.html_url} target="_blank">
                <IconButton
                  color="primary"
                  aria-label="github"
                  className={classes.iconButton}
                >
                  <GitHub fontSize="large" />
                </IconButton>
              </a>
            </div>
          </React.Fragment>
        }
      />
      <Divider />
      <CardActions className={classes.cardAction}>
        <Link className={classes.link} to={`/member/${props.member.login}`}>
          <Button fullWidth>More info</Button>
        </Link>
      </CardActions>
    </Card>
  );
};
