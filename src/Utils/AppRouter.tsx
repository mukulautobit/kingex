import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../pages/dashboard/Dashboard";
import DashBoardLayout from "../layout/dashboardLayout/DashBoardLayout";
import TrendingList from "../pages/trendinglist/TrendingList";
import InstrumentDetails from "../pages/instrumentDetails/InstrumentDetails";
import InstrumentOrderPlace from "../pages/instrumentOrderPlace/InstrumentOrderPlace";
import MyList from "../pages/mylist/MyList";
import Portfolio from "../pages/portfoliopage/Portfolio";
import Orders from "../pages/order/Orders";
import History from "../pages/history/History";
import ProtectedRoute from "../components/proctedRoute/ProctedRoute";
import Login from "../pages/login/Login";
import OtpAuthentication from "../pages/otpAuthentication/OtpAuthentication";
import AllList from "../pages/allList/AllList";
import Profile from "../pages/profile/Profile";



export const AppRouter = createBrowserRouter([
  /* ---------- PUBLIC ---------- */
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/optauthentication",
    element : <OtpAuthentication/>
  },

  /* ---------- PROTECTED ---------- */
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <DashBoardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "trendingList",
        element: <TrendingList />,
      },
      {
        path: "mylist",
        element: <MyList />,
      },
      {
        path: "portfolio",
        element: <Portfolio />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
      {
        path: "history",
        element: <History />,
      },
    ],
  },

  /* ---------- OTHER ROUTES ---------- */
  {
    path: "/instrumentDetails",
    element: (
      <ProtectedRoute>
        <InstrumentDetails />
      </ProtectedRoute>
    ),
  },
  {
    path: "/InstrumentOrderPlace/",
    element: (
      <ProtectedRoute>
        <InstrumentOrderPlace />
      </ProtectedRoute>
    ),
  },
  {
    path: 'allList',
    element : (
      <ProtectedRoute>
        <AllList/>
      </ProtectedRoute>
    ),
    
    
  },
  {
    path : "/profile",
    element : (
      <ProtectedRoute>
        <Profile/>
      </ProtectedRoute>
    ),
  }
]);
