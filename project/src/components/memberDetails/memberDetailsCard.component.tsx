import * as React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

import { memberAPI } from "api/memberAPI";
import { MemberEntity, createDefaultMemberEntity } from "models/member";
import {
  Card,
  CardHeader,
  Avatar,
  Divider,
  Typography,
  IconButton,
  CardContent,
  CardActions,
  Button
} from "@material-ui/core";
import { GitHub, Public, Mail, LocationOn } from "@material-ui/icons";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      width: `51rem`,
      maxWidth: "90%",
      height: `30rem`,
      margin: `0 auto`,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "stretch"
    },
    cardHeader: {
      margin: 0,
      padding: 0
    },
    avatar: {
      width: `15rem`,
      height: `15rem`,
      marginRight: 0,
      borderRadius: 0
    },
    title: {
      margin: `2rem`
    },
    titleName: {
      fontSize: `3.7rem`,
      fontWeight: 400
    },
    subtitleName: {
      fontSize: `2rem`,
      opacity: 0.7
    },
    subHeader: {
      margin: ` 1rem 1rem 0`,
      display: "flex",
      flexDirection: "row",
      alignContent: "center",
      justifyContent: "space-between"
    },
    iconButton: {
      padding: `0.5rem`
    },
    media: {
      display: "flex",
      flexDirection: "row"
    },
    location: {
      paddingBottom: `0.3rem`,
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-end"
    },
    locationName: {},
    cardContent: {
      flexGrow: 1
    },
    gitHubInfo: {
      paddingBottom: `1.5rem`,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-evenly"
    },
    gitHubInfoComponent: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    },
    gitHubTitle: {},
    gitHubNumber: {
      width: "fit-content",
      padding: `0.4rem 0.6rem`,
      textAlign: "center",
      backgroundColor: "#CAE5FF",
      borderRadius: `50%`
    },
    bio: {
      padding: `1.5rem 1rem`
    },
    cardAction: {
      padding: 0
    },
    link: {
      width: `100%`,
      color: "inherit",
      textDecoration: "none"
    }
  })
);

interface Props {
  username: string;
}

export const MemberDetailsCardComponent = (props: Props) => {
  const classes = useStyles(props);

  const [user, setUser] = React.useState<MemberEntity>(
    createDefaultMemberEntity
  );

  React.useEffect(() => {
    memberAPI.getUser(props.username).then(user => setUser(user));
  }, []);

  const splitName = (name: string) => {
    return name.split(/(?=[A-Z])/).join(" ");
  };

  return (
    <Card className={classes.card}>
      <CardHeader
        className={classes.cardHeader}
        avatar={
          <Avatar
            className={classes.avatar}
            alt={`${user.login} avatar`}
            src={user.avatar_url}
          />
        }
        title={
          <div className={classes.title}>
            <Typography variant="h1" className={classes.titleName}>
              {user.login}
            </Typography>
            <Typography variant="h2" className={classes.subtitleName}>
              {splitName(user.name)}
            </Typography>
          </div>
        }
        subheader={
          <div className={classes.subHeader}>
            <div className={classes.media}>
              {user.blog && user.blog.length > 0 && (
                <a href={user.blog} target="_blank">
                  <IconButton aria-label="blog" className={classes.iconButton}>
                    <Public fontSize="large" />
                  </IconButton>
                </a>
              )}
              {user.email && (
                <a href={`mailto:${user.email}`} target="_blank">
                  <IconButton aria-label="email" className={classes.iconButton}>
                    <Mail fontSize="large" />
                  </IconButton>
                </a>
              )}
              <a href={user.html_url} target="_blank">
                <IconButton
                  color="primary"
                  aria-label="github"
                  className={classes.iconButton}
                >
                  <GitHub fontSize="large" />
                </IconButton>
              </a>
            </div>
            <div className={classes.location}>
              <Typography className={classes.locationName}>
                {user.location}
              </Typography>
              <LocationOn fontSize="large" />
            </div>
          </div>
        }
      />
      <Divider />
      <CardContent className={classes.cardContent}>
        <div className={classes.gitHubInfo}>
          <div className={classes.gitHubInfoComponent}>
            <Typography
              variant="h6"
              component="h3"
              className={classes.gitHubTitle}
            >
              Repositories
            </Typography>
            <Typography className={classes.gitHubNumber}>
              {user.public_repos}
            </Typography>
          </div>
          <div className={classes.gitHubInfoComponent}>
            <Typography
              variant="h6"
              component="h3"
              className={classes.gitHubTitle}
            >
              Followers
            </Typography>
            <Typography className={classes.gitHubNumber}>
              {user.followers}
            </Typography>
          </div>
          <div className={classes.gitHubInfoComponent}>
            <Typography
              variant="h6"
              component="h3"
              className={classes.gitHubTitle}
            >
              Following
            </Typography>
            <Typography className={classes.gitHubNumber}>
              {user.following}
            </Typography>
          </div>
        </div>
        {user.bio && (
          <React.Fragment>
            <Divider variant="middle" />
            <Typography variant="body1" className={classes.bio}>
              {user.bio}
            </Typography>
          </React.Fragment>
        )}
      </CardContent>
      <Divider />
      <CardActions className={classes.cardAction}>
        <Link className={classes.link} to="/">
          <Button fullWidth>Back to search</Button>
        </Link>
      </CardActions>
    </Card>
  );
};
