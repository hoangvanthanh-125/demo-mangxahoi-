import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  modal:{
    
    overflow:'auto',
    background:'white',
    position: 'absolute',
    width: '50vw',
    height:'auto',
    maxHeight:'50vh',
    padding:30,
    backgroundColor: 'white',
    outline:'none',
    boxSizing:'border-box',
    top: `${50}%`,
    left: `${50}%`,
    transform: `translate(-${50}%, -${50}%)`,
    [theme.breakpoints.down('xs')]:{
      width:'80vw'
    }
    
  },
  header:{
    boxSizing:'border-box',
    display:'flex',
    justifyContent:'flex-start',
    alignItems:'center',
    padding:10,
    borderBottom:'1px solid lightgray',
    fontWeight:'bold',
    
  },
  body:{
     
  }
}))