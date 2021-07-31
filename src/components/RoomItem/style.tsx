import { makeStyles } from "@material-ui/core";

export default makeStyles(( theme) => ({
wrap:{
  padding:10,
  marginTop:10,
  cursor:'pointer',
  display:'flex',
  alignItems:'center',
  justifyContent:'flex-start',
  '&:hover':{
    background:'lightgray',
  
  },
  '& span':{
    marginLeft:15
  }
}
}))