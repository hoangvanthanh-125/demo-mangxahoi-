import { Grid } from "@material-ui/core";
import React from "react";
import Posts from "../Posts/Posts";
import useStyles from "./style";
function Home() {
  const classes = useStyles();
  return (
    <Grid container className={classes.home}>
      <Grid item sm={8} md={7} xs={12}>
        <Posts />
      </Grid>
      {/* <Grid  item sm={8} md={8} xs={12}>
        <RecommnentFriends />
      </Grid> */}
    </Grid>
  );
}

export default Home;
