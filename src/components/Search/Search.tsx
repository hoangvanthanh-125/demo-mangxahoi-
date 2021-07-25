import React from 'react';
import TextField from '@material-ui/core/TextField';

import useStyles from './style'
import { FormControl,InputLabel, OutlinedInput} from '@material-ui/core';

function Search() {
  const classes = useStyles();
  return (
   <form className={classes.form}>
     {/* <TextField className={classes.input} label='Tìm kiếm' fullWidth /> */}
     <FormControl variant="outlined">
        <InputLabel htmlFor="component-outlined">Tìm kiếm</InputLabel>
        <OutlinedInput  className={classes.input} fullWidth id="component-outlined" label="Tìm kiếm" />
      </FormControl>
   </form>
  );
}

export default Search;