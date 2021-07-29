import { makeStyles } from "@material-ui/core";

export default makeStyles(() => ({
wrap:{
  display:'flex',
  flexDirection:'column',
  alignItems:'center',
  justifyContent:'center',
  boxSizing:'border-box',
  pading:'10px 10px'
}
,
button:{
  marginTop:'15px'
},
wrapImage:{
  display:'flex',
  flexDirection:'column',
  alignItems:'center',
  justifyContent:'center',
  width:'100%',
  marginTop:20


},
listImage:{
 
  width:'100%',
  display:'flex',
  justifyContent:'flex-start',
  alignItems:'center',
  flexWrap:'wrap'

},
image:{
  width:100,
  height:100,
  marginLeft:10,
  objectFit:'cover',
  borderRadius:'5px',
  boxShadow:'2px 3px 3px lightgray',
  cursor:'pointer',
  '&:hover':{
    transform:'scale(1.02)'
  }
},
wrapMainImg:{
  marginTop:15,
  position:'relative'

},
mainImg:{
  width:"100%",
  height:400,
  objectFit:'cover',

},
clearIcon:{
  position:'absolute',
  right:'0',
  top:-10,
  zIndex:1,
  background:'gray'
},
progress:{
  marginTop:30
},
buttonPost:{
  marginTop:20
}
}))