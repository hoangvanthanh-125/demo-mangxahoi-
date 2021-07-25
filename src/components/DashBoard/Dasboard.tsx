import { Grid } from "@material-ui/core";
import React from "react";
import { RouteProps } from "react-router-dom";
import Header from "../Header/Header";
import useStyles from "./style";
interface PropsDashBoard extends RouteProps {
  children: any;
}
function Dasboard({ children }: PropsDashBoard) {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid className={classes.header} item sm={12} md={12} xs={12} container>
        <Header />
      </Grid>
      <Grid className={classes.children} item sm={12} md={12} xs={12} container>
        {children}
      </Grid>
    </Grid>
  );
}

export default Dasboard;
