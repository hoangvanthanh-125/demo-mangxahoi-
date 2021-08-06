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
},
wrapContent:{
  display:'flex',
  flexDirection:'column',
  justifyContent:'center',
  width:'100%'

},
wrapLastMessage:{
  color:'gray',
  width:'100%',
 display:'flex',
 justifyContent:'space-around',
 alignContent:'center',
 '& span:first-child':{
   
  
   
   overflow:'hidden',
   display:'flex'
  }
}
}))