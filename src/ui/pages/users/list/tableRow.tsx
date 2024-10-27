import { useContext, useState } from "react";
import { User } from "../../../../domain/user/user";
import { DotsVertical, Edit, Lock, Trash } from 'tabler-icons-react'
import { UseCasesContext } from "../../../../context/useCases";
import { Link, useParams } from "react-router-dom";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";

export const TableRow = (props: { user: User, last: boolean }) => {
    const {id} = useParams()
    const [showMenu, setShowMenu] = useState(false)
    let useCases = useContext(UseCasesContext)

    const formatDate = (day: Date) => {
        const yyyy = day.getFullYear();
        let mm = (day.getMonth() + 1).toString(); // Months start at 0!
        let dd = day.getDate().toString();

        if (dd.length == 1) dd = '0' + dd;
        if (mm.length == 1) mm = '0' + mm;

        return dd + '.' + mm + '.' + yyyy.toString().substring(2);
    }

    return (<tr>
        <td>{props.user.Id()}</td>
        <td>{props.user.Name()}</td>
        <td>{props.user.Surname()}</td>
        <td>{props.user.Login()}</td>
        <td>{props.user.Role()}</td>
        <td>{props.user.Enabled()?"Да":"Нет"}</td>
        <td>{formatDate(props.user.CreatedAt())}</td>
        <td>
            <div className="dropdown">
                <button type="button" onClick={()=>{setShowMenu(!showMenu)}} className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown" aria-expanded="false">
                    <DotsVertical />
                </button>
                <div className={showMenu?"dropdown-menu show":"dropdown-menu "} style={showMenu ? props.last ? { position: "absolute", inset: "auto auto 0px -20%", margin: "0px", transform: "translate3d(0px, -20.5px, 0px)" }: {position: "absolute", marginLeft: "-40%",}: {display:"none"}}>
                    <Link className="dropdown-item d-flex" to={"/user/edit/"+props.user.Id()}><Edit className="me-1" size={20} /> Редактировать</Link>
                    <Link className="dropdown-item d-flex" to={"/user/password/"+props.user.Id()}><Lock className="me-1" size={20} /> Сменить пароль</Link>
                </div>
            </div>
        </td>
    </tr>)
}
