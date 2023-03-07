import React from 'react'
import './Header.css'
import { BsSearch } from 'react-icons/bs';
import { RiUser5Fill } from 'react-icons/ri';
import { RiNotification3Line } from 'react-icons/ri';
import { RiListSettingsLine } from 'react-icons/ri';

export default function Header() {
  return (
    <div class="head-holder">
      <div class="head" style={{
        backgroundImage: `url('/header.png')`
      }}>
          <div class="nav-search">
            <div class="search-box">
              <input type="text" placeholder='Search'></input>
              <span><BsSearch/></span>
            </div>
          </div>
          <div class="recycle-btn">
            <span class="re-btn">
              Recycle
            </span>
          </div>
          <div class="right-section">
            <div class="account">
              <RiUser5Fill/>
            </div>
            <div class="notifications">
              <RiNotification3Line/>
            </div>
            <div class="options">
              <RiListSettingsLine/>
            </div>
          </div>
      </div>
    </div>

  )
}
