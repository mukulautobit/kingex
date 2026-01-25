import { useEffect } from 'react'
import { RouterProvider } from "react-router-dom";

import './App.css'
// import Dashboard from './pages/dashboard/Dashboard'
import { AppRouter } from './Utils/AppRouter';
import { initializeSockets } from './service/socketService';
import { store } from './store/Store';
// import DashBoardLayout from './layout/dashboardLayout/DashBoardLayout';
// import Toasty from "./components/toast/Toasty"

function App() {
  // initializeSockets
  useEffect(()=>{
          initializeSockets(store)
      console.log("initilizaSpocket")
  },[])

  return (
    <>
    <div className="max-w-[412px] mx-auto min-h-screen bg-blackprimar">
      {/* <Toasty/> */}
    <RouterProvider router={AppRouter}/>
    </div>
    {/* <DashBoardLayout/> */}
    </>
  )
}

export default App
