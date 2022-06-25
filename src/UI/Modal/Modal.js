import { createPortal } from 'react-dom';

import BackDrop from '../BackDrop/BackDrop';
import Card from '../Card/Card';

const Modal = props => {
  return (
    <>
      {createPortal(
        <BackDrop onClickBackDrop={props.hideModal} />,
        document.getElementById('backdrop-root')
      )}
      {createPortal(
        <Card extraClasses={props.styles ? props.styles : null}>{props.children} </Card>,
        document.getElementById('overlay-root')
      )}
    </>
  );
};

export default Modal;
