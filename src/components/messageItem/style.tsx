import { makeStyles } from "@material-ui/core";

export default makeStyles ((theme) => ({
  messItem:{
    
  },
 
  nguoinhan:{
    marginTop:20,
    
    display:'flex',
    justifyContent:'flex-start',
    '& div':{
      marginLeft:10,
      
    }
  },
  nguoigui:{
    marginTop:20,
    display:'flex',
    justifyContent:'flex-end',
    '& div':{
      marginRight:10,
      background:'lightgray'
      
    }
  },
  content:{
    wordWrap:'break-word',
    maxWidth:'60%',
    padding:'5px 10px',
    borderRadius:23,
    border:'1px solid lightgray',
  
    textAlign:'left'

  },
}))