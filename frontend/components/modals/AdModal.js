import React from "react";
import ReactDOM from "react-dom";

const MODAL_STYLES = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    backgroundColor: '#162332',
    paddingTop: '10px',
    paddingBottom: '10px',
    paddingLeft: '50px',
    paddingRight: '50px',
    zIndex: '1000'
}
const OVERLAY_STYLES = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,.7)',
    zIndex: 1000
}


export default function AdModal({open, children, onClose}) {
    if (!open) {
        return null
    }
    return ReactDOM.createPortal(
        <>
            <div style={OVERLAY_STYLES}>
                <div style={MODAL_STYLES} className="custom-width-400px">
                    <div onClick={onClose} className="text-right text-color-accent">
                        Close <i className="far fa-times-circle"/>
                    </div>
                    <div className="card text-color-white bg-primary-dark">
                    {children}
                    </div>
                    <div className="text-color-accent text-center">
                        You will get a reward of 1 DIGITVL tokens for interacting with this ad.
                    </div>
                </div>
            </div>
        </>,
        document.getElementById("modal-root")
    );
}