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
     animation:'$myEffect 0.3s ease-in',
     minWidth:300
    //  border:'1px solid black'
  },
  form:{
    width:'100%'
  }
}))