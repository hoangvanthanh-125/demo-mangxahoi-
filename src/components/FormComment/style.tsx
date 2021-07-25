import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  wrapForm:{
    width: "100%",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    boxSizing: "border-box",
   
  },
  input:{
    width: "80%",
    height:'auto',
    marginTop: 10,
    boxSizing: "border-box",
    display: "flex",
    alignItems: "center",
    justifyContent: "",
    background:'rgb(223, 223, 233)',
    borderRadius:99,
    '& input':{
      width:'100%',
      height:30,
      border:'none',
      outline:'none',
      background:'rgb(223, 223, 233)',
      borderRadius:99,
      padding:10
    }
    
  }
  
}))