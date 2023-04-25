import React from 'react'
import {Outlet} from 'react-router-dom'

import Header from './Header'

export default function Layout() {
  return (
    <>
        <div className="fixed z-20 w-full top-0 h-auto">
            <Header/>
        </div>
        <div className="mt-16 lg:mt-24">
        <Outlet/>

        </div>
    </>
  )
}
