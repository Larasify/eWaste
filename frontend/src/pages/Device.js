import React from 'react'
import {IoIosArrowBack} from 'react-icons/io';

import './Device.css';

export default function Device() {
  return (
    <div class="device-container">
      <div class="device-title-holder">
        <div class="device-back"><IoIosArrowBack/></div>
        <div class="device-title-spans">
          <span>Welcome your contribution to the planet</span>
          <span>Enter your device details to get a quote!</span>
        </div>
      </div>
      <div class="device-content-holder">
        <div class="device-left-panel">
          <span>Details</span>
          <div class="device-image-preview">
            <img src='images/phone-generic.jpg'/>
          </div>
        </div>
        <div class="device-right-form">
          <div class="device-form-inputs">
              <div>
                  <label>Device</label>
                  <input type="text"></input>
              </div>
              <div>
                  <label>Model Name</label>
                  <input type="text"></input>
              </div>
          </div>
          <div class="device-form-inputs">
              <div>
                  <label>Storage</label>
                  <select>
                      <option>4 GB</option>
                      <option>8 GB</option>
                      <option>16 GB</option>
                      <option>32 GB</option>
                      <option>64 GB</option>
                      <option>128 GB</option>
                      <option>256 GB</option>
                      <option>512 GB</option>
                      <option>1 TB</option>
                  </select>
              </div>
              <div>
                  <label>Year of Purchase</label>
                  <input type="text"></input>
              </div>
          </div>
          <div class="device-form-inputs">
            <div>
              <label>Description of the device</label>
              <textarea/>
            </div>
          </div>
          <div class="device-services">
            <input type="radio" id="wiping" name="service" value="wiping"/>
            <label for="wiping">Wipe Data from Device</label>
            <input type="radio" id="retrieval" name="service" value="retrieval"/>
            <label for="retrieval">Wipe & Retrieve Data from Device</label>
          </div>
        </div>
      </div>
      <div class="device-btn-holder">
        <div class="device-submit-btn">
          <span class="register">Submit and get quote!</span>
        </div>
      </div>
    </div>
  )
}
