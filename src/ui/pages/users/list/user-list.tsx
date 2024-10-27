import { useContext, useEffect, useState } from "react"
import { UseCasesContext } from "../../../../context/useCases"
import { useTypedSelector } from "../../../../hooks/useTypedSelector"
import { Link, useParams } from "react-router-dom"
import { TableRow } from "./tableRow"
import { Menu } from "../../../components/menu"

export const UserList = () => {
    let { id } = useParams();
    const [reportTypes, setReportTypes] = useState<{title: string, value: string}[] | null>()

    const [form, setForm] = useState<{from: Date, to: Date}>({
        from: new Date(),
        to: new Date(),
    })

    useEffect(()=>{
        let start = new Date();
        let end = new Date();
        start.setDate(start.getDate() - 30);
        end.setDate(end.getDate() + 1);
        setForm({
            ...form,
            from: start,
            to: end, 
        })
    },[])
    let useCases = useContext(UseCasesContext)

    const users = useTypedSelector(({ user }) => {
        return user
    })


    useEffect(()=>{
        useCases?.userUseCase.ReadUsers()
    },[])

    return (
        <div className="layout-page" >
            <Menu />
            <div className="content-wrapper" >
                <div className="container-xxl flex-grow-1 container-p-y">
                    <div className="row mx-1">
                        <div className="col-sm-12 col-md-4">
                            <h4 className="fw-bold py-3 mb-4"><span className="text-muted fw-light">Список пользователей /</span> Пользователи</h4>
                        </div>
                        <div className="col-sm-12 col-md-8">
                            <div className="dt-action-buttons text-xl-end text-lg-start text-md-end text-start d-flex align-items-center justify-content-md-end justify-content-center flex-wrap me-1">
                                <div className="dt-buttons py-3 mb-4">
                                    <Link to={"/user/add/"} className="dt-button add-new btn btn-primary mb-3 mb-md-0" ><span>Добавить пользователя</span></Link>
                                </div>
                            </div>
                        </div>

                        <div className="card">
                            <div className="table-responsive text-nowrap">
                                <table className="table mt-1">
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Имя</th>
                                            <th>Фамилия</th>
                                            <th>Логин</th>
                                            <th>Роль</th>
                                            <th>Активный</th>
                                            <th>Дата</th>
                                            <th>Действия</th>
                                        </tr>
                                    </thead>
                                    <tbody className="table table-hover">
                                        {
                                            users?.users && users.users.map((user, index)=>{
                                                return <TableRow user={user} last={users?.users!.length - 1 == index?true:false}/>
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )

}