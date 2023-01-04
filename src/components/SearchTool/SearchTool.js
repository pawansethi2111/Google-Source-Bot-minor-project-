import React from 'react';
import MessageForm from '../MessageForm/MessageForm';
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }
  }));

const SearchTool = (props) => {
    const classes = useStyles();
    const { open, closeEditor } = props;
    return(
        <div>
            <Modal
        className={classes.modal}
        open={open}
        onClose={closeEditor}
      >
          <div
            style={{
              backgroundColor: "#f1f0f0",
              borderRadius: "5px",
              maxHeight: "90vh",
              maxWidth: "30rem",
              overflowY: "auto",
              padding: "1rem 2rem"
            }}
          >
            <MessageForm { ...props } />
            </div>
            </Modal>
        </div>
    )
}

export default SearchTool;