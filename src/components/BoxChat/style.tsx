import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  boxChat: {
    background: 'white',
    paddingBottom: 15,
    border:'1px solid lightgray'
  },
  header: {
    position:'relative',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 15,
    '& span': {
      marginLeft: 20,
      fontWeight: 'bold',
    },
    borderBottom: '1px solid lightgray'
  },
  iconBack:{
  position:'absolute',
  right:20,
  top:'35%',
  [theme.breakpoints.up('sm')]:{
    display:'none',
  }

  },
  body: {
    height: 300,
    overflowY: 'auto',
    width: '100%',
    '&::-webkit-scrollbar': {
      width: '0.5em',
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
      webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
      borderRadius: 12
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.1)',
      borderRadius: 12
    },
    [theme.breakpoints.down('xs')]:{
      height:'calc(100vh - 165px)'
    }

  },
  noChat:{
    height:463,
    background:'white ',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    fontSize:'x-large',
    fontWeight:'bold',
    border:'1px solid lightgray'
  }
}))