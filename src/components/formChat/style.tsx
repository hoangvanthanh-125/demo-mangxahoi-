import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  wrap: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 15
  },
  wrapFrom: {
    padding: 10,
    border: '1px solid lightgray',
    borderRadius: 23,
    width: '85%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'


  },
  input: {
    flex: 0.9,
    border:'none',
    outline:'none'

  },
  img:{
    width:40,
    height:40,
    objectFit:'cover'
  }
}))