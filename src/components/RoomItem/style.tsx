import { makeStyles } from "@material-ui/core";

export default makeStyles(( theme) => ({
wrap:{
  padding:10,
  // boxSizing:'border-box',
  marginTop:10,
  cursor:'pointer',
  display:'flex',
  alignItems:'center',
  justifyContent:'flex-start',
  width:'100%',
  '&:hover':{
    background:'lightgray',
  
  },
  '& span':{
    marginLeft:15,
    textAlign:'start',
    flex:1
  }
}
}))