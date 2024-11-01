import React from 'react';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    background: 'white',
width:'45%',
height:'90%',

  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgb(0, 0, 0,0.7)'
  },
};

Modal.setAppElement('#root');

export function ModalView({children,setModalOpen,modalOpen}) {
  


  // function afterOpenmodal () {
    
  // }


  function closeModal() {
    setModalOpen(false);
  }

  return (
    <div>
      <Modal
        isOpen={modalOpen}
      
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
{children}
      </Modal>
    </div>
  );
}