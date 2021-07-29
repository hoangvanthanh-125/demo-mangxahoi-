import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  "@keyframes myEffect": {
    "0%": {
      width:'50%',
      color:'red'
    },
    "100%": {
     width:'100%',
     color:'blue',
    }
  },
  input:{
    //  animation:'$myEffect 3s ease-in',
     width:300,
     [theme.breakpoints.down('xs')]:{
       width:250
     }
    //  border:'1px solid black'
  },
  form:{
    width:'100%',
    display:'flex',
    justifyContent:'center',
  },
  option: {
    fontSize: 15,
    '& > span': {
      marginRight: 10,
      fontSize: 18,
    },
  },
  user:{
    display:'flex',
    justifyContent:'start',
    alignItems:'center',
    '& span':{
      marginLeft:10
    }
  }
}))