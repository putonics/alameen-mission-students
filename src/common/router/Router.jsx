import React from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import MainFrame from './MainFrame'
// import { lazy } from "react"
// import Loadable from "./Loadable"
// const Test = Loadable(lazy(() => import("../test/Test")))
import { useStudent } from '../redux/classes/students/Student'

import Login from "../../components/login"
import Dash from "../../components/dash"
import Documents from "../../components/documents"
import Fees from "../../components/fees"

export const ROUTES = [
  {
    path: "/",
    element: <Login />,
    auth: false
  },
  {
    path: "/dash",
    element: <Dash />,
    title: 'Dashboard',
    icon: 'chart-line',
    auth: true
  },
  {
    path: "/documents",
    element: <Documents />,
    title: 'Documents',
    icon: 'download',
    auth: true
  },
  {
    path: "/fees",
    element: <Fees />,
    title: 'Fees',
    icon: 'money-check-dollar',
    auth: true
  },
]

const Router = props => {
  const unauthPaths = ROUTES.filter(route => !route.auth).map(route => route.path)
  const authPaths = ROUTES.filter(route => route.auth).map(route => route.path)

  const location = useLocation()
  const navigate = useNavigate()
  const student = useStudent()

  const tryLogin = async () => {
    if (!student.docref) {
      if (authPaths.includes(location.pathname)) {
        navigate('/')
      }
      await student.login()
    }
    if (student.docref && unauthPaths.includes(location.pathname)) {
      navigate('/dash')
    }
  }

  React.useEffect(() => tryLogin, [location, student])

  return (
    <Routes>
      {
        ROUTES.map((route, index) => (
          <Route
            exact path={route.path}
            element={
              route.auth
                ? <MainFrame>{route.element}</MainFrame>
                : <>{route.element}</>
            }
            key={'route-' + index}
          />
        ))
      }
    </Routes>
  )
}

export default Router