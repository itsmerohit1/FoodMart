import { Fragment } from "react";
import  ReactDOM from "react";
import './modal.css';

const Backdrop = (props) => {
  return <div className="backdrop" onClick={props.onClose} />;
};

const ModalOverLay = (props) => {
  return (
    <div className="modal">
      <div className="content">{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById('overlays');

const Modal =  (props) =>{

      return (
        <Fragment>
        
        {ReactDOM.createPortal(<Backdrop onClose={props.onClose}/>,portalElement)}
        {ReactDOM.createPortal(<ModalOverLay>{props.children}</ModalOverLay> , portalElement)}
        </Fragment> 
        );
}


export default Modal;

 

