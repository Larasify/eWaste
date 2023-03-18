import React from 'react'
import './Modal.css'

export default function Modal(props) {
  return (
    <div class="modal-container">
        <div class="modal-content">
            {props.children}
        </div>
    </div>
  )
}
