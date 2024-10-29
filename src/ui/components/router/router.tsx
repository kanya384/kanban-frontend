import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login } from "../../pages/auth/login/login";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useContext, useEffect } from "react";
import { UseCasesContext } from "../../../context/useCases";
import { KanbanList } from "../../pages/kanban/list";
import { Register } from "../../pages/auth/register/register";
import { Board } from "../../pages/kanban/board";
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
          <Route path="/kanban/:id" element={<Board />} />
          <Route path="*" element={<KanbanList />} />
        </> : <>
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Login />} />
      </>}
    </Routes>
  </Router>
  )
}