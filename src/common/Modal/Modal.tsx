import React from 'react';
import Modal from '@material-ui/core/Modal';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import useStyle from  './style'
import { uiActions } from '../../redux/slice/uiSilce';
function ModalCommon() {
  const dispatch = useAppDispatch();
  const classes = useStyle();
  const {isOpen,bodyContent,header} = useAppSelector(state => state.ui)
  const handleClose = ( ) => {
   dispatch(uiActions.closeModal())
  }
  return (
    <div>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
       <div className={classes.modal}>
         <div className={classes.header} >
           {header}
         </div>
         <div className={classes.body} >
           {bodyContent}
         </div>
       </div>
      </Modal>
    </div>
  );
}

export default ModalCommon;