/**
 * Modal Fragment Component
 * @version 1
 * @author [Samar Musthafa](https://git.shefcompsci.org.uk/act22sm)
 * 
 */
/* Imports */
import React from 'react'
import './Modal.css'

export default function Modal(props) {
  return (
    /* Reusable modal component */
    <div class="modal-container">
        <div class="modal-content">
          {/* Render Modal content */}
            {props.children}
        </div>
    </div>
  )
}
