import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login } from "../../pages/auth/login/login";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useContext, useEffect } from "react";
import { UseCasesContext } from "../../../context/useCases";
import { UserList } from "../../pages/users/list";
import { UserAdd } from "../../pages/users/add";
import { Register } from "../../pages/auth/register/register";
export const RouterComponent = () => {
  let useCases = useContext(UseCasesContext)

  const login = useTypedSelector(({ login }) => {
    return login
  })

  useEffect(() => {
    useCases?.authUseCase.CheckAuthorization()
    setInterval(() => {
      useCases?.authUseCase.CheckAuthorization()
    }, 10000)
  }, [])


  return (<Router basename="/">
    <Routes>
      {login?.authorized ? <>
          {/*<Route path="/user/edit/:id" element={<UserAdd />} />
          <Route path="/user/add" element={<UserAdd />} />
          <Route path="/user" element={<UserList />} />*/}
        </> : <>
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Login />} />
      </>}
    </Routes>
  </Router>
  )
}