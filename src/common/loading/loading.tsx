import React from 'react';
import loading from './../../acssets/loading.gif'
import useStyles from './style'
function Loading() {
  const classes = useStyles()
  return (
    <div className={classes.wrapLoading}>
      <img className={classes.imgLoading} src={loading} alt='LOADING... ' />
    </div>
  );
}

export default Loading;