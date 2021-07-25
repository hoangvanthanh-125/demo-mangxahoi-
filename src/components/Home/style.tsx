import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  home:{
    boxSizing:'border-box',
    padding:20,
    [theme.breakpoints.down('xs')]:{
      padding:'10px 0px'
    }
  }

}))