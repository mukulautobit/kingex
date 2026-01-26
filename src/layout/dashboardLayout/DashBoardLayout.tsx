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
     <div className="h-screen flex flex-col relative overflow-hidden">

      {/* Pages */}
      <div className="flex-1 overflow-y-auto"
      style={{scrollbarWidth:"none"}}
      >
        <Outlet />
      </div>

      {/* Global Toast */}
      <Toasty />

      {/* Bottom Navigation */}
      <BottomBar />

    </div>
  )
}

export default DashBoardLayout



