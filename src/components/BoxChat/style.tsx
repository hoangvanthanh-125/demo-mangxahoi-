import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  boxChat: {
    background: 'white',
    paddingBottom: 15
  },
  header: {
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
    }
  }
}))