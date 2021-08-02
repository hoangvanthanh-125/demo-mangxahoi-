import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  conatainer:{

   boxSizing:'border-box',
   padding:'30px 100px',
   display:'flex',
   justifyContent:'center',
   alignItems:'start',
   [theme.breakpoints.down('sm')]:{
     padding:0
   },
   

  },
  wrap:{
    display:'flex',
    justifyContent:'center',
    alignItems:'start',
    [theme.breakpoints.down('xs')]:{
      display:'none'
    }
  },
  noAccess:{
    display:'none',
    textAlign:'center',
    marginTop:50,
    fontWeight:'bold',
    [theme.breakpoints.down('xs')]:{
      display:'block'
    }

  },
  wrapListRoom:{
    

  },
  wrapBoxChat:{

  }

}))