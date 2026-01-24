import { useState } from 'react'
import { RouterProvider } from "react-router-dom";

import './App.css'
import Dashboard from './pages/dashboard/Dashboard'
import { AppRouter } from './Utils/AppRouter';
// import DashBoardLayout from './layout/dashboardLayout/DashBoardLayout';

function App() {
  

  return (
    <>
    <RouterProvider router={AppRouter}/>
    {/* <DashBoardLayout/> */}
    </>
  )
}

export default App
