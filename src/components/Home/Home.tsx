import { Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import Loading from "../../common/loading/loading";
import { fetchAllPostActions } from "../../redux/actions/postAction";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import Posts from "../Posts/Posts";
import useStyles from "./style";
function Home() {
  const { loading } = useAppSelector((state) => state.posts);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAllPostActions());
  }, []);
  const classes = useStyles();
  return loading ? (
    <Loading />
  ) : (
    <Grid container className={classes.home}>
      <Grid item sm={8} md={7} xs={12}>
        <Posts />
      </Grid>
    </Grid>
  );
}

export default Home;
