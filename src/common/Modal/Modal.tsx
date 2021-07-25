import React from 'react';
import Modal from '@material-ui/core/Modal';
import { useAppSelector } from '../../redux/hook';
import useStyle from  './style'
function ModalCommon() {
  const classes = useStyle();
  const {isOpen,bodyContent,header} = useAppSelector(state => state.ui)
  const handleClose = ( ) => {

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