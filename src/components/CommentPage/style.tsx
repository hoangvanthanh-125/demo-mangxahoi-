import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  wrap:{
    padding:10,
    boxSizing:'border-box',
    [theme.breakpoints.down('xs')]:{
      padding:0
    }
  }
}))