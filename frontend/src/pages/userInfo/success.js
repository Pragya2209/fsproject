import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { Link } from "react-router-dom";

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};


export default function App(props) {
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);


  return (
    <div>
      <Modal
        isOpen={props.modalIsOpen}
        style={customStyles}
        contentLabel="Example Modal"
      >
         <Link to="/" style={{textDecoration : 'none'}}>
        <h2 class='success-heading'>Congratulation!</h2>
        <div class='success-sub-heading'>User Profile Updated Successfully</div>
        </Link>
      </Modal>
    </div>
  );
}
