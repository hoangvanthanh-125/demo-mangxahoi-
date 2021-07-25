import React from 'react';
import loading from './../../acssets/loading.gif'
import useStyles from './style'
function Loading() {
  const classes = useStyles()
  return (
    <div className={classes.wrapLoading}>
      <img className={classes.imgLoading} src='https://i.pinimg.com/originals/d2/43/fd/d243fd3a5aa26e323faccd499124ee51.gif' alt='LOADING... ' />
    </div>
  );
}

export default Loading;