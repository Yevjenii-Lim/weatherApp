import React from 'react';


let Modal = (props) => {
    
    let show = props.showHideModal ? 'show' : null
    console.log(props.state)
    return <div className={'modal-wrap'+ " "  + show} onClick={() => props.setShowHide(false)}>
        <div className='modal-content'>
            gello
        </div>
    </div>
}

export default Modal