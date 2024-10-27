import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login } from "../../pages/auth/login/login";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useContext, useEffect } from "react";
import { UseCasesContext } from "../../../context/useCases";
import { UserList } from "../../pages/users/list";
import { UserAdd } from "../../pages/users/add";
import { LeadList } from "../../pages/leads/list";
import { CauseList } from "../../pages/causes/list";
import { CauseAdd } from "../../pages/causes/add";
import { Moderate } from "../../pages/leads/moderate";
import { Cause } from "../../pages/leads/cause";
import { AmofileListPage } from "../../pages/amofile/list";
import { AmofileAdd } from "../../pages/amofile/add";
import { SetModerator } from "../../pages/leads/set_moderator";
import { ChangePass } from "../../pages/users/change-pass";
import { AmofileCar } from "../../pages/amofile/car";
import { CarExcelAdd } from "../../pages/amofile/car-excel";

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
      {login?.authorized ? useCases?.authUseCase.UserId() == -99 ?
        <>
          <Route path="/car-excel" element={<CarExcelAdd />} />
          <Route path="*" element={<AmofileCar />} />
        </>
        : <>
          <Route path="/car-excel" element={<CarExcelAdd />} />
          <Route path="/amocar" element={<AmofileCar />} />
          <Route path="/amofile/add" element={<AmofileAdd />} />
          <Route path="/amofile" element={<AmofileListPage />} />

          <Route path="/cause/edit/:id" element={<CauseAdd />} />
          <Route path="/cause/add" element={<CauseAdd />} />
          <Route path="/cause" element={<CauseList />} />

          <Route path="/user/password/:id" element={<ChangePass />} />
          <Route path="/user/edit/:id" element={<UserAdd />} />
          <Route path="/user/add" element={<UserAdd />} />
          <Route path="/user" element={<UserList />} />

          <Route path="/lead/client-cause/:id" element={<Cause />} />
          <Route path="/lead/moderator/:id" element={<SetModerator />} />
          <Route path="/lead/moderate/:id" element={<Moderate />} />
          <Route path="*" element={<LeadList />} />
        </> : <>
        <Route path="*" element={<Login />} />
      </>}
    </Routes>
  </Router>
  )
}