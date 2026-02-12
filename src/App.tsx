// import { useEffect } from 'react'
import { RouterProvider } from "react-router-dom";

import './App.css'
// import Dashboard from './pages/dashboard/Dashboard'
import { AppRouter } from './Utils/AppRouter';
// import { initializeSockets } from './service/socketService';
// import { store } from './store/Store';
// import { useEffect } from "react";
// import DashBoardLayout from './layout/dashboardLayout/DashBoardLayout';
// import Toasty from "./components/toast/Toasty"

function App() {
  // initializeSockets
  // useEffect(()=>{
  //   // if(localStorage.getItem("ASSESS")){
  //      initializeSockets(store)
  //     console.log("initilizaSpocket")
  //   // }      
  // },[])

  return (
    <>
    <div className="w-full md:max-w-[412px] mx-auto h-screen  bg-blacktertiary">
      {/* <Toasty/> */}
    <RouterProvider router={AppRouter}/>
    </div>
    {/* <DashBoardLayout/> */}
    </>
  )
}

export default App
