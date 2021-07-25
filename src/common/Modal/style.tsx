import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  modal:{
    
    overflow:'auto',
    background:'white',
    position: 'absolute',
    width: '50vw',
    height:'auto',
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

  },
  body:{

  }
}))