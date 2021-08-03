import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({

  moreIcon: {
    marginRight:10,
  },
  messItem: {

  },

  nguoinhan: {
    marginTop: 20,

    display: 'flex',
    justifyContent: 'flex-start',
    '& div': {
      marginLeft: 10,

    }
  },
  nguoigui: {
    position:'relative',
    marginTop: 20,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems:'center',
    '& div': {
      marginRight: 10,
      background: 'lightgray'

    }
  },
  content: {
    position: 'relative',
    wordWrap: 'break-word',
    maxWidth: '60%',
    padding: '5px 10px',
    boxSizing: 'border-box',
    borderRadius: 23,
    border: '1px solid lightgray',
    textAlign: 'left',

  },
  img: {
    width: 200,
    height: 250,
    objectFit: 'cover',
    borderRadius: 5,
    margin: '0 10px'
  },
  typography:{
    padding:10,
    cursor:'pointer'
  }
}))