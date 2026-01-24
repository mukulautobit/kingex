import React from 'react'
import BottomBar from '../../components/bottomBar/BottomBar'
import Dashboard from '../../pages/dashboard/Dashboard'
import { Outlet } from 'react-router-dom'

const DashBoardLayout = () => {
  return (
    <div className='h-[945px]'>
      <Outlet/>
      <BottomBar/>
    </div>
  )
}

export default DashBoardLayout



