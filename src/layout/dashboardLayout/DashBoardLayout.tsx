// import React from 'react'
import BottomBar from '../../components/bottomBar/BottomBar'
// import Dashboard from '../../pages/dashboard/Dashboard'
import { Outlet } from 'react-router-dom'
import Toasty from "../../components/toast/Toasty"
import { useEffect } from 'react'
import { initializeSockets } from '../../service/socketService'
import { store } from '../../store/Store'

const DashBoardLayout = () => {

  useEffect(()=>{
    initializeSockets(store)
  },[])
  return (
     <div className="h-full relative">
      
      {/* Pages */}
      <Outlet />

      {/* Global Toast */}
      <Toasty />

      {/* Bottom Navigation */}
      <BottomBar />

    </div>
  )
}

export default DashBoardLayout



