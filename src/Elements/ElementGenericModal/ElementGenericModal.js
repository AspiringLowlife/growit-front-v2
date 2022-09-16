import React from 'react'
import "../ElementGenericModal/ElementGenericModal.css"

export default function ElementGenericModal(props) {
  return (
    <div>
         <div className={props.isOpen ? `modal-open` : `modal-closed`}>
            <div className="modal-content">
                <div className="modal-header">
                    {props.useCloseButton}
                    <h3 className="text">{props.title}</h3>
                </div>
                <div className="modal-body">
                    {props.children}
                </div>
            </div>
        </div>
    </div>
  )
}

